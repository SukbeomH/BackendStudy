// 정수가 들어있는 배열
// 안의 정수를 뒤집어서 뒤집힌 정수가 소수인가? (32 -> 23 은 소수인가?)
// 소수라면 배열에 넣고 전체 배열을 반환
// 뒤집은 뒤 0이 앞으로 오는 것은 제외

const arr = [32, 55, 62, 20, 250, 370, 30, 10];

function isPrime(n) {
	for (let i = 2; i < Math.sqrt(n); i++) {
		if (n % i === 0) return false;
	}
	return n > 1;
}

function solution(arr) {
	let temp = [];
	let answer = [];

	temp = arr.map((ele, idx, arr0) => {
		return parseInt(String(ele).split("").reverse().join(""));
	});
	answer = temp.filter(isPrime);

	console.log(answer);
	return answer;
	// console.log(String(32).split("").reverse().join(""));
}
solution(arr);
