// IMPORTS by Module Type
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import { options } from "./swagger/config.js";
import { createTokenOfPhone } from "../../01-05-token-count-api-facade-import/index.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

//서버가 듣고있나요?
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// 게시글 가져오기 실습
app.get("/boards", (요청, 응답) => {
	// 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
	const 보드덩어리 = [
		{
			number: 1,
			writer: "철수",
			title: "nameOfArticle",
			contents: "shit posts",
		},
		{
			number: 2,
			writer: "철수",
			title: "nameOfArticle",
			contents: "shit posts",
		},
		{
			number: 3,
			writer: "철수",
			title: "nameOfArticle",
			contents: "shit posts",
		},
		{
			number: 4,
			writer: "철수",
			title: "nameOfArticle",
			contents: "shit posts",
		},
	];
	// 2. 꺼내온 결과를 응답으로 보내기
	응답.send("보드덩어리 나가신다");
});

app.post("/boards", (req, res) => {
	// 1. 데이터를 등록하는 로직  => DB에 저장하기
	// 프론트에서 데이터 받아오기
	// 콘솔로 받아온 데이터 찍어서 보기

	// 2. 저장 결과를 받아와서 알려주기
	res.send("등록성공 SHIT POSTS");
	// console.log(req.body)
});

app.post("/tokens/phone", (req, res) => {
	createTokenOfPhone(req.body.phone);
	res.send("인증완료");
});
