import mongoose from "mongoose";
// 컬렉션 지정하고 만든다. 데이터의 구조는 스키마로 지정
const tokenSchema = new mongoose.Schema({
	token: String,
	phone: String,
	isAuth: Boolean,
});
export const Token = mongoose.model("Token", tokenSchema);
