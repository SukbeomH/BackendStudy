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

function solution2(n) {
	var answer = n;
	for (let i = 1; i <= n / 2; i++) {
		if (n % i === 0) {
			answer += i;
		}
	}
	return answer;
}

function solution3(n) {
	// n의 공간을 가진 새 배열을 만드는 법
	const answer = new Array(n);
	// 이 상태로는 undefined로 채워져있어서 메소드 사용불가.
	answer = answer.fill(1);
	// 일괄적으로 1을 채워줌

	// 누적
	answer.reduce((acc, cur) => {
		return n % (cur + i) === 0 ? acc + (cur + i) : acc;
	}, 0);
}
