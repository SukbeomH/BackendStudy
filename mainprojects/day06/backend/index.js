// 라이브러리 설치, 임포트
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import dotenv from "dotenv";
import { sendTokenToSMS, checkValidationPhone, getToken } from "./phone.js";
import {
	sendTemplateToEmail,
	getWelcomeTemplate,
	checkValidationEmail,
} from "./email.js";
// Swagger 파일 아웃소싱 & 임포트
import { options } from "./swagger/config.js";
// 데이터 베이스 임포트
import { usersData, coffeeData } from "./DATABASE/DB.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
dotenv.config();

//서버가 듣고있나요?
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

//사용자 데이터 조회
app.get("/users", (req, res) => {
	res.send(usersData);
});

//커피 목록 조회
app.get("/starbucks", (req, res) => {
	res.send(coffeeData);
});

// 이메일 환영인사
app.post("/users", (req, res) => {
	const user = req.body.user;
	console.log(user);
	// 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
	const isValid = checkValidationEmail(user.email);
	if (isValid) {
		// 2. 가입환영 템플릿 만들기
		const template = getWelcomeTemplate(user);

		// 3. 이메일에 가입환영 템플릿 전송하기
		sendTemplateToEmail(user.email, template);
	}
	res.send("가입완료!!");
});

//핸드폰 인증번호 보내기
app.post("/tokens/phone", (req, res) => {
	const phone = req.body.tel;
	// 1. 휴대폰번호 자릿수 맞는지 확인하기
	const isValid = checkValidationPhone(phone);
	if (isValid) {
		// 2. 핸드폰 토큰 6자리 만들기
		const token = getToken();
		// 3. 핸드폰번호에 토큰 전송하기
		sendTokenToSMS(phone, token);
		res.send("인증완료!!");
	}
});
