
function welcomeTemplate(user) {
    const welcome =
    `${user.email}님, 환영합니다!
    다음 정보가 올바른지 확인해주세요

    주민번호 : ${user.ssn}
    휴대폰번호 : ${user.phone}
    선호하는 사이트 : ${user.favsite}` 
    
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