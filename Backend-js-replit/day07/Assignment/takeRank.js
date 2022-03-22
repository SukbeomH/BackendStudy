//assignment
function takeRank(arr) {
	// 1. 어레이를 2차원으로 변환한다 (arr.length x 2)
	// 2. 변환된 어레이의 row에는 본래 점수 값을 넣는다
	// 2-1. 점수는 비교하여 내림차순 정렬한다.
	// 2-2. 등수는 1부터, 점수가 왼쪽값과 동일하면 그대로, 다르면 +1
	// 3. 변환된 어레이의 column에는 등수를 넣는다
	// 4. 점수와 등수 위치를 치환하거나 등수만 뽑아 반환한다

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
