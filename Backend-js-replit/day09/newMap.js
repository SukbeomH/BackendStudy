// 인자로 받은 문자열을 분류해서 기존에 있는 컬렉션에 개수를 더해주는 함수를 만들어 주세요.

function classification(str) {
	let map = new Map([
		["A", 1],
		["B", 2],
		["C", 3],
	]);
	let aN = 0;
	let bN = 0;
	let cN = 0;
	// Map객체의 메서드를 사용해보세요
	for (let s of str) {
		if (s === "A") {
			aN++;
		} else if (s === "B") {
			bN++;
		} else cN++;
	}
	map.set("A", map.get("A") + aN);
	map.set("B", map.get("B") + bN);
	map.set("C", map.get("C") + cN);
	// map.set("A", map.get("A") + aN);
	return map;
}
var str = "ABCCCAA";
console.log(classification(str)); //Map(3){'A' => 4, 'B' => 3, 'C' => 6}
