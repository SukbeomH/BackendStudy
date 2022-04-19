new Promise((resolve, reject) => {
	// 특정작업
	// if ("성공") {
	// 	return resolve("석세스");
	// } else {
	// 	return reject("실패");
	// }
})
	.then((res) => {}) // 성공했을 경우
	.catch((err) => {}); // 실패했을 경우

const fetchDataExample = async () => {
	const result = await new Promise((resolve, reject) => {
		setTimeout(() => {
			// 외부의 데이터를 보내고 받는 시간
			// = 2초 걸린다고 가정
			try {
				resolve("성공할 시에 받는 데이터, 뭐든 리턴값");
			} catch {
				reject("실패했다는 내용 + 에러 메세지 etc");
			}
		}, 2000);
	});
	console.log(result);
};
fetchDataExample();
