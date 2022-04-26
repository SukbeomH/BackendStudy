import { getToken, sendToPhone } from "./services/phone.js";
import { Token } from "../models/token.model.js";

export class SendToken {
	tokenWorks = async (req, res) => {
		const phoneN = req.body.phone;
		//토큰 제작
		const tokenMade = getToken();
		// 전화번호가 이미 데이터베이스에 있는지 확인
		if (await Token.exists({ phone: phoneN })) {
			// 전화번호가 데이터베이스에 있으므로 전화번호를 기준으로 토큰을 업데이트한다.
			await Token.updateOne(
				{ phone: phoneN },
				{ $set: { token: tokenMade, isAuth: false } }
			);
			//인증번호를 보낸다
			await sendToPhone(phoneN, tokenMade);
			// 번호 확인용 반응
			res.send(phoneN + "으로 인증번호 재전송됨");
		} else {
			// 전화번호가 없으면 처음요청이므로 저장한다.
			const saving = await new Token({
				phone: phoneN,
				token: tokenMade,
				isAuth: false,
			});
			await saving.save();
			//인증번호를 보낸다
			await sendToPhone(phoneN, tokenMade);
			// 번호 확인용 반응
			res.send(phoneN + "으로 인증번호 최초 전송됨");
		}
	};
}
