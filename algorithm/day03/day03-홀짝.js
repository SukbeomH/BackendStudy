// 입력되는 숫자가 짝수인지 홀수인지 구별하는 함수를 만들려고 합니다. 
// 입력된 값이 "짝수"이면 "Even", "홀수"이면 "Odd", 0이면 "Zero"라는 문구를 띄워주세요.

function evenOdd(num) {
	if(num === 0) {
        return "Zero";
    } else if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}