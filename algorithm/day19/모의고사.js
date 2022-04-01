// 모의고사
// 문제 설명
// 수포자는 수학을 포기한 사람의 준말입니다.
// 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다.
// 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

// 1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
// 2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
// 3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

// 1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때,
// 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 제한 조건
// 시험은 최대 10,000 문제로 구성되어있습니다.
// 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
// 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.

function solution(answers) {
	let answer = [];
	let one = [1, 2, 3, 4, 5]; // 5
	let oneCorrect = 0;
	let two = [2, 1, 2, 3, 2, 4, 2, 5]; // 8
	let twoCorrect = 0;
	let three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]; // 10
	let threeCorrect = 0;

	// one의 경우
	for (one; one.length < answers.length + 5; one.push(1, 2, 3, 4, 5)) {}
	for (let i = 0; i < answers.length; i++) {
		if (one[i] === answers[i]) {
			oneCorrect++;
		}
	}
	// two의 경우
	for (
		two;
		two.length < answers.length + 8;
		two.push(2, 1, 2, 3, 2, 4, 2, 5)
	) {}
	for (let i = 0; i < answers.length; i++) {
		if (two[i] === answers[i]) {
			twoCorrect++;
		}
	}
	// three의 경우
	for (
		three;
		three.length < answers.length;
		three.push(3, 3, 1, 1, 2, 2, 4, 4, 5, 5)
	) {}
	for (let i = 0; i < answers.length + 10; i++) {
		if (three[i] === answers[i]) {
			threeCorrect++;
		}
	}
	let result = [];
	const max = Math.max(oneCorrect, twoCorrect, threeCorrect);
	answer = [oneCorrect, twoCorrect, threeCorrect];
	for (let i = 0; i < 3; i++) {
		if (max === answer[i]) {
			result.push(i + 1);
		}
	}

	return result;
}
