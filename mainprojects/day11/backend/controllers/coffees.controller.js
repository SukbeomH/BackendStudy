import { Starbucks } from "../models/starbucks.model.js";

export class StarbucksList {
	getCoffee = async (req, res) => {
		const coffeeList = await Starbucks.find();
		console.log(coffeeList);
		res.send(coffeeList);
	};
}
