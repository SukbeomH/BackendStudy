// myShooping은 내가 구매한 목록을 보여주고 있습니다.
// 해당 목록에서 "의류"를 구매한 횟수와 총 금액을 나타내고,
// "의류"를 구매한 횟수에 따라 등급을 나타내세요.

//     등급표
// "0~2"  ⇒ Bronze
// "3~4" ⇒ Silver
// 5이상 ⇒ Gold

// - 반복문을 통해 문제를 풀어야 합니다.
// - myShopping 내용을 직접 수정하면 안 됩니다.
// - 예상 결과에 나온 문구와 형식이 같아야 합니다.
const myShopping = [
	{ category: "과일", price: 12000 },
	{ category: "의류", price: 10000 },
	{ category: "의류", price: 20000 },
	{ category: "장난감", price: 9000 },
	{ category: "과일", price: 5000 },
	{ category: "의류", price: 10000 },
	{ category: "과일", price: 8000 },
	{ category: "의류", price: 7000 },
	{ category: "장난감", price: 5000 },
	{ category: "의류", price: 10000 },
];

function shopClothes(list) {
	let buy = 0;
	let cost = 0;
	let grade = "";
	for (let element of list) {
		if (element.category === "의류") {
			buy = buy + 1; // buy++
			cost = cost + element.price; // cost += element.price
			if (buy >= 5) {
				grade = "Gold";
			} else if (buy > 2) {
				grade = "Silver";
			} else {
				grade = "Bronze";
			}
		}
	}
	// console.log(`의류를 구매한 횟수는 총 ${buy}회 금액은 ${cost}원이며 등급은 ${grade}입니다.`)
	return `의류를 구매한 횟수는 총 ${buy}회 금액은 ${cost}원이며 등급은 ${grade}입니다.`;
}

shopClothes(myShopping);

//의류를 구매한 횟수는 총 5회 금액은 57000원이며 등급은 Gold입니다.

// 강사님 버전
function shopClothes(list) {
	let buy = 0;
	let cost = 0;
	let grade = "";
	for (let element of list) {
		if (element.category === "의류") {
			buy++;
			cost += element.price;
		} // 위쪽 if에 nesting 할 필요가 없다.
		if (buy >= 5) {
			grade = "Gold";
		} else if (buy > 2) {
			grade = "Silver";
		} else {
			grade = "Bronze";
		}
	}
	// console.log(`의류를 구매한 횟수는 총 ${buy}회 금액은 ${cost}원이며 등급은 ${grade}입니다.`)
	return `의류를 구매한 횟수는 총 ${buy}회 금액은 ${cost}원이며 등급은 ${grade}입니다.`;
}
