// import CashService from "./services/cash.service.js";
// import ProductService from "./services/product.service.js";

export class ProductController {
	constructor(productServiceArg, cashServiceArg) {
		this.cashService = cashServiceArg;
		this.productService = productServiceArg;
	}
	buyProduct = (req, res) => {
		// 상품구매 로직
		// 1. 구매자의 잔고 확인 코드
		// const cashService = new CashService();
		// const hasCash = cashService.checkValue(); // return true or false
		const hasCash = this.cashService.checkValue();

		// 2. 판매가 완료되었는지 확인하는 코드
		// const productService = new ProductService();
		// const isSoldout = productService.checkSoldout(); // return true or false
		const isSoldout = this.productService.checkSoldout();

		// 3. 상품 구매하는 코드
		if (hasCash && !isSoldout) {
			res.send("구매 완료");
		}
	};

	refundProduct = (req, res) => {
		// 상품 환불 로직
		// 1. 판매가 완료된 것인지 검증....
		// const productService = new ProductService();
		// const isSoldout = productService.checkSoldout();
		const isSoldout = this.productService.checkSoldout();

		// 2. 상품을 환불하는 코드
		if (isSoldout) {
			res.send("환불 완료");
		}
	};
}
