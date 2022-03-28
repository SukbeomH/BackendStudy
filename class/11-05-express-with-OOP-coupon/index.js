import express from "express";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProductController } from "./mvc/controllers/product.controller.js";

// express 사용
const app = express();

// 상품 API
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰 API
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰, 상품권 구매하기 API

// 서버 시작
app.listen(3000);
