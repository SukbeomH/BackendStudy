console.log("안녕하세요");

//module 방식
import { checkValidationPhone, getToken, sendToPhone } from "./phone.js";
//commonJS 방식
// const {} = reqiure('./phone.js')

//보다 API스럽게 만들어보자
export function createTokenOfPhone(telnum) {
	const isValid = checkValidationPhone(telnum);
	if (isValid) {
		const result = getToken();
		sendToPhone(telnum, result);
	}
}

// createTokenOfPhone("01012345678")
