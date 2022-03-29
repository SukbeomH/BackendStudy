function zzz(aaaa) {
	console.log("이게 되네 ㅋㅋ");
	console.log(aaaa);
	console.log("-----------");
}

@zzz
class AppController {}

// public
class MonsterPublic {
	constructor(public powerInput) {
		this.powerInput = powerInput;
	}
	attack() {
		console.log("싸운당!");
	}
}
const monsterPublic = new MonsterPublic(55);
monsterPublic.powerInput = 100;

// private
class MonsterPrivate {
	constructor(private powerInput) {
		this.powerInput = powerInput;
	}
	attack() {
		console.log("싸운당!");
	}
}
const monsterPrivate = new MonsterPrivate(100);
monsterPrivate.powerInput; //powerInput 속성은 MonsterPrivate 클래스 내에서만 엑세스 가능

// read-only
class MonsterReadOnly {
	constructor(readonly powerInput) {
		this.powerInput = powerInput;
	}
	attack() {
		console.log("싸운당!");
	}
}
const monsterReadOnly = new MonsterReadOnly(55);
monsterReadOnly.powerInput = 100;
