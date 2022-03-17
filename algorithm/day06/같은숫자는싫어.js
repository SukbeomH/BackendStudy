// 문제 설명
// 배열 arr가 주어집니다.배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다.이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다.단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다.예를 들면,

// arr = [1, 1, 3, 3, 0, 1, 1] 이면 [1, 3, 0, 1] 을 return 합니다.
// arr = [4, 4, 4, 3, 3] 이면 [4, 3] 을 return 합니다.
// 배열 arr에서 연속적으로 나타나는 숫자는 제거하고 남은 수들을 return 하는 solution 함수를 완성해 주세요.

// 제한사항
// 배열 arr의 크기 : 1,000,000 이하의 자연수
// 배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수
function solution(arr)
{
    var answer = [];
    for (let ele in arr) {
        //어레이 ele 번째 값이 그 다음값과 다르면 
        if (arr[ele] !== arr[ele + 1]) {
            //넣으려는 값이 새 배열의 마지막에 이미 있으면 넣지 않는다
            if (answer[answer.length - 1] !== arr[ele]) {
            //없다면 ele값을 새 배열에 넣는다
            answer.push(arr[ele]);
            }
        }
    }
    // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    console.log(answer)
    return answer;
}
solution([1, 1, 3, 3, 0, 1, 1])	//[1,3,0,1]
solution([4,4,4,3,3])	//[4,3]

//배열의 n번째 값과 n+1번째 값이 같으면
//n번째 값을 새 배열에 넣는다,
//n+2...n+n의 값이 이미 새 배열의 마지막에 있을 경우
//넣지 않는다


function solution2(arr) {
    var answer = [];
    for (let ele = 0; ele < arr.length; ele++) {
    //어레이 ele 번째 값이 그 다음값과 다르면 && 넣으려는 값이 새 배열의 마지막에 이미 있으면 넣지 않는다
        if ((arr[ele] !== arr[ele + 1])&&(answer[answer.length - 1] !== arr[ele])) {
            //없다면 ele값을 새 배열에 넣는다
            answer.push(arr[ele]);
        }
    }
    // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    console.log(answer)
    return answer;
}

//다른 풀이
function solution3(arr) {
    return arr.filter((val,index) => val !== arr[index+1]);
}

