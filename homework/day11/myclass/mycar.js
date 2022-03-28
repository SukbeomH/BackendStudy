class MyCar {
	color = "black";
	name = "G 65 AMG";
	horsePower = 603;
	zero100 = 5.3;

	throttleOpen() {
		console.log(`이름은 ${this.name}, 무려 ${this.horsePower}마력!!`);
	}
	break() {
		console.log("끼이이익...");
	}

	constructor(colorInput) {
		if (colorInput) {
			color = colorInput;
		}
	}
}
