import puppeteer from "puppeteer";

// 대상에 대해 크롤링을 하는 함수
async function startCrawling(url) {
	// 헤드리스 옵션으로 브라우져 보일지 여부 결정 (true: 안보임)
	const browser = await puppeteer.launch({ headless: true });
	// 새페이지를 연다
	const page = await browser.newPage();
	// 페이지의 사이즈를 지정
	await page.setViewport({ width: 960, height: 720 });
	// 원하는 url로 이동(여기어때 호텔 가격)
	await page.goto(url);
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
// startCrawling();

// iframe의 경우 하나의 독립된 페이지 이므로, 그냥 셀렉터로 선택지정을 할 수 없다.
// 하지만 우리는 전체 사이트 내부로 들어가야 하므로 다른 방법이 필요.
async function iframeCrawler() {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto("https://finance.naver.com/item/sise.naver?code=005930");
	await page.waitForTimeout(3000);
	// iframe 페이지 주소를 찾아서 지정한다
	const framePage = await page
		.frames() // iframe을 찾는다, 원하는 주소를 포함하고 있는
		.find((e) => e.url().includes("/item/sise_day.naver?code=005930"));
	// 패턴을 파악한뒤 반복문으로 크롤링하고 싶은 범위를 지정한다.
	for (let i = 3; i <= 7; i++) {
		// 이제 프레임페이지 주소를 바탕으로 다시 찾는다 ------------------------
		const price = await framePage.$eval(
			`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
			(ele) => ele.textContent.trim()
		);
		const date = await framePage.$eval(
			`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
			(ele) => ele.textContent.trim()
		); // ---------------------------------------------------------
		console.log(price + " " + date);
	}
	// 종료한다
	await browser.close();
}
// iframeCrawler();
