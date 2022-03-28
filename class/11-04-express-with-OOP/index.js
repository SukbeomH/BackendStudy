import express from "express";
import CashService from "./cash.js";
import ProductService from "./product.js";

const app = express();

// 상품 구매하기 API
app.post("/products/buy", (req, res) => {
	// 상품구매 로직
	// 1. 구매자의 잔고 확인 코드
	const cashService = new CashService();
	const hasCash = cashService.checkValue(); // return true or false

	// 2. 판매가 완료되었는지 확인하는 코드
	const productService = new ProductService();
	const isSoldout = productService.checkSoldout(); // return true or false

	// 3. 상품 구매하는 코드
	if (hasCash && !isSoldout) {
		res.send("구매 완료");
	}
});

// 상품 환불하기 API
app.post("/products/refund", (req, res) => {
	// 상품 환불 로직
	// 1. 판매가 완료된 것인지 검증....
	const productService = new ProductService();
	const isSoldout = productService.checkSoldout();

	// 2. 상품을 환불하는 코드
	if (isSoldout) {
		res.send("환불 완료");
	}
});

//
app.listen(3000);
