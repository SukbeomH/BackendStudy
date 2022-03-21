import axios from "axios";

export function checkValidationPhone(myphone) {
	if (myphone.length !== 10 && myphone.length !== 11) {
		console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
		return false;
	} else {
		return true;
	}
}

export function getToken() {
	const mycount = 6;
	if (mycount === undefined) {
		console.log("에러 발생!!! 갯수를 제대로 입력해 주세요!!!");
		return;
	} else if (mycount <= 0) {
		console.log("에러 발생!!! 갯수가 너무 적습니다!!!");
		return;
	} else if (mycount > 10) {
		console.log("에러 발생!!! 갯수가 너무 많습니다!!!");
		return;
	}
	const result = String(Math.floor(Math.random() * 10 ** mycount)).padStart(
		4,
		"0"
	);
	return result;
	// console.log(result)
}

export async function sendTokenToSMS(tel, tokn) {
	const appKey = process.env.NHN_SMS_APP_KEY;
	const XSecretKey = process.env.NHN_SMS_X_SECRET_KEY;
	const sender = process.env.NHN_SMS_SENDER;
	await axios.post(
		`https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKey}/sender/sms`,
		{
			sendNo: sender,
			body: "API test 입니다" + "인증번호는: " + tokn,
			recipientList: [{ recipientNo: tel }],
		},
		{
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"X-Secret-Key": XSecretKey,
			},
		}
	);
	console.log(tel + "번호로 인증번호" + tokn + "를 전송합니다!!");
}
