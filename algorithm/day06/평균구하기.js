// 정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.

// 제한사항
// arr은 길이 1 이상, 100 이하인 배열입니다.
// arr의 원소는 -10,000 이상 10,000 이하인 정수입니다.

function solution(arr) {
	var answer = 0;
	let temp = 0;
	for (let i = 0; i < arr.length; i++) {
		temp = temp + arr[i];
	}

	return (answer = temp / arr.length);
}

solution([1, 2, 3, 4]);
solution([5, 5]);

// Array.reduce( (누적값, cur) => {}, 초기값)
// 누적값은 함수 내에서 리턴한 값이 새로 들어가게 된다. 따라서 필수.
//
// 초기값은 최초 시작되는 값을 지정해줄 수 있다. (optional)
