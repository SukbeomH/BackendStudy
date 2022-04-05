// 최대공약수와 최소공배수
// 문제 설명
// 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하는 함수, solution을 완성해 보세요.
// 배열의 맨 앞에 최대공약수, 그다음 최소공배수를 넣어 반환하면 됩니다.
// 예를 들어 두 수 3, 12의 최대공약수는 3, 최소공배수는 12이므로 solution(3, 12)는[3, 12]를 반환해야 합니다.

// 제한 사항
// 두 수는 1이상 1000000이하의 자연수입니다.

function solution(a, b) {
	let maxCommonDiv = 0;
	let minCommonMul = 0;

	for (let i = 1; i <= a || i <= b; i++) {
		if (a % i === 0 && b % i === 0) {
			maxCommonDiv = i;
		}
	}
	for (let j = a * b; j >= a || j >= b; j--) {
		if (j % a === 0 && j % b === 0) {
			minCommonMul = j;
		}
	}
	return [maxCommonDiv, minCommonMul];
}

// 최대공약수 공식
// 유클리드 호제법
// a를 b로 나눴을 때(a가 b보다 큼), 이때의 나머지 값이 0이 되면, b가 최대공약수이다.
// 만약 나머지 c가 0이 아니라면, b를 나머지 c로 다시 나눈다. 이때 나머지가 0이면 c가 최대공약수이다.
// 나머지가 0이 될 때까지 이를 반복한다. 나머지가 0이 된 순간 나눴던 수가 최대공약수가 된다.

function solution(a, b) {
	let x = Math.max(a, b); // 둘 중 큰 수
	let y = Math.min(a, b); // 작은 수
	let r = 0; // 나머지값을 담을 변수

	let answer = [];

	if (x % y === 0) {
	}
	for (r; x % y > 0; r = x % y) {
		x = y;
		y = r;
	}
}
