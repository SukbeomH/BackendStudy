import { Token } from "../models/token.model.js";

export class AuthPhone {
	authToken = async (req, res) => {
		// 전화번호가 동일하다 && 토큰이 동일하다
		if (
			(await Token.exists({ phone: req.body.phone })) &&
			(await Token.exists({ token: req.body.token }))
		) {
			// isAuth를 true로 바꾼다
			await Token.updateOne(
				{ phone: req.body.phone },
				{ $set: { isAuth: true } }
			);
			// 결과를 돌려보낸다.
			res.send(true);
		} else {
			res.send(false);
		}
	};
}
