import mongoose from "mongoose";
// 컬렉션 지정하고 만든다. 데이터의 구조는 스키마로 지정
const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	personal: String,
	prefer: String,
	pwd: String,
	phone: String,
});
export const User = mongoose.model("User", userSchema);
