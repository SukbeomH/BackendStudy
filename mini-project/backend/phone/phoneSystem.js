import axios from "axios";

// 핸드폰 번호는 제대로 입력되어있는가?
export function checkValidationPhone(telNum) {
	if (telNum.length !== 10 && telNum.length !== 11) {
		console.log("올바른 핸드폰 번호를 입력하세요");
		return false;
	} else {
		return true;
	}
}

// 6자리 토큰을 생성한다
export function getToken() {
	const numLength = 6;
	// if (numLength <= 0) {
	// 	console.log("자릿수가 너무 적습니다");
	// 	return;
	// } else if (numLength > 10) {
	// 	console.log("자릿수가 너무 많습니다");
	// 	return;
	// } else if (numLength === undefined) {
	// 	console.log("자릿수를 입력해 주세요");
	// 	return;
	// }
	const result = String(Math.floor(Math.random() * 10 ** numLength)).padStart(
		numLength,
		"0"
	);
	return result;
}

// 생성한 토큰을 핸드폰에 전송한다
export async function sendToPhone(telNum, result) {
	const appKeys = process.env.NHN_SMS_APP_KEY;
	const appSecretKey = process.env.NHN_SMS_X_SECRET_KEY;
	const sender = process.env.NHN_SMS_SENDER;

	const result2 = await axios.post(
		`https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKeys}/sender/sms`,
		{
			body: `개발자 석범이의 테스트 문자, 인증번호는 ${result}`,
			sendNo: sender,
			recipientList: [{ recipientNo: telNum }],
		},
		{
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"X-Secret-Key": appSecretKey,
			},
		}
	);
	console.log(telNum + " 으로 인증번호 " + result + " 를 전송합니다.");
}
