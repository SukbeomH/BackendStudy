// module 방식
import { checkValidationPhone, getToken, sendToPhone } from "./phoneSystem.js";

// 보다 API스럽게 만들어보자
export function createTokenOfPhone(telNum) {
	const isValid = checkValidationPhone(telNum);
	if (isValid) {
		const result = getToken();
		sendToPhone(telNum, result);
		return result;
	}
}
// createTokenOfPhone("01012345678")
