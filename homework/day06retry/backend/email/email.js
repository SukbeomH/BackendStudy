export function isEmailVaild(mail) {
    //1. 존재여부 
    //2. @가 포함되어 있어야 함
    if (mail === undefined || mail.includes("@") === false) {
        console.log("올바르게 이메일을 입력하세요~~");
        return false
    } else {
        return true
    }

}

export function makeWelcomeTemplate({name, age, school, email}) {
    // 오늘 날짜 만들기
    const date = new Date;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, 0); // 월은 0부터 시작해서 11로 끝나므로 +1 해줘야함
    const dd = String(date.getDate()).padStart(2, 0);
    const createdAt = `${yyyy}-${mm}-${dd}`;
    //가입환영 템플릿 제작 및 반환
    const template =  `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름 : ${name}</div>
                <div>나이 : ${age}세</div>
                <div>학교 : ${school}</div>
                <div>이메일 : ${email}</div>
                <div>가입일 : ${createdAt}</div>
            </body>
        </html>
    `
    return template;
}

export function sendWelcomeEmail( name, email, myTemplate ) {
    console.log(`${name}님에게 이메일 : ${email}로 환영메일이 전송되었습니다!
    내용 : ${myTemplate}`)
    return;
}