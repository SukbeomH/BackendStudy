let aaa = "안녕하세요";
aaa = 3; // TS에서는 최초 생성시 타입을 추론하여 지정한다.

let bbb = 123;
bbb = 55;

// 타입 명시
let ccc: string = "반갑다 친구야";
ccc = 1; // 명시된 타입이 아니더라도 거부한다.

// 문자타입
let ddd: string;
ddd = "글자에용";
ddd = 33;

// 불린타입
let eee: boolean;
eee = true;
eee = false;
eee = "false"; // true로 작동해버림

// 숫자타입
let zzz: number;
zzz = 123;

// 배열타입
let fff: number[] = [1, 2, 3, 4, 5];
let abc: string[] = ["a", "b", "c", "d", "e", "f"];
let abcd: string[] = ["a", "b", 3, 4, 5];
let hhh: (number | string)[] = ["a", "b", 3, 4, 5]; // 여러 데이터 타입을 동시에 지원하는 배열

// 객체 인터페이스
interface iProfile {
	name: string;
	age: number | string;
	school: string;
	hobby: string;
}
// 객체타입
let profile0 = {
	name: "철수",
	age: 8,
	school: "다람쥐 초교",
};
profile0.age = "8살";

let profile: iProfile = {
	name: "철수",
	age: 8,
	school: "다람쥐 초교",
};
profile.school = 54321;

// 객체 인터페이스 추가될 수 도 있는 요소
interface iProfile2 {
	name: string;
	age: number | string;
	school: string;
	hobby?: string; // 추가될 수도 있는 요소 ?
}
let profile2: iProfile2 = {
	name: "철수",
	age: 8,
	school: "다람쥐 초교",
};
profile2.hobby = "연날리기";

// 함수 타입 -----------------------------------------------------
const add = (x, y, z) => {
	return x + y + z;
};
add(1200, 3100, "달러");

// 파라미터의 받는 입장에서 지정
const add2 = (x: number, y: number, z: string) => {
	return x + y + z;
};
add2(1200, 3100, "달러");
add2(1200, "ㅁㅁㅁㅁㅁ", 1234);

// 리턴 타입 지정
const add3 = (x, y, z): string => {
	return x + y + z;
};
