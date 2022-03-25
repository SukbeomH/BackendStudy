import puppeteer from "puppeteer";
import mongoose from "mongoose";
import cheerio from "cheerio";
import axios from "axios";
import { Starbucks } from "./models/starbucks.model.js";

// 몽고디비 접속
mongoose.connect("mongodb://localhost:27017/db");
// 대상에 대해 크롤링을 하는 함수
async function espressoCrawling() {
	// 헤드리스 옵션으로 브라우져 보일지 여부 결정 (true: 안보임)
	const browser = await puppeteer.launch({ headless: true });
	// 새페이지를 연다
	const page = await browser.newPage();
	// 원하는 url로 이동
	await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
	// 크롤링의 텀을 지정 (1000 = 1second)
	await page.waitForTimeout(3000);
	// 원하는 요소를 선택(개발자도구 -> copy -> copy selector)---------------
	for (let i = 1; i < 15; i++) {
		const name = await page.$eval(
			`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dd`,
			(ele) => ele.textContent
		);
		const image = await page.$eval(
			`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(${i}) > dl > dt > a > img`,
			(img) => img.src
		);
		const starbucks = await new Starbucks({
			name: name,
			image: image, //이미지 소스 받아서 잘 넘겨야함
		});
		await starbucks.save();
		console.log(name + "  " + image);
	} // ---------------------------------------------------------------
	// 종료한다
	await browser.close();
}
// 대상에 대해 크롤링을 시작한다
espressoCrawling();
