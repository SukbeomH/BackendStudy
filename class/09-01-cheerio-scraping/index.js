import cheerio from "cheerio";
import axios from "axios";
// url 추출하고 보여주는 api 실행
async function getOpenGraph(fromFrontData) {
	// 프론트에서 보내온 정보를 확인 (형식은 오브젝트)
	const fromFrontURL = fromFrontData.contents
		.split(" ") // 띄어쓰기를 기준으로 나누고 url를 추출한다.
		.filter((e, i) => e.startsWith("http"))[0];

	const webData = await axios.get(fromFrontURL).then();
	console.log(webData.data);
	const $ = cheerio.load(webData.data);
	$("meta").each((i, e) => {
		if ($(e).attr("property")) {
			const key = $(e).attr("property").split(":")[1];
			const value = $(e).attr("content");
			console.log(key + " : " + value);
		}
	});
}
// 프론트에서 보냈다고 가정하는 데이터-------------------
const frontEndData = {
	title: "lorem",
	contents: "lorem ipsum is https://naver.com lorem ipsum.",
}; // ------------------------------------------
// url 추출하고 보여주는 api 실행
getOpenGraph(frontEndData);
