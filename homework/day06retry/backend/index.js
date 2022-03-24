// 라이브러리 설치, 임포트
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import dotenv from "dotenv";
// Swagger 파일 아웃소싱 & 임포트
import { options } from "./swagger/config.js";
// 데이터 베이스 임포트
import { usersData, coffeeData } from "./DATABASE/DB.js";
// 휴대폰 검증 및 인증
import { createTokenOfPhone } from "./phone/phoneApp.js";
// 이메일 검증 및 환영 메일 전송
import { createUser } from "./email/emailApp.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
dotenv.config();

// 사용자 데이터 조회
app.get("/users", (req, res) => {
  res.send(usersData);
});

// 커피 목록 조회
app.get("/starbucks", (req, res) => {
  res.send(coffeeData);
});

// 휴대폰 인증번호 발송
app.post("/tokens/phone", (req, res) => {
  createTokenOfPhone(req.body.phone);
  res.send("인증완료");
});

// 이메일 검증과 환영메일 발송
app.post("/user", (req, res) => {
  createUser(req.body.email);
  res.send("인증완료");
});

// 서버가 듣고있나요?
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
