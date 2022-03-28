// 비행타입, 육상타입 몬스터를 만들고 싶다
class skyUnit {
	run() {
		console.log("날아서 도망친다");
	}
}
class groundUnit {
	constructor(n) {
		power = n;
	}
	run() {
		console.log("뛰어서 도망친다");
	}
}
// 비행타입을 상속받고 싶다
class Monster extends groundUnit {
	power = 10;
	attack() {
		console.log("공격하겠다!");
		console.log("내 공격력은 " + this.power + "!!!");
	}
	// super를 통해 입력받은 값을 역으로 올려보낸다
	constructor(x) {
		super(x);
	}
}
const groundMonster = new Monster();
groundMonster.run();
