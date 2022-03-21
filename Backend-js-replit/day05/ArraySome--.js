// 객체의 value에 null이 하나라도 있으면
// 순회를 멈추고 "400 ERROR"를 출력하도록
// solution 함수를 완성해주세요.
function solution(element, index, array) {
	console.log(index);
	if (!element) {
		return console.log("400 ERROR"); //리턴을 통해 순회를 종료한다.
	}
}

const inputs = {
	name: "코캠",
	title: null,
	contents: "안녕하세요.",
};

Object.values(inputs).some(solution);
// 0
// 1
// 400 ERROR
