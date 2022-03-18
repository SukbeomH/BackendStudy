// 문자열 s의 길이가 4 혹은 6이고,
// 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요.
// 예를 들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.

// 제한 사항
// s는 길이 1 이상, 길이 8 이하인 문자열입니다.

function solution(s) {
	if (s.length === 4 || s.length === 6) {
		for (let i = 0; i < s.length; i++) {
			//문자가 포함되어있는가?
			if (typeof Number(s[i]) === "string") {
				return false;
			}
			return true;
		}
	}
	return true;
}

solution("a234"); //false
solution("1234"); //true
