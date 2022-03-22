// 배열의 길이를 지정하면, 배열의 짝수번째 인덱스는 2로
// 홀수번째는 3인 배열을 생성하는 함수를 만들어주세요.

function array(n) {
	// Array.from을 사용해주세요.
	let arr = Array.from(Array(n), (ele, idx) =>
		idx % 2 === 0 ? (ele = 2) : (ele = 3)
	);
	return arr;
}

console.log(array(10)); //[ 2, 3, 2, 3, 2, 3, 2, 3, 2, 3 ]
