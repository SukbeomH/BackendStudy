function boolean(input1, input2) {
	if (input1 || input2) {
		console.log("true"); 
  }else{
		console.log("false");
	}
}

function evenOdd(num) {
	if (num === 0) {
		console.log("Zero");
  }else if (num % 2 === 1) {
		console.log("Odd");
	}else if (num % 2 !== 1) {
		console.log("Even");
	}else{
		console.log("Not a valid Number!!")
	}
}

function temperature(num){
	if (num > 18 && num < 24) {
		console.log("날씨가 좋네요")
	}else if (num <=18){
		console.log("조금 춥네요")
	}else {
		console.log("조금 덥습니다")
	}
}

function days(month) {
	if(month%2 === 1) {
		console.log("31")
  }else if (month === 2){
		console.log("28")
	}else {
		console.log("30")
	}
}

// 1월 : 31일
// 2월 : 28일
// 3월 : 31일
// 4월 : 30일
// 5월 : 31일
// 6월 : 30일
// 7월 : 31일
// 8월 : 31일
// 9월 : 30일
// 10월 : 31일
// 11월 : 30일
// 12월 : 31일

function calculator(num1, num2, operator){
	if (operator === "+") {
		console.log(num1+operator+num2);

	} else if(operator ==="-") {
		console.log(num1+operator+num2);

	}else if(operator ==="*") {
		console.log(num1+operator+num2);

	}else if(operator ==="/") {
		console.log(num1+operator+num2);

	}else {
		console.log("올바른 입력이 아닙니다");

	}
}



