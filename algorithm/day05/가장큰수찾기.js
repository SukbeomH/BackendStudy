// str은 무작위 숫자인 문자열입니다.  
// 해당 문자열에서 가장 큰 수를 구하는 함수를 만들어야 합니다.
// 만약 str에 "12345"가 들어온다면 "5"를 나타내야 합니다.
//  str에서 각각의 문자를 숫자로 바꿔서 계산해야 합니다.
//  비교할 수 있는 기준값이 있어야 합니다.
//  최댓값을 저장할 수 있는 변수가 있어야 합니다.

function bigNum(str) {
    let biggest = 0;
    let numarr = [];
    for (let i = 0; i < str.length; i++){
        let num = Number(str[i]);
        numarr.push(num);
    }
    function smallToBig(a, b) {
        return a - b;
    }
    biggest = numarr.sort(smallToBig)[numarr.length - 1];
    console.log(biggest);
}
bigNum("12345") // 5
bigNum("87135") // 8