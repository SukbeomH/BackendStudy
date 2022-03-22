// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async (req, res) => {
	document.querySelector("#ValidationInputWrapper").style.display = "flex";
	const telNumber2 = document.getElementById("PhoneNumber02").value;
	const telNumber3 = document.getElementById("PhoneNumber03").value;

	await axios
		.post("http://localhost:3000/tokens/phone", {
			tel: "010" + telNumber2 + telNumber3,
		})
		.then((res) => {
			console.log(res);
		});
};

// 회원 가입 API 요청
const submitSignup = async (req, res) => {
	const name = document.getElementById("SignupName").value;
	const SSN = document.getElementById("SignupPersonal").value;
	const token = document.getElementById("TokenInput").value;
	const preferWeb = document.getElementById("SignupPrefer").value;
	const email = document.getElementById("SignupEmail").value;
	const pswd = document.getElementById("SignupPwd").value;
	const telNumber2 = document.getElementById("PhoneNumber02").value;
	const telNumber3 = document.getElementById("PhoneNumber03").value;

	await axios
		.post("http://localhost:3000/users", {
			user: {
				name: name,
				SSN: SSN,
				token: token,
				preferWeb: preferWeb,
				email: email,
				pswd: pswd,
				phone: "010-" + telNumber2 + "-" + telNumber3,
			},
		})
		.then((res) => {
			console.log(res);
			console.log("회원 가입 이메일 전송");
		});
};
