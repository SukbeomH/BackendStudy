//facade-pattern
import {
  isEmailVaild,
  makeWelcomeTemplate,
  sendWelcomeEmail,
} from "./email.js";

function createUser(user) {
  //이메일이 정상인가?
  const isVaild = isEmailVaild(user.email);
  if (isVaild) {
    //가입환영 템플릿을 생성한다
    const mytemplate = makeWelcomeTemplate(user);
    //이메일로 가입환영을 전송한다 (a@a.com으로 환영 이메일 전송 완료되었습니다.)
    sendWelcomeEmail(user.name, user.email, mytemplate);
  }
}
//가입자정보
const myuser = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
  email: "a@a.com",
  password: "1234",
};
createUser(myuser);
