console.log("안녕하세요")

//n길이의 랜덤 토큰을 만든다
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
    } else {
        const result = String(Math.floor(Math.random() * (10 ** numlength))).padStart(numlength, "0");
        console.log(result);
    }
}
getToken(5)

