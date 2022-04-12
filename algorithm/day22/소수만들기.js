// 소수 만들기
// 문제 설명
// 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다.
// 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때,
// nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
// nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다.

function solution(nums) {
	let sum = [];
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			for (let k = j + 1; k < nums.length; k++) {
				sum.push(nums[i] + nums[j] + nums[k]);
			}
		}
	}
	return sum.filter((ele) => {
		for (let i = 2; i <= ele / 2; i++) {
			if (ele % i === 0) {
				return false;
			}
		}
		return true;
	}).length;
}

//
function methods(nums) {
	let answer = 0;
	let idx = 0;

	// 첫번째 수 = num1
	nums.forEach((num1, i) => {
		idx = i + 1;
		// 두번째 수 = num2
		nums.slice(idx).forEach((num2) => {
			idx++;
			// 세번째 수 = num3
			nums.slice(idx).forEach((num3) => {
				const sum = num1 + num2 + num3;

				let count = 0;
				//짝수는 판별할 필요 없다.
				if (sum % 2 === 1) {
					for (let j = 0; j <= sum; j++) {
						if (sum % j === 0) {
							count++;
						}
						if (count > 2) {
							break;
						}
						if (count === 2) {
							answer++;
						}
					}
				}
			});
		});
	});
	return answer;
}
