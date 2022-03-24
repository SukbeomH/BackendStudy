// 문자열로 이루어진 두 배열이 주어졌을 때 두 배열에 모두 갖고 있는 문자의 개수를 출력하는 함수를 만들어주세요.

function common(arr1, arr2) {
	// Set 객체를 사용해주세요.
	let result = 0;
	const setArr1 = new Set(arr1);
	const setArr2 = new Set(arr2);
	for (let e of setArr2) {
		if (setArr1.has(e)) {
			result++;
		}
	}
	return result;
}
let a = ["a", "b", "c", "c", "b"];
let b = ["b", "b", "b", "c", "e", "e", "f"];
console.log(common(a, b)); // 2
