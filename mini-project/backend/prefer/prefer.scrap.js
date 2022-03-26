import { User } from "../models/user.model.js";
import axios from "axios";
import cheerio from "cheerio";

// cheerio - OG meta 추출하고 보여주는 api 실행
export async function getOpenGraph(url) {
	const webData = await axios
		.get(url)
		.then()
		.catch(function (error) {
			console.log(error);
		});
	const $ = cheerio.load(webData.data);
	let og = new Object();
	$("meta").each(async (i, e) => {
		if ($(e).attr("property")) {
			const key = $(e).attr("property").split(":")[1];
			const value = $(e).attr("content");
			og[key] = value;
		}
	});
	console.log(og);
	return og;
}

// og 데이터 가공 후 정리
// const prefer = await new User({
//     og: {
//         title: key === "og:title" ? value : null,
//         description: key === "og:description" ? value : null,
//         image: key === "og:image" ? value : null,
//     },
// });
