import { UserModel } from "../models/user.model.js";
import { Token } from "../models/token.model.js";
import { getOpenGraph } from "./services/prefer.js";
import { sendTemplateToEmail, getWelcomeTemplate } from "./services/email.js";

export class RegisterUser {
	userSubmit = async (req, res) => {
		// 입력된 핸드폰 번호가 DB에 있는가
		if (
			(await Token.exists({ phone: req.body.phone })) &&
			(await Token.exists({ isAuth: true }))
		) {
			// 번호도 있고 인증도 올바르게 되었다면 새 유저 생성
			const userSubmit = await new UserModel({
				name: req.body.name,
				email: req.body.email,
				// 주민등록번호는 뒷자리를 전부 *로 바꿔 저장
				personal: req.body.personal.split("").fill("*", -7).join(""),
				// 좋아하는 사이트의 OG 메타정보를 스크랩, 오브젝트로 DB에 저장
				og: await getOpenGraph(req.body.prefer),
				prefer: req.body.prefer,
				pwd: req.body.pwd,
				phone: req.body.phone,
			});
			// 가공한 데이터를 데이터베이스에 저장
			await userSubmit.save();
			// 회원 가입 환영 이메일을 전송
			await sendTemplateToEmail(req.body.email, getWelcomeTemplate(userSubmit));
			const id = await userSubmit.get("_id");
			res.send(id);
		} else {
			// 번호가 없거나 인증이 완료되지 않았다면
			res.status(422).send("에러 : 핸드폰번호가 인증되지 않았습니다");
		}
	};
}
