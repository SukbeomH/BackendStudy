//계단을 최대 2개 오를 수 있는 로봇이 현재
//1층에 있다, 100층까지 최소횟수로 올라가는 방법은?
let now = 1;
let destination = 100;

let floor = destination - now + 1;

if ( floor % 2 === 0 ) {
  const answer = floor/2
  console.log(answer);
} else {
  console.log(floor / 2) + 1;
}