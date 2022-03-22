//핸드폰 번호는 제대로 입력되어있는가?
export function checkValidationPhone(telnum) {
  if (telnum.length !== 10 && telnum.length !== 11) {
    console.log("올바른 핸드폰 번호를 입력하세요");
    return false;
  } else {
    return true;
  }
}

//6자리 토큰을 생성한다
export function getToken() {
  const numlength = 6;
  if (numlength <= 0) {
    console.log("자릿수가 너무 적습니다");
    return;
  } else if (numlength > 10) {
    console.log("자릿수가 너무 많습니다");
    return;
  } else if (numlength === undefined) {
    console.log("자릿수를 입력해 주세요");
    return;
  }
  const result = String(Math.floor(Math.random() * 10 ** numlength)).padStart(
    numlength,
    "0"
  );
  return result;
}

//생성한 토큰을 핸드폰에 전송한다
export function sendToPhone(telnum, result) {
  // console.log(telnum + " 으로 인증번호 " + result + " 를 전송합니다.");
}
