
function welcomeTemplate(user) {
    const welcome =
        `
    <html><body>
    <h1>${user.email}님, 환영합니다!</h1>
    </br>다음 정보가 올바른지 확인해주세요
    <hr />
    </br>주민번호 : ${user.ssn}
    </br>휴대폰번호 : ${user.phone}
    </br>선호하는 사이트 : ${user.favsite}
    </body></html>
    ` 
    
    console.log(welcome);
    return welcome;
}

const myprofile = {
    email: "vv@vvv.com",
    ssn: "920324-1038293",
    phone: "01012345678",
    favsite: "naver.com",
}
//실행
welcomeTemplate(myprofile);