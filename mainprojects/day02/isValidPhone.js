//핸드폰 번호는 제대로 입력되어있는가?
export function isValidPhone(telnum) {
    if (telnum.length !== 10 && telnum.length !== 11) {
        console.log("올바른 핸드폰 번호를 입력하세요");
        return false
    } else {
        return true
    }
}