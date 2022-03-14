console.log("안녕하세요")

// //n길이의 랜덤 토큰을 만든다
// function getToken(numlength) {
//     if (numlength <= 0) {
//         console.log("자릿수가 너무 적습니다");
//         return
//     } else if (numlength > 10) {
//         console.log("자릿수가 너무 많습니다");
//         return
//     } else if (numlength === undefined) {
//         console.log("자릿수를 입력해 주세요");
//         return
//     } else {
//         const result = String(Math.floor(Math.random() * (10 ** numlength))).padStart(numlength, "0");
//         console.log(result);
//     }
// }
// getToken(5)

//보다 API스럽게 만들어보자
function createTokenOfPhone(telnum) {
    //핸드폰 번호는 제대로 입력되어있는가?
    if (telnum.length !== 10 && telnum.length !== 11) {
        console.log("올바른 핸드폰 번호를 입력하세요")
    } 
    //그렇다면 6자리 토큰을 생성한다
    const numlength = 6;
    function getToken(numlength) {
        if (numlength <= 0) {
            console.log("자릿수가 너무 적습니다");
            return
        } else if (numlength > 10) {
            console.log("자릿수가 너무 많습니다");
            return
        } else if (numlength === undefined) {
            console.log("자릿수를 입력해 주세요");
            return
        } 
        const result = String(Math.floor(Math.random() * (10 ** numlength))).padStart(numlength, "0");
        //생성한 토큰을 핸드폰에 전송한다
        console.log(telnum + "으로 인증번호 " + result + " 를 전송합니다.")
    }
}

createTokenOfPhone("01012345678")