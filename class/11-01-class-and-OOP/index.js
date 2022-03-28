const hsb = new Date();
console.log(hsb.getFullYear());
console.log(hsb.getMonth() + 1);

class Monster {
	// 파라미터
	power = 10;
	speed = 5;

	// 이벤트
	attack = () => {
		console.log(this.power + "의 힘으로 때린다!!");
	};
	run = () => {
		console.log(this.speed + "의 속도로 도망치자!!");
	};

	// 생성자
	constructor(n) {
		this.power = n;
	}
}

const goblin = new Monster(10);
goblin.attack();
goblin.run();

const hobGoblin = new Monster(30);
hobGoblin.attack();
hobGoblin.run();
