// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
	document.querySelector("#ValidationInputWrapper").style.display = "flex";
	await axios
		.post("http://localhost:3000/tokens/phone", {
			phone:
				document.getElementById("PhoneNumber01").value +
				document.getElementById("PhoneNumber02").value +
				document.getElementById("PhoneNumber03").value,
		})
		.then((req, res) => {
			console.log(req);
		})
		.catch(function (error) {
			console.log(error);
		});
	console.log("인증 번호 전송");
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
	await axios
		.patch("http://localhost:3000/tokens/phone", {
			phone:
				document.getElementById("PhoneNumber01").value +
				document.getElementById("PhoneNumber02").value +
				document.getElementById("PhoneNumber03").value,
			token: document.getElementById("TokenInput").value,
		})
		.then((req, res) => {
			console.log(req);
		})
		.catch(function (error) {
			console.log(error);
		});
	console.log("핸드폰 인증 확인요청");
};

// 회원 가입 API 요청
const submitSignup = async () => {
	await axios
		.post("http://localhost:3000/user", {
			name: document.getElementById("SignupName").value,
			email: document.getElementById("SignupEmail").value,
			personal:
				document.getElementById("SignupPersonal1").value +
				document.getElementById("SignupPersonal2").value,
			prefer: document.getElementById("SignupPrefer").value,
			pwd: document.getElementById("SignupPwd").value,
			phone:
				document.getElementById("PhoneNumber01").value +
				document.getElementById("PhoneNumber02").value +
				document.getElementById("PhoneNumber03").value,
		})
		.then((req, res) => {
			console.log(req);
		})
		.catch(function (error) {
			console.log(error);
		});
	console.log("회원 가입 완료");
};
