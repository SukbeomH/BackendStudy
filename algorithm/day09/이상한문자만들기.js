// 문자열 s는 한 개 이상의 단어로 구성되어 있습니다.
// 각 단어는 하나 이상의 공백문자로 구분되어 있습니다.
// 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼
// 문자열을 리턴하는 함수, solution을 완성하세요.

// 제한 사항
// 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로
// 짝 / 홀수 인덱스를 판단해야합니다.
// 첫 번째 글자는 0번째 인덱스로 보아 짝수번째 알파벳으로 처리해야 합니다.

function solution(s) {
	var answer = "";
	answer = s
		.split(" ")
		.map((e) =>
			e
				.split("")
				.map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
				.join("")
		)
		.join(" ");
	console.log(answer);
	return answer;
}
solution("try hello world");

function solution2(s) {
	let answer = "";
	// 단어별로 인덱스를 구분하기 위해서 사용
	let idx = 0;
	for (let i = 0; i < s.length; i++) {
		// 공백을 찾은 경우
		if (s[i] === " ") {
			answer += s[i]; // === " "
			idx = 0; // 공백이 나오면 인덱스값을 초기화
		} else {
			// 각 인덱스에서 짝/홀수를 대문자와 소문자화
			answer += idx % 2 === 0 ? s[i].toUpperCase() : s[i].toLowerCase();
			idx++;
		}
	}
	return answer;
}

// 메소드를 이용한 풀이
function solution3(s) {
	// 2차원 배열 형태로 변환
	const answer = s
		.split(" ")
		.map((str) => {
			return str
				.split("")
				.map((letter, idx) => {
					return idx % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase();
				})
				.join("");
		})
		.join(" ");
}
