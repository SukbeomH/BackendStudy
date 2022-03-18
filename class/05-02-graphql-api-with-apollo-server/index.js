//----------Manual-----------
// 1. yarn init
// 2. yarn add apollo - server graphql
// 3. yarn add nodemon
//------------------------------

import { ApolloServer, gql } from "apollo-server";

// 각 API에 대한 type 지정을 미리한다
// 따로 DOC을 만들 필요없는 이유
const myTypeDefs = gql`
	type Query {
		"API이름: 타입"
		hello: String
	}
`;

// 엔드포인트 대화합의 장
const myResolvers = {
	Query: {
		hello: () => "world",
	},
};

const server = new ApolloServer({
	// 기본 이름을 바꿨다면 여기서 설정한다
	typeDefs: myTypeDefs,
	resolvers: myResolvers,
});

// 서버가 잘 작동하나요 ~
server.listen(3001).then(({ url }) => {
	console.log(`🚀 Server ready at ${url} on port: ${3001}`);
});
