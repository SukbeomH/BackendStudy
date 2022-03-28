// 라이브러리 ----------------------------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
// 라이브러리 -----------------------------------------

// 컨트롤러 --------------------------------------------------------------------
import { RegisterUser } from "./controllers/register.controller.js";
import { UserList } from "./controllers/users.controller.js";
import { SendToken } from "./controllers/sendtoken.controller.js";
import { AuthPhone } from "./controllers/auth.controller.js";
import { StarbucksList } from "./controllers/coffees.controller.js";
// 컨트롤러 --------------------------------------------------------------------

// 라이브러리 사용설정
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// 프론트엔드로부터 데이터 받아오기
const sendToken = new SendToken();
app.post("/tokens/phone", sendToken.tokenWorks);

//핸드폰 인증 토큰으로 인증완료 하기
const authPhone = new AuthPhone();
app.patch("/tokens/phone", authPhone.authToken);

// 회원가입 API
const registerUser = new RegisterUser();
app.post("/user", registerUser.userSubmit);

// 회원 목록 조회
const userList = new UserList();
app.get("/users", userList.getUsers);

// 커피 목록 조회
const starbucksList = new StarbucksList();
app.get("/starbucks", starbucksList.getCoffee);

// 몽구스를 통해 몽고DB에 연결(도커)
mongoose.connect("mongodb://my_database:27017/miniproject");
// 몽구스를 통해 몽고DB에 연결(로컬)
// mongoose.connect("mongodb://localhost:27017/miniproject");
// 최종적으로 백엔드 API 서버 오픈, Listen~
app.listen(3000, () => {
	console.log(`Example app listening on port ${3000}`);
});
