// module 방식
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
	checkValidationEmail,
	getWelcomeTemplate,
	sendTemplateToEmail,
} from "./email.js";

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import { options } from "./swagger/config.js";
import cors from "cors";
import mongoose from "mongoose";
import { Board } from "./models/board.model.js";
import { Stock } from "./models/stock.model.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
app.get("/boards", async (req, res) => {
	// Board.find({ writer: "철수" });
	const result = await Board.find();
	// 2. 꺼내온 결과 응답 주기
	res.send(result);
});

// 프론트엔드로부터 데이터 받아오기
app.post("/boards", async (req, res) => {
	// 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
	const board = new Board({
		// writer: req.body.writer,
		// title: req.body.title,
		// contents: req.body.contents
		...req.body,
	});
	// 저장하기
	await board.save();
	// 저장결과 알려주기!!
	res.send("등록에 성공하였습니다!!");
});

app.post("/tokens/phone", (req, res) => {
	const myphone = req.body.aaa;
	// 1. 휴대폰번호 자릿수 맞는지 확인하기
	const isValid = checkValidationPhone(myphone);
	if (isValid) {
		// 2. 핸드폰 토큰 6자리 만들기
		const mytoken = getToken();
		// 3. 핸드폰번호에 토큰 전송하기
		sendTokenToSMS(myphone, mytoken);
		res.send("인증완료!!");
	}
});

app.post("/users", (req, res) => {
	const myuser = req.body.user;
	// 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
	const isValid = checkValidationEmail(myuser.email);
	if (isValid) {
		// 2. 가입환영 템플릿 만들기
		const mytemplate = getWelcomeTemplate(myuser);
		// 3. 이메일에 가입환영 템플릿 전송하기
		sendTemplateToEmail(myuser.email, mytemplate);
	}
	res.send("가입완료!!");
});

app.get("./stocks", async (req, res) => {
	// 주식 데이터가 있다면
	const stocks = await Stock.find();
	// 프론트로 보내준다
	res.send(stocks);
});

// 몽구스를 통해 몽고DB에 연결
mongoose.connect("mongodb://my_database:27017/db");
// 최종적으로 백엔드 API 서버 오픈, Listen~
app.listen(3000, () => {
	console.log(`Example app listening on port ${3000}`);
});
