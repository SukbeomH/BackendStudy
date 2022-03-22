export function sendWelcomeEmail({ name, email, myTemplate }) {
  console.log(`${name}님에게 이메일 : ${email}로 환영메일이 전송되었습니다!
    내용 : ${myTemplate}`);
  return;
}
