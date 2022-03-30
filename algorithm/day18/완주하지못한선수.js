// 완주하지 못한 선수

// 문제 설명
// 수많은 마라톤 선수들이 마라톤에 참여하였습니다.
// 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주하였습니다.

// 마라톤에 참여한 선수들의 이름이 담긴 배열 participant와 완주한 선수들의 이름이 담긴 배열 completion이 주어질 때,
// ["leo", "kiki", "eden"]
// ["eden", "kiki"]
// "leo"

// 완주하지 못한 선수의 이름을 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 마라톤 경기에 참여한 선수의 수는 1명 이상 100,000명 이하입니다.
// completion의 길이는 participant의 길이보다 1 작습니다.
// 참가자의 이름은 1개 이상 20개 이하의 알파벳 소문자로 이루어져 있습니다.
// 참가자 중에는 동명이인이 있을 수 있습니다.

// failed
function solutionF(participant, completion) {
	return participant.filter((e) => completion.includes(e)).toString();
}

// Slow
function solutionSlow(participant, completion) {
	for (let e of completion) {
		if (participant.includes(e)) {
			participant.splice(participant.indexOf(e), 1);
		}
	}
	console.log(participant.toString());
	return participant.toString();
}
solutionSlow([], []);

// sort ---------------------------------------------- Done!
function solution(participant, completion) {
	const sortP = participant.sort();
	const sortC = completion.sort();
	let answer;

	for (let i = 0; i < sortP.length; i++) {
		if (sortP[i] !== sortC[i]) {
			answer = sortP[i];
			return answer;
		}
	}
}

// object
function solutionO(participant, completion) {
	const objP = { ...participant };
	const objC = { ...completion };

	for (let i in objC) {
		for (let j in objP) {
			if (objC[i] !== objP[j]) {
				return objP[j].toString();
			}
		}
	}
}

// ---------------------------------------
function solution(participant, completion) {
	const map = new Map();
	for (let i = 0; i < participant.length; i++) {
		let a = participant[i],
			b = completion[i];
		map.set(a, (map.get(a) || 0) + 1);
		map.set(b, (map.get(b) || 0) - 1);
	}
	for (let [k, v] of map) {
		if (v > 0) return k;
	}
	return "nothing";
}

// hash
function solution(participant, completion) {
	const hash = {};

	for (let val of participant) {
		if (!hash[val]) {
			hash[val] = 0;
		}
		hash[val]++;
	}
	completion.forEach((val) => hash[val]--);

	for (let key in hash) {
		if (hash[key]) {
			return key;
		}
	}
}
