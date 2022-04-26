export function isEmailVaild(mail) {
    //1. 존재여부 
    //2. @가 포함되어 있어야 함
    if (mail === undefined || mail.includes("@") === false) {
        console.log("올바르게 이메일을 입력하세요~~");
        return false
    } else {
        return true
    }
}