//assignment
function takeRank(arr) {
	let answer = Array.from(arr, (ele) => {
		let rank = 1;
		for (let i = 0; i <= arr.length; i++) {
			if (ele < arr[i]) {
				rank++;
				console.log(rank);
			}
		}
		return rank;
	});

	// answer[0][i] = answer[i][0].sort((a, b) => b - a);
	console.log(answer);
	return answer;
}
takeRank([87, 89, 92, 100, 76]); //[4, 3, 2, 1, 5]
// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = takeRank;

function answer2(arr) {
	// 1. 어레이를 2차원으로 변환한다 (arr.length x 2)
	let temp = Array.from(new Array(2), (e, i) =>
		// 2. 변환된 어레이의 첫번째의 row에는 본래 점수 값을 넣는다
		// 2-1. 두번째 row에는 1로 채운다.
		i === 0 ? arr : Array(arr.length).fill(1)
	);
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (answer[0][i] < answer[0][j]) {
				answer[1][j]++;
			}
		}
	}
	return answer[1];
}
