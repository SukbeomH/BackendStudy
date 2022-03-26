import mongoose from "mongoose";
// 컬렉션 지정하고 만든다. 데이터의 구조는 스키마로 지정
const starbucksSchema = new mongoose.Schema({
	name: String,
	img: String,
});
export const Starbucks = mongoose.model("Starbucks", starbucksSchema);
