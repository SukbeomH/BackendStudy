// 입력되는 score에 따라 알맞은 등급을 적어야 합니다.
// 100~90 → "A"
// 89~80 → "B"
// 79~70 → "C"
// 69~60 → "D"
// 59점 이하는 "F"
// 100점 초과나 0점 미만은 "잘못된 점수입니다"라는 문구를 띄워주세요.

function grade(score) {
	let grd = "";
	if (score < 0 || score > 100) {
		grd = "잘못된 점수입니다";
	} else if (score >= 90) {
		// && score <= 100 의 조건은 이미 위에서 검증되었으므로 생략 가능
		grd = "A";
	} else if (score >= 80) {
		// && score < 90 의 조건은 이미 위에서 검증되었으므로 생략 가능
		grd = "B";
	} else if (score >= 70) {
		// ......
		grd = "C";
	} else if (score >= 60) {
		// ...
		grd = "D";
	} else {
		//  .. 최후에는 전부 위에서 검증되고 남은 값이므로 else, 자연스럽게 코드가 간결해졌다
		grd = "F";
	}
	console.log(grd);
}
grade(105); // "잘못된 점수입니다"
grade(-10); // "잘못된 점수입니다"
grade(97); // "A"
grade(86); // "B"
grade(75); // "C"
grade(66); // "D"
grade(52); // "F"
