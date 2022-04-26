# BE Day05 GraphQL

**목차**

  

---

---

# Start GraphQL

이번에는 `Apollo 서버`를 활용해 `GraphQL API`를 제공하는 서버를 개발 해보겠습니다.

`Apollo 서버`는 GraphQL API를 제공하는 서버를 개발할 수 있게 도와주는 패키지로서 기존에 Node.js에서 사용하는 **Express와 역할이 비슷합니다.**

먼저 class 폴더안에 새로운 폴더 **05-01-graphql-api-with-apollo-server-1** 를 만들어 주세요. 

`yarn init`를 입력해 `package.json` 파일을 생성해주세요.

`GraphQL API`를 사용할것이기 때문에 `yarn add graphql`를 입력해 설치해주세요.

Apollo Server는 GraphQL이 적용된 서버를 생성할 수 있는 클래스 입니다. 

`yarn add apollo-server graphql` 를 입력해 설치해주세요.

```json
{
  "name": "05-01-graphql-api-with-apollo-server-1",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "apollo-server": "^3.5.0",
    "graphql": "^16.0.1"
  },
  "type": "module"
}
```

잘 설치되었다면 다음과 같은 `package.json`을 볼 수 있습니다.

이제 05-01-graphql-api-with-apollo-server-1 폴더에 index.js파일을 만들어 주세요. 

설치했던 `apollo server` 와 `graphql`을 불러와주세요.

```jsx
import { ApolloServer, gql } from 'apollo-server'
```

## mutation & query

그전에도 설명했지만 `graphql`에는 2가지 요청이 있습니다.

- `Query` : 데이터베이스에서 데이터를 읽는 요청
- `Mutation` : 데이터베이스를 등록, 수정, 삭제하는 요청

## typeDef & resolver

`apollo server`는 `typeDef` 와 `resolver`를 인자로 받아 서버를 생성합니다.

- `typeDef` : graphql 명세에서 사용될 데이터와 타입을 지정하고 template literal tag로 생성됩니다.
- `resolver` : 서비스의 `액션`들을 함수로 지정하고 요청에 따라 데이터를 반환, 입력, 수정 삭제 합니다.

```graphql
const myResolvers = {
  Query: {
    hello: () => 'world',
  },
};
```

`myResolvers`라는 객체 안에 `Query` 객체를 선언하였습니다.

`Query`객체 안에 world라는 문자열을 반환하는 로직을 구현했습니다.

```jsx
const myTypeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;
```

`myTypeDefs` 객체 안에 `type Query`객체를 선언해 반환될 데이터의 형태를 지정해 주었습니다.

```jsx
const server = new ApolloServer({
    typeDefs: myTypeDefs,
    resolvers: myResolvers
})

server.listen(3000)
```

이제 `apollo server`를 생성하고 `typeDef`와 `myTypeDefs`를 `resolver`와 `myResolvers`연결시켜 주고 3000번 `port`를 열어줍니다.

`node index.js`를 입력해 `apollo server`를 실행시켜 줍니다.

![스크린샷 2021-12-09 오후 12.04.46.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.04.46.png)

서버가 잘 실행되었다면 **[localhost:3000/graphql](http://localhost:3000/graphql)** 을 들어가면 다음과 같은 화면을 볼 수 있습니다. 

**Query your server**를 클릭해 **playground**에 들어가주세요.

## GraphQL API Testing

```graphql
query{
  hello
}
```

![스크린샷 2021-12-09 오후 5.59.39.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.59.39.png)

위와 같이 입력하고 실행하면 `myResolvers`라는 객체 안에 `Query` 객체에 작성해 놓은 `hello`함수가 실행되면서 `myTypeDefs` 객체 안에  `type Query` 객체에 지정해 놓은 데이터의 형태로 반환됩니다.

---

# GraphQL API 만들기 1

이제 본격적으로 기존에 `Rest-API`로 개발했던 로직을 `graphql-API`를 사용해서 개발하겠습니다.

class폴더 안에 **05-02-graphql-api-with-apollo-server-2**을 만들어 주세요.

**package.json**은 **05-01-graphql-api-with-apollo-server-1**에 있는 것을 복사 붙여넣기 해주세요.

**04-02-rest-api-with-express-2**의 동일한 기능의 로직을 `graphql-API` 를 사용해보는 것이기 때문에 **VScode에서 화면을 분할**해 참고하시면서 개발하시기 바랍니다.

## fetchBoards

```graphql
const myResolvers = {
  Query: {
    fetchBoards: () => {
      // 데이터 조회하는 로직

      return "조회에 성공하였습니다."
    },
  },
}
```

`Rest-API`의 **GET** 메서드는 `Graphql -API` 에서는 모두  `Query` 로 동작하는거 기억하시죠?

`Query` 를 이용해 다음과 같이 데이터 조회하는 기능을 구현해 주세요.

```graphql
const myTypeDefs = gql`
  type Query {
    fetchBoards: String
  }
`
```

`myTypeDefs` 객체 안에 `type Query`안에는 반환될 데이터의 타입을 지정해 주었습니다.

반환될 데이터의 종류가 **String**이기 때문에 다음과 같이 타입을 지정했습니다.

```jsx
const server = new ApolloServer({
    typeDefs: myTypeDefs,
    resolvers: myResolvers
})

server.listen(3000)
```

이제 `apollo server`를 생성하고 `typeDef`와 `myTypeDefs`를 `resolver`와 `myResolvers`연결시켜 주고 3000번 `port`를 열어줍니다.

`node index.js`를 입력해 `apollo server`를 실행시켜 줍니다.

브라우저에서 **[localhost:3000/graphql](http://localhost:3000/graphql)** 을 들어가 기존과 동일하게 **Testing** 해보겠습니다.

```graphql
query{
	fetchBoards
}
```

![스크린샷 2021-12-09 오후 12.13.24.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.13.24.png)

`myResolvers`의 `Query` 객체에 작성해 놓은 `fetchBoards`함수가 실행되면서  `type Query`에 지정해 놓은 문자열 메세지가 잘 출력됩니다.

## createBoard

```graphql
const myResolvers = {
	Mutation: {
	    createBoard: () => {
	      // 데이터 등록하는 로직
	
	      return "등록에 성공하였습니다."
	    },
	  }
}
```

`Rest-API`의 **POST, DELETE, UPDATE** 메서드는 `Graphql -API` 에서는 모두  `Mutation` 으로 동작하는거 기억하시죠?

`myResolvers`객체에 `Mutation`을 추가해 주세요.

 `Mutation`에는 다음과 같이 데이터를 등록하는 로직을 구현해 주세요.

```graphql
const myTypeDefs = gql`
	type Mutation {
	    createBoard: String
	  }
`
```

`myTypeDefs` 객체 안에 `type Query`객체를 선언해 반환될 데이터의 형태를 지정해 주었습니다.

반환될 데이터의 종류가 **String**이기 때문에 다음과 같이 타입을 지정했습니다.

이제 다시 `apollo server`를 실행시겨 주고  **[localhost:3000/graphql](http://localhost:3000/graphql)** 을 들어가 기존과 동일하게 **Testing** 해보겠습니다.

```graphql
mutation{
  createBoard
}
```

![스크린샷 2021-12-09 오후 12.19.15.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.19.15.png)

`myResolvers`라는 객체 안에 `Mutation` 객체에 작성해 놓은`createBoard`함수가 실행되면서  `type Mutation`에 지정해 놓은 문자열 메세지가 잘 출력됩니다.

---

# GraphQL API 만들기 2

class폴더 안에 **05-03-graphql-api-with-apollo-server-3**을 만들어 주시고, **05-02-graphql-api-with-apollo-server-2** 폴더에 있는 파일들을 복사 후 붙여넣기 해주세요.

`yarn install`명령어를 입력해서 **package.json**에 기록되어 있는 라이브러리를 모두 설치해 주세요.

## fetchBoards

`Rest-API`로 작성했던 게시물을 조회했던 기능 기억하시나요? 

`GET` 메서드를 사용해서 데이터를 조회해서 반환해 주었습니다.

동일한 데이터를 반환하는 기능을 `graphql-API` 로 변경해 보겠습니다.

```graphql
const myResolvers = {
    Query: {
        fetchBoards: () => {
            // 데이터 조회하는 로직

            // return "조회에 성공하였습니다."
            return [
                { number: 1, writer: "철수", title: "제목입니다~~~", contents: "내용이에요!!!" },
                { number: 2, writer: "영희", title: "좋은 날씨입니다!", contents: "내용@@@@@" },
                { number: 3, writer: "훈이", title: "점심 맛있게 드셨나요?!", contents: "식사 하셨나요?!" },
                { number: 4, writer: "맹구", title: "안녕하세요?!", contents: "내용이요!!!" }
            ]
        }
    },
}
```

`Query` 내부에 데이터를 조회하는 로직을 작성해 주세요.

`Rest-API`에서는 **res.send**를 이용해서 데이터를 반환했는데 `graphql-API`는 **return** 을 사용해 함수를 종료하면서 데이터를 반환합니다.

```graphql
const myTypeDefs = gql`
    type MyBoard {
        number: Int
        writer: String
        title: String
        contents: String
    }

    type Query {
        fetchBoards: [MyBoard]
    }
`
```

`myResolvers`에 작성한 `Query`의 `fetchBoards` 함수의 반환값을 한번 확인해 보세요.

반환값은 **배열 안에 객체**의 형태로 이루어져 있습니다.

먼저 객체의 타입을 지정해주기 위해서  `type MyBoard {}`의 선언해주고 요소의 타입들 지정해주세요.

객체안의 요소들의 타입을 모두 지정해 주었다면 `MyBoard`를 배열로 감싸서 `fetchBoards: [MyBoard]` 과 같이 지정해 줍니다.

다시 `apollo server`를 실행시겨 주고  **[localhost:3000/graphql](http://localhost:3000/graphql)** 을 들어가 기존과 동일하게 **Testing** 해보겠습니다.

```graphql
query{
  fetchBoards {
    number
    writer
    title
    contents
  }
}
```

![스크린샷 2021-12-10 오후 1.44.46.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.44.46.png)

`myResolvers`라는 객체 안에 `Mutation` 객체에 작성해 놓은 `createBoard`함수가 실행되면서  `type Mutation`에 지정해 놓은 타입과  `type Myboard`이 지정해 놓은 요소들의 타입에 맞게 응답받았습니다.

## createBoards

```jsx
const myResolvers = {
	Mutation: {
		createBoard: (_, args) => {
		      // 데이터 등록하는 로직
		
		      console.log('입력값들: ', args)
		      console.log('입력값들2: ', args.createBoardInput)
		
		      return "등록에 성공하였습니다."
		    },
	  }
}
```

**05-02-graphql-api-with-apollo-server-2** 폴더의 **index.js**의 createBoard와 동일하지만 **Parameter(매개변수)**가 다르게 사용되어 있는 것을 확인 할 수 있습니다.

4개의 매개변수가 있는데 다음과 같습니다.

- `parent` : 부모 타입 리졸버에서 반환된 결과를 가진 객체
- `args` : 쿼리 요청 시 전달된 파라미터를 가진 객체
- `context` : GraphQL의 모든 리졸버가 공유하는 객체로서 로그인 인증, 데이터베이스 접근 권한 등에 사용
- `info` : 명령 실행 상태 정보를 가진 객체

`Rest-API`에서는 요청 데이터를 확인하기 위해 **Parameter(매개변수) req**를 사용했습니다.

`graphql-API`에서는 **Parameter(매개변수) args**를 사용해 요청된 데이터를 확인할 수 있습니다. 만약 사용하지 않는 파라미터를 사용할때는 **_(언더바)**를 파라미터로 사용합니다.

```graphql
const myTypeDefs = gql`
		input CreateBoardInput {
		    writer: String
		    title: String
		    contents: String
		  }

		type Mutation {
		    createBoard(createBoardInput: CreateBoardInput): String
		  }
`
```

이번에는 **요청 데이터의 타입**을 지정해 보겠습니다. 

다음과 같이 `input`을 사용해 데이터의 타입을 지정합니다.

다시 `apollo server`를 실행시겨 주고  **[localhost:3000/graphql](http://localhost:3000/graphql)** 을 들어가 기존과 동일하게 **Testing** 해보겠습니다.

```graphql
mutation{
  createBoard(createBoardInput:{
    writer : "codecamp_mento",
    title : "backend_graphql",
    contents : "intensive_coding_bootcamp"
  }
  )
}
```

![스크린샷 2021-12-10 오후 1.30.59.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.30.59.png)

`input CreateBoardInput`에 지정해 놓은 요소들의 데이터 타입에 맞게 요청을 보내야 합니다.

`myResolvers`라는 객체 안에 `Mutation` 객체에 작성해 놓은`createBoard`함수가 실행되면서  `type Mutation`에 지정해 놓은 문자열 메세지가 잘 출력됩니다.

![스크린샷 2021-12-10 오후 1.41.47.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.41.47.png)

이번에 요청된 값이 잘 받아 와졌는지 **터미널**을 확인해 보세요!!!

---

# GraphQL API 만들기 3

class폴더 안에 **05-04-graphql-api-with-apollo-server-4**을 만들어 주시고, **05-03-graphql-api-with-apollo-server-3** 폴더에 있는 파일들을 복사 후 붙여넣기 해주세요.

`yarn install`명령어를 입력해서 **package.json**에 기록되어 있는 라이브러리를 모두 설치해 주세요.

이번에는 **04-04-rest-api-with-express-3-token** `Rest-API`로 개발했던 인증번호를 전송해주는 **API**를 `graphql-API`로 변경해서 만들어 보겠습니다.

 **04-04-rest-api-with-express-3-token**  `phone.js` 파일을 복사해서 **05-04-graphql-api-with-apollo-server-4** 폴더 안에 붙어넣기 해주세요.

```jsx
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
```

`phone.js` 파일에 있는 함수들 **checkValidationPhone, getToken, sendTokenToSMS**을 사용하기 위해서 **import** 해주세요.

```jsx
const myResolvers = {
	Mutation: {
		createTokenOfPhone: (_, args) => {
		      // 1. 휴대폰번호 자릿수 맞는지 확인하기
		      const isValidationPhone = checkValidationPhone(args.phone)
		      if(isValidationPhone === true){
		          // 2. 핸드폰 토큰 6자리 만들기
		          const token = getToken(6)
		
		          // 3. 핸드폰번호에 토큰 전송하기
		          sendTokenToSMS(args.phone, token)
		      }
		
		      return "인증번호를 전송했습니다."
		    }
		 }
}
```

`Mutation`에 요청이 왔을 때 휴대전화로 인증번호를 보내주는 로직을 다음과 같이 추가해 주세요.

```graphql
const myTypeDefs = gql`
		type Mutation {
		    createTokenOfPhone(phone: String!): String
		  }
`
```

이제  **요청 데이터의 타입**을 지정하는데 `! : Not Nullable`을 지정하여 핸드폰 번호를 필수 값과 타입을 지정하였습니다.

다시 `apollo server`를 실행시겨 주고  **[localhost:3000/graphql](http://localhost:3000/graphql)** 을 들어가 기존과 동일하게 **Testing** 해보겠습니다.

```graphql
mutation{
  createTokenOfPhone(phone: "01012341234")
}
```

![스크린샷 2021-12-10 오후 2.40.15.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.40.15.png)

`input CreateBoardInput` 필수 요소인 `phone`을 입력해서 요청을 보내면 인증번호를 성공적으로 전송했다는 응답을 받게 됩니다.

만약 필수 요소인 `phone` 을 요청하지 않는다면 다음과 같은 에러를 확인할 수 있습니다.

![스크린샷 2021-12-10 오후 2.42.51.png](BE%20Day05%20GraphQL%20c8c2718c6801470bb6c4cd8c3bdc2edf/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.42.51.png)

! (느낌표)는 Not Nullable. 데이터가 꼭 있어야 한다는 것을 잊지 마세요!!!!