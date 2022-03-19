// 문제 설명
// 정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

// 제한 사항
// n은 0 이상 3000이하인 정수입니다.

function solution(n) {
	var answer = 0;
	for (let i = 1; i <= n; i++) {
		if (n % i === 0) {
			answer += i;
		}
	}
	return answer;
}

// function solution(n) {
// 	var answer = 0;
// 	let i;
//              n의 제곱근까지만 연산한다
// 	for (i = 1; i <= Math.sqrt(n); i++) {
// 		if (!(n % i)) {
//           그 대신 약수 i를 구할 때, 그 반대 약수를 같이 더한다
// 			answer += i + n / i;
// 		}
// 	}
//  뭔소린지 모르겠음
// 	i--;
// 	return i === n / i ? answer - i : answer;
// }
