const apple = 3;
const banana = 2;
//template literal
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다.`)

//가입환영함수 - 선언
function getWelcomeTemplate({ myname, myage, myschool }) {

    // 오늘 날짜 만들기
    const Date = new Date;
    const yyyy = Date.getFullYear();
    const mm = Date.getMonth() + 1; // 월은 0부터 시작해서 11로 끝나므로 +1 해줘야함
    const dd = Date.getDate();
    const createdAt = `${yyyy}-${mm.toPadding(0, 2)}-${dd}`;

    return `
        <html>
            <body>
                <h1>${myname}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름 : ${myname}</div>
                <div>나이 : ${myage}세</div>
                <div>학교 : ${myschool}</div>
                <div>가입일 : ${createdAt}</div>
            </body>
        </html>
    `
}
//프론트엔드에서 보내 온 정보입니다~~~
const myuser = {
    myname: "철수",
    myage: 13,
    myschool: "다람쥐초등학교",
}
//가입환영함수 - 실행
getWelcomeTemplate(myuser);