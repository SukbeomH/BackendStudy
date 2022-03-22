// 문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.

// 제한 사항
// 문자열 전체의 짝/홀수 인덱스가 아니라, 단어(공백을 기준)별로 짝/홀수 인덱스를 판단해야합니다.
// 첫 번째 글자는 0번째 인덱스로 보아 짝수번째 알파벳으로 처리해야 합니다.

function solution(s) {
	var answer = [];
	let answerTemp = [];
	// s 문자열을 띄어쓰기 기준으로 나누어 어레이로 만든다
	let newArr = s.split(" ");
	//console.log(newArr); //[ 'try', 'hello', 'world' ]
	// newArr를 각 엘레먼트의 글자 길이만큼 순회한다
	newArr.forEach((ele, idx, arr) => {
		// 각 엘레먼트에서 글자 수만큼 순회한다
		for (let i = 0; i < ele.length; i++) {
			// 엘레먼트의 글자순서가 짝,홀수인지 구분한다
			if (i % 2 === 0) {
				// 인덱스가 짝수면 대문자화
				ele[i].toUpperCase();
			} else if (i % 2 === 1) {
				// 인덱스가 홀수면 소문자화
				ele[i].toLowerCase();
			}
		}
	});
	console.log(answerTemp);
	return answer;
}
solution("try hello world");
