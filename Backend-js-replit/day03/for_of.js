// 숫자로만 이루어진 배열이 있습니다.
// for-of를 이용해 숫자의 총합을 구해주세요.

const arr = [11, 22, 33, 44, 55];
let sum = 0;

// for-of
for (let ele of arr) {
    sum = sum + ele;
}

console.log(sum); // 165
//중요한 점은 배열의 값을 내놓는다는 것.


// while을 이용해서 사용하는 방법
let sum2 = 0;
let i = 0; // 먼저 사용할 변수를 밖에서 선언
while (i<arr.length) {
    sum2 = sum2 + arr[i];
    i = i + 1; // 변수의 변화도 따로 안에서 선언
}
console.log(sum2);