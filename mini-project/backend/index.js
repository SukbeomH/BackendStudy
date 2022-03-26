import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
// 휴대폰 검증 및 인증
import { Token } from "./models/token.model.js";
import { getToken, sendToPhone } from "./phone/phone.system.js";
import { User } from "./models/user.model.js";
import { getOpenGraph } from "./prefer/prefer.scrap.js";
// 이메일 전송
import { sendTemplateToEmail, getWelcomeTemplate } from "./email/email.js";
// 커피목록 크롤링
import { Starbucks } from "./models/starbucks.model.js";
// 라이브러리 사용설정
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// 프론트엔드로부터 데이터 받아오기
app.post("/tokens/phone", async (req, res) => {
	const phoneN = req.body.phone;
	//토큰 제작
	const tokenMade = getToken();
	// 전화번호가 이미 데이터베이스에 있는지 확인
	if (await Token.exists({ phone: phoneN })) {
		// 전화번호가 데이터베이스에 있으므로 전화번호를 기준으로 토큰을 업데이트한다.
		await Token.updateOne(
			{ phone: phoneN },
			{ $set: { token: tokenMade, isAuth: false } }
		);
		//인증번호를 보낸다
		await sendToPhone(phoneN, tokenMade);
		// 번호 확인용 반응
		res.send(phoneN + "으로 인증번호 " + tokenMade + " 재전송됨");
	} else {
		// 전화번호가 없으면 처음요청이므로 저장한다.
		const saving = await new Token({
			phone: phoneN,
			token: tokenMade,
			isAuth: false,
		});
		await saving.save();
		//인증번호를 보낸다
		await sendToPhone(phoneN, tokenMade);
		// 번호 확인용 반응
		res.send("인증번호 " + tokenMade + " 최초 전송됨");
	}
});

//핸드폰 인증 토큰으로 인증완료 하기
app.patch("/tokens/phone", async (req, res) => {
	// 전화번호가 동일하다 && 토큰이 동일하다
	if (
		(await Token.exists({ phone: req.body.phone })) &&
		(await Token.exists({ token: req.body.token }))
	) {
		// isAuth를 true로 바꾼다
		await Token.updateOne(
			{ phone: req.body.phone },
			{ $set: { isAuth: true } }
		);
		// true를 되돌려보낸다.
		res.send(true);
	} else {
		res.send(false);
	}
});

// 회원가입 API
app.post("/user", async (req, res) => {
	// 입력된 핸드폰 번호가 DB에 있는가
	if (
		(await Token.exists({ phone: req.body.phone })) &&
		(await Token.exists({ isAuth: true }))
	) {
		// 번호도 있고 인증도 올바르게 되었다면 새 유저 생성
		const userSubmit = await new User({
			name: req.body.name,
			email: req.body.email,
			// 주민등록번호는 뒷자리를 전부 *로 바꿔 저장
			personal: req.body.personal.split("").fill("*", -7).join(""),
			// 좋아하는 사이트의 OG 메타정보를 스크랩, 오브젝트로 DB에 저장
			og: await getOpenGraph(req.body.prefer),
			prefer: req.body.prefer,
			pwd: req.body.pwd,
			phone: req.body.phone,
		});
		// 가공한 데이터를 데이터베이스에 저장
		await userSubmit.save();
		// 회원 가입 환영 이메일을 전송
		await sendTemplateToEmail(req.body.email, getWelcomeTemplate(userSubmit));
		const id = await userSubmit.get("_id");
		res.send(id);
	} else {
		// 번호가 없거나 인증이 완료되지 않았다면
		res.status(422).send("에러 : 핸드폰번호가 인증되지 않았습니다");
	}
});

// 회원 목록 조회
app.get("/users", async (req, res) => {
	const userList = await User.find();
	res.send(userList);
});

// 커피 목록 조회
app.get("/starbucks", async (req, res) => {
	const coffeeList = await Starbucks.find();
	console.log(coffeeList);
	res.send(coffeeList);
});

// 몽구스를 통해 몽고DB에 연결(도커)
mongoose.connect("mongodb://my_database:27017/miniproject");
// 몽구스를 통해 몽고DB에 연결(로컬)
// mongoose.connect("mongodb://localhost:27017/miniproject");
// 최종적으로 백엔드 API 서버 오픈, Listen~
app.listen(3000, () => {
	console.log(`Example app listening on port ${3000}`);
});
