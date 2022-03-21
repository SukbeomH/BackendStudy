import axios from "axios";

// // 비동기 방식
// function fetchPost() {
// 	const result = axios.get("https://koreanjson.com/posts/1");
// 	console.log(result); //promise { <pending> }
// }
// fetchPost();

// 동기 방식
async function sendSMS() {
	await axios.post(
		"https://api-sms.cloud.toast.com/sms/v3.0/appKeys/{30MILYIOMg1qDX5M}/sender/sms"
	);
	console.log(result.data.title);
}
sendSMS();
