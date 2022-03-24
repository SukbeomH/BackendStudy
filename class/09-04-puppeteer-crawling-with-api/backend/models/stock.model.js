import mongoose from "mongoose";
// 컬렉션 지정하고 만든다. 데이터의 구조는 스키마로 지정
const stockSchema = new mongoose.Schema({
	name: String,
	date: Date,
	price: Number,
});
export const Stock = mongoose.model("Stock", stockSchema);
