// 문자열 s의 길이가 4 혹은 6이고,
// 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요.
// 예를 들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.

// 제한 사항
// s는 길이 1 이상, 길이 8 이하인 문자열입니다.

function solution(s) {
	if (!(s.length == 4 || s.length == 6)) {
		return false;
	} else {
		const tmp = s.split("");
		for (let i = 0; i < tmp.length; i++) {
			if (isNaN(tmp[i])) {
				return false;
			}
		}
	}
	return true;
}
solution("a234"); //false
solution("1234"); //true

// 지수 e 의 경우를 감안
// 0000 이나 0을 포함하는 경우도 감안
