export const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "MiniProject",
			version: "1.0.0",
			contact: { email: "brent93.dev@gmail.com" },
		},
	},
	apis: ["./swagger/*.swagger.js"], // files containing annotations as above
};
