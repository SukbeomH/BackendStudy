// import CashService from "./services/cash.service.js";

export class CouponController {
	constructor(moneyService) {
		this.cashService = moneyService;
	}
	buyCoupon = (req, res) => {
		// 1. 구매자의 잔고 확인 코드
		// const cashService = new CashService();
		// const hasCash = cashService.checkValue();
		const hasCash = this.cashService.checkValue();

		// 2. 쿠폰 구매하는 코드
		if (hasCash) {
			res.send("쿠폰 구매 완료");
		}
	};
}
