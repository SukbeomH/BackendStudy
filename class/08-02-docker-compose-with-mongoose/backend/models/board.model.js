import mongoose from "mongoose";
// 컬렉션 지정하고 만든다. 데이터의 구조는 스키마로 지정
const boardSchema = new mongoose.Schema({
	writer: String,
	title: String,
	contents: String,
});
export const Board = mongoose.model("Board", boardSchema);
