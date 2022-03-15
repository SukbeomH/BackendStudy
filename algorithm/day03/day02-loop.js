function sum(num) {
	let result = 0;
  for (let i =0; i<=num; i++) {
			result = result + i
  }
 console.log(result)
}




 function sum(num) {
		num*(num+1)/2
 }

 function countLetter(str) {
	let count = 0;
	for (let i=0; i<str.length; i++){
		if (str[i] === "a" || str[i] === "A"){
				count = count + 1
}	
}
}

function countLetter(str) {
	let count = 0;
	str = str.toLowerCase()
	for (let i = 0; i < str.length; i ++) {
		if (str[i] === "a") {
			count ++
		}
	}
	console.log(count)
}

function makeNumber(num) {
	let str = '';
	let arr = [];
	for (let i=0; i<=num.length; i++){
		arr[i] = 1 + i ;
	}
	return arr.join('-')
}
