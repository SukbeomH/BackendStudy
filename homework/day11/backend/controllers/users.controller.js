import { UserModel } from "../models/user.model.js";

export class UserList {
	getUsers = async (req, res) => {
		const userList = await UserModel.find();
		res.send(userList);
	};
}
