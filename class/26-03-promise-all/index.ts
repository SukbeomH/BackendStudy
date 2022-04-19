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

const fetchDataMany = async () => {
	console.time(
		"개별 스크립트 ============ 각각 시행 ============"
	);
	const result1 = await new Promise((resolve, reject) => {
		setTimeout(() => {
			// 외부의 데이터를 보내고 받는 시간
			// = 1초 걸린다고 가정
			resolve("성공할 시에 받는 데이터, 뭐든 리턴값");
		}, 1000);
	});
	const result2 = await new Promise((resolve, reject) => {
		setTimeout(() => {
			// 외부의 데이터를 보내고 받는 시간
			// = 2초 걸린다고 가정
			resolve("성공할 시에 받는 데이터, 뭐든 리턴값");
		}, 2000);
	});
	const result3 = await new Promise((resolve, reject) => {
		setTimeout(() => {
			// 외부의 데이터를 보내고 받는 시간
			// = 3초 걸린다고 가정
			resolve("성공할 시에 받는 데이터, 뭐든 리턴값");
		}, 3000);
	});
	console.timeEnd(
		"개별 스크립트 ============ 각각 시행 ============"
	);
};
fetchDataMany();

const fetchDataAIO = async () => {
	// await Promise.all([promise, promise, promise])
	console.time(
		"개별 프로미스 ============ 한번에 ============"
	);
	await Promise.all([
		new Promise((resolve, reject) => {
			setTimeout(() => {
				// 외부의 데이터를 보내고 받는 시간
				// = 1초 걸린다고 가정
				resolve("성공할 시에 받는 데이터, 뭐든 리턴값");
			}, 1000);
		}),
		new Promise((resolve, reject) => {
			setTimeout(() => {
				// 외부의 데이터를 보내고 받는 시간
				// = 2초 걸린다고 가정
				resolve("성공할 시에 받는 데이터, 뭐든 리턴값");
			}, 2000);
		}),
		new Promise((resolve, reject) => {
			setTimeout(() => {
				// 외부의 데이터를 보내고 받는 시간
				// = 3초 걸린다고 가정
				resolve("성공할 시에 받는 데이터, 뭐든 리턴값");
			}, 3000);
		}),
	]);
	console.timeEnd(
		"개별 프로미스 ============ 한번에 ============"
	);
};
fetchDataAIO();
