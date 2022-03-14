// 주민번호 뒷 자리를 가리는 함수를 하나 만들고, 해당 함수에 “920324-1038293” 와 같이 
//      주민번호를 넣어서 실행하면 “920324 - 1 ******” 와 같은 형태로 콘솔에 출력되도록 만들어 주세요.
export function NumInputFront(regNumber) {
    const frontNum = String(regNumber.split('-')[0]);
    return frontNum;
}
export function NumInputback(regNumber) {
    const backNum = String(regNumber.split('-')[1]);
    return backNum;
}
//     1. 주민번호는 앞 6자리, 뒤 7자리로 구성되어야 합니다.
//         - 그렇지 않을 경우 에러를 출력해주세요. (”에러발생!!! 갯수를 제대로 입력해주세요!!!”)
export function isNumValid(frontNum, backNum) {
    
    if (frontNum.length !== 6) {
        console.log("에러발생!!! 갯수를 제대로 입력해주세요!!!");
        console.log("앞자리"+frontNum.length)
        return false
    } else if (backNum.length !== 7) { 
        console.log("에러발생!!! 갯수를 제대로 입력해주세요!!!");
        console.log("뒷자리"+backNum.length)
        return false
    } else {
        return true
    }
}
//     2. 주민번호 가운데가 ”-” 로 구성되어야 합니다. 
//         - 그렇지 않을 경우 에러를 출력해주세요. (”에러발생!!! 형식이 올바르지 않습니다!!!”)
export function isDividerValid(regNumber) {
    if (regNumber.includes('-')) {
        return true
    } else {
        console.log("에러발생!!! 형식이 올바르지 않습니다!!!")
        return false
    }
}
//     3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 출력해 주세요.
export function MaskedNum(regNumber) {
    let arr = regNumber.split('');
    // 여기에서 작성해주세요.
    for (let i = 0; i < 6; i++){
      arr.pop()
    }
    for (let i = 0; i < 6; i++){
      arr.push("*")
    }
    const result = String(arr.join(''));
    console.log(result)
    return result;
  }
//   함수에 “920324-1038293”를 넣어 실행