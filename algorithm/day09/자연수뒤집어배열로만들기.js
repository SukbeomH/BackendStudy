// 자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요.
//  예를들어 n이 12345이면[5, 4, 3, 2, 1]을 리턴합니다.

// 제한 조건
// n은 10,000,000,000이하인 자연수입니다.
function solution(n) {
	return n
		.toString()
		.split("")
		.reverse()
		.map((e) => e / 1);
	// .map(e => Number(e))
}

solution(12345); // [5,4,3,2,1]

// old fashioned way
function solution2(n) {
	let answer = [];
	n = String(n);
	for (let i = n.length - 1; i >= 0; i--) {
		answer.push(Number(n[i]));
	}
	return answer;
}
