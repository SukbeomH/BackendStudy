//assignment
const reverseStr = (list) => {
	// 아래에 코드를 작성해주세요.
	return list
		.reverse()
		.map((ele) =>
			ele
				.split("")
				.map((char) =>
					char.charCodeAt() > 95 ? char.toUpperCase() : char.toLowerCase()
				)
				.join("")
		)
		.join(" ");
};
// 아래의 코드는 절대로 수정하거나 삭제하지 마세요.
module.exports = reverseStr;

// return Array.from(list, (ele) => {
//     for (let i = 0; i < ele.length; i++) {
//         if (ele[i].charCodeAt() > 95) {
//             ele[i].toUpperCase();
//         } else ele[i].toLowerCase();
//     }
// })

// return list
// 	.map((ele) => {
// 		for (let i = 0; i < ele.length; i++) {
// 			if (ele[i].charCodeAt() > 95) {
// 				ele[i].toUpperCase();
// 			} else ele[i].toLowerCase();
// 		}
// 	})
// 	.reverse()
// 	.join(" ");
