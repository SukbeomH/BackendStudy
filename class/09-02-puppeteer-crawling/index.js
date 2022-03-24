import puppeteer from "puppeteer";

// 대상에 대해 크롤링을 하는 함수
async function startCrawling() {
	// 헤드리스 옵션으로 브라우져 보일지 여부 결정 (true: 안보임)
	const browser = await puppeteer.launch({ headless: true });
	// 새페이지를 연다
	const page = await browser.newPage();
	// 페이지의 사이즈를 지정
	await page.setViewport({ width: 960, height: 720 });
	// 원하는 url로 이동(여기어때 호텔 가격)
	await page.goto("https://www.goodchoice.kr/product/search/2");
	// 크롤링의 텀을 지정 (1000 = 1second)
	await page.waitForTimeout(10000);
	// 원하는 요소를 선택(개발자도구 -> copy -> copy selector)---------------
	const name = await page.$eval(
		"#poduct_list_area > li:nth-child(2) > a > div > div.name > strong",
		(ele) => ele.textContent.trim()
	);
	const price = await page.$eval(
		"#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
		(ele) => ele.textContent.trim()
	);
	const location = await page.$eval(
		"#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
		(ele) => ele.textContent.trim()
	); // ---------------------------------------------------------------
	// 종료한다
	await browser.close();
}
// 대상에 대해 크롤링을 시작한다
startCrawling();
