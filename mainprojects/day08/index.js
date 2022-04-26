import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Token } from "./models/token.model.js";
// 휴대폰 검증 및 인증
import { getToken } from "./phone/phoneSystem.js";
import { sendToPhone } from "./phone/phoneSystem.js";
// Express 사용설정
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// 프론트엔드로부터 데이터 받아오기
// app.post("/tokens/phone", async (req, res) => {
// 	// 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
// 	const token = new Token({
// 		...req.body,
// 	});
// 	// 이미 번호가 있으면
// 	// 토큰 만들고 토큰 업데이트
// 	const updateToken = await token.updateOne(
// 		{ phone: req.body.phone },
// 		{ token: createTokenOfPhone(req.body.phone) }
// 	);
// 	if (updateToken.matchedCount > 0) {
// 		// 저장하기
// 		await token.save();
// 		// 저장결과 알려주기!!
// 		res.send("인증번호 재전송");
// 	} else {
// 		// isAuth를 false로 지정
// 		await token.save({
// 			phone: req.body.phone,
// 			token: req.body.token,
// 			isAuth: false,
// 		});
// 		// 저장결과 알려주기!!
// 		res.send("인증번호 최초 전송");
// 	}
// });

// 프론트엔드로부터 데이터 받아오기
app.post("/tokens/phone", async (req, res) => {
	//토큰 제작
	const tokenMade = await getToken();
	// 모델 스키마에 스프레드로 값을 다 넣어준다.
	const tokenFunc = await new Token({ ...req.body });
	// 전화번호가 이미 데이터베이스에 있는지 확인
	if (await Token.exists({ phone: req.body.phone })) {
		// 전화번호가 데이터베이스에 있으므로 전화번호를 기준으로 토큰을 업데이트한다.
		await Token.updateOne(
			{ phone: req.body.phone },
			{ $set: { token: tokenMade, isAuth: false } }
		);
		//인증번호를 보낸다
		await sendToPhone(req.body.phone, tokenMade);
		// 번호 확인용 반응
		await res.send("인증번호 " + tokenMade + " 재전송됨");
	} else {
		// 전화번호가 없으면 처음요청이므로 저장한다.
		const saving = new Token({ phone: req.body.phone, token: tokenMade });
		await saving.save();
		//인증번호를 보낸다
		await sendToPhone(req.body.phone, tokenMade);
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
// 몽구스를 통해 몽고DB에 연결(도커)
mongoose.connect("mongodb://my_database:27017/token");
// 몽구스를 통해 몽고DB에 연결(로컬)
// mongoose.connect("mongodb://localhost:27017/token");
// 최종적으로 백엔드 API 서버 오픈, Listen~
app.listen(3000, () => {
	console.log(`Example app listening on port ${3000}`);
});
