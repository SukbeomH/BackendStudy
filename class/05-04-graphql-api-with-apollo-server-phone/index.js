//----------Manual-----------
// 1. yarn init
// 2. yarn add apollo - server graphql
// 3. yarn add nodemon
//------------------------------

import { ApolloServer, gql } from "apollo-server";
import { createTokenOfPhone } from "../01-05-token-count-api-facade-import/index.js";

// 각 API에 대한 type 지정을 미리한다
// 따로 DOC을 만들 필요없는 이유
const myTypeDefs = gql`
	type BoardReturn {
		number: Int
		writer: String
		title: String
		contents: String
	}
	input CreateBoardInput {
		number: Int
		writer: String
		title: String
		contents: String
	}
	type Query {
		#API이름: 타입
		fetchBoards: [BoardReturn]
	}
	type Mutation {
		createBoard(writer: String, title: String, contents: String): String
		createBoard2(createBoardInput: CreateBoardInput): String
		createTokenOfPhone(phone: String): String
	}
`;

// 엔드포인트 대화합의 장
// 핵심 영역입니다.
const myResolvers = {
	Query: {
		//API이름: () => {실행할 내용}
		fetchBoards: () => {
			// 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
			const DB = [
				{
					number: 1,
					writer: "철수",
					title: "Fire Dragons",
					contents: "lorem ipsum",
				},
				{
					number: 2,
					writer: "영희",
					title: "Water Eagles",
					contents: "something that not so useful",
				},
			];
			// 2. 꺼내온 결과를 응답으로 보내기
			return DB;
		},
	},
	Mutation: {
		createBoard: (_, args) => {
			// 1. 데이터를 등록하는 로직  => DB에 저장하기
			console.log(args);
			// 2. 저장 결과를 받아와서 알려주기
			console.log("등록 성공!!");
		},
		createBoard2: (_, args) => {
			// 1. 데이터를 등록하는 로직  => DB에 저장하기
			console.log(args);
			// 2. 저장 결과를 받아와서 알려주기
			console.log("등록 성공!!");
		},
		createTokenOfPhone: (_, args) => {
			createTokenOfPhone(args);
			return "인증완료 ~";
		},
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
