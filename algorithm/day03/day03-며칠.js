// 입력되는 달(month)에 따라 각 달에 며칠이 있는지 보여주는 함수를 만들려고 합니다.
// 각 조건에 해당하는 알맞은 값을 입력해주세요.

function days(month) {
    if (month === 2) {
        retrun`${month}월 : 28일`
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        retrun`${month}월 : 30일`
    } else {
        retrun `${month}월 : 31일`
    }
}