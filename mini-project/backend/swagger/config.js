export const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Codebucks 명세서",
			version: "1.0.0",
			contact: { email: "brent93.dev@gmail.com" },
		},
	},
	apis: ["./swagger/swagger.yaml"], // files containing annotations as above
};
