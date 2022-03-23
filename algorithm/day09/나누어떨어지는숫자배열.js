// 나누어 떨어지는 숫자 배열
// 문제 설명
// array의 각 element 중 divisor로 나누어 떨어지는 값을
// 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
// divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

// 제한사항
// arr은 자연수를 담은 배열입니다.
// 정수 i, j에 대해 i ≠ j 이면 arr[i] ≠ arr[j] 입니다.
// divisor는 자연수입니다.
// array는 길이 1 이상인 배열입니다.

function solution(arr, divisor) {
	var answer = [];
	let temp = [];
	if (arr.every((e) => e % divisor !== 0)) {
		temp = [-1];
	}
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] % divisor === 0) {
			temp.push(arr[i]);
		}
	}
	temp.sort((a, b) => a - b);
	return temp;
}

solution([5, 9, 7, 10], 5); // [5, 10]
solution([2, 36, 1, 3], 1); // [1, 2, 3, 36]
solution([3, 2, 6], 10); // [-1]

// answer = arr
// 		.filter((ele, idx, arr) => {
// 			if (ele % divisor === 0) {
// 				return ele;
// 			}
// 		})
// 		.sort((a, b) => a - b);

function solution2(arr, divisor) {
	// 어레이의 요소가 디바이더로 나뉠 경우 필터를 통과
	var answer = arr.filter((v) => v % divisor == 0);
	// 통과된 길이가 0이면 -1 어레이로 만든다. 그리고 만들어진 어레이들을 오름차순 정렬
	return answer.length == 0 ? [-1] : answer.sort((a, b) => a - b);
}
