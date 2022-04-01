// 시저 암호

// 문제 설명
// 어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는
// 암호화 방식을 시저 암호라고 합니다.
// 예를 들어 "AB"는 1만큼 밀면 "BC"가 되고, 3만큼 밀면 "DE"가 됩니다.
// "z"는 1만큼 밀면 "a"가 됩니다.
// 문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.

// 제한 조건
// 공백은 아무리 밀어도 공백입니다.
// s는 알파벳 소문자, 대문자, 공백으로만 이루어져 있습니다.
// s의 길이는 8000이하입니다.
// n은 1 이상, 25이하인 자연수입니다.

// a.charCodeAt() : 97
// z.charCodeAt() : 122
// A.charCodeAt() : 65
// Z.charCodeAt() : 90
function solution(s, n) {
	let answer = s.split(" ").map((e1, i1, a1) => {
		e1.split("").map((e2, i2, a2) => {
			if (e2.charCodeAt() < 95) {
				return String.fromCharCode(((e2.charCodeAt() + n) % 24) + 73);
			} else {
				return String.fromCharCode(((e2.charCodeAt() + n) % 24) + 96);
			}
		});
		return Array(e1);
	});
	return answer.join(" ").toString();
}

// s = "hello world"
function solution(s, n) {
	const word = s.split(" ");
	const mapS = new Map();

	for (let i in word) {
		mapS.set(word.charCodeAt(), i);
	}
	console.log(mapS);
}
