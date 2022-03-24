//assignment
function vote(str) {
	// 아래에 코드를 작성해주세요.
	let answer = new Map();
	for (let s of str) {
		answer.set(s, 0);
	}
	for (let s of str) {
		answer.set(s, answer.get(s) + 1);
	}
	let vote = [];
	for (let v of answer.values()) {
		vote.push(v);
	}
	let name = [];
	for (let n of answer.keys()) {
		name.push(n);
	}
	return name[Math.max(parseInt(vote.join())) - 1];
}

// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = vote;
