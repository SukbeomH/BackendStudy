//assignment
function vote(str) {
	// -----------------------------------------
	let result = new Map();
	for (let s of str) {
		result.set(s, 0);
	}
	for (let s of str) {
		result.set(s, result.get(s) + 1);
	} // --------------------------------------
	let vote = [];
	for (let v of result.values()) {
		vote.push(v);
	}
	let name = [];
	for (let n of result.keys()) {
		name.push(n);
	}
	return name[Math.max(parseInt(vote.join())) - 1];
}

// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = vote;
