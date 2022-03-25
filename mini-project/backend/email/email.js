import { getToday } from "../utils/utils.js";
import axios from "axios";

function getWelcomeTemplate({ name, phone, prefer }) {
	return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>핸드폰번호: ${phone}}</div>
                <div>좋아하는 사이트: ${prefer}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `;
}

export async function sendTemplateToEmail(email, template) {
	const appKey = process.env.NHN_EMAIL_APP_KEY;
	const XSecretKey = process.env.NHN_EMAIL_X_SECRET_KEY;
	const sender = process.env.NHN_EMAIL_SENDER;

	await axios.post(
		`https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`,
		{
			senderAddress: `support@${sender}`,
			title: "API test 입니다",
			body: template,
			receiverList: [{ receiveMailAddr: email, receiveType: "MRT0" }],
		},
		{
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"X-Secret-Key": XSecretKey,
			},
		}
	);
}
