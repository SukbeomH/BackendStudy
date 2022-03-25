import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// 휴대폰 검증 및 인증
import { Token } from "./models/token.model.js";
import { getToken, sendToPhone } from "./phone/phone.system.js";
import { User } from "./models/user.model.js";
import { getOpenGraph } from "./prefer/prefer.scrap.js";
// 라이브러리 사용설정
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// 프론트엔드로부터 데이터 받아오기
app.post("/tokens/phone", async (req, res) => {
	const phoneN = req.body.phone;
	//토큰 제작
	const tokenMade = await getToken();
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
		await res.send("인증번호 " + tokenMade + " 재전송됨");
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
		await res.send("인증번호 " + tokenMade + " 최초 전송됨");
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
		await res.send(true);
	} else {
		await res.send(false);
	}
});

// 회원가입 API
app.post("/user", async (req, res) => {
	// 입력된 핸드폰 번호가 DB에 있는가
	if (
		(await User.exists({ isAuth: true })) &&
		(await User.exists({ phone: req.body.phone }))
	) {
		// 번호도 있고 인증도 올바르게 되었다면 새 유저 생성
		const userSubmit = await new User({
			name: req.body.name,
			email: req.body.email,
			personal: req.body.personal,
			prefer: getOpenGraph(req.body.prefer),
			pwd: req.body.pwd,
			phone: req.body.phone,
		});
		await userSubmit.save();
	} else {
		// 번호가 없거나 인증이 완료되지 않았다면
		res.status(422).send("에러 : 핸드폰번호가 인증되지 않았습니다");
	}
});

// 몽구스를 통해 몽고DB에 연결(도커)
// mongoose.connect("mongodb://my_database:27017/miniproject");
// 몽구스를 통해 몽고DB에 연결(로컬)
mongoose.connect("mongodb://localhost:27017/miniproject");
// 최종적으로 백엔드 API 서버 오픈, Listen~
app.listen(3000, () => {
	console.log(`Example app listening on port ${3000}`);
});
