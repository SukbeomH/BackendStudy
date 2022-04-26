# BE Day03 HTTP req, res

**목차**

  

---

# HTTP 통신

컴퓨터끼리는 데이터를 어떻게 주고 받을까요? 

데이터를 주고 받을 수 있는 도구들에는 몇가지가 있습니다. 

파일을 전송할건지, 메일인지, 텍스트인지 등에 따라 방법이 달라집니다. 

그 중에서 우리는 **HTTP**를 알아보겠습니다. 

`**HTTP**`란 **H**yper**T**ext **T**ransfer **P**rotocol의 약자로

`**두 컴퓨터간에 텍스트 데이터를 주고 받는 길**`입니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled.png)

`**HTTP 라는 길로`**  `**요청(request)**`과 `**응답(response)`** 2가지를 서로 주고 받을 수 있습니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%201.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%201.png)

---

# HTTP 요청(Request)과 응답(Response)

### HTTP 요청(Request)

웹브라우저에서 홈페이지(Front-end)가 실행중이라면, 

작성한 게시물 `**텍스트 데이터**`를 HTTP를 통해 `**Back-end 컴퓨터로 보내고**` 

Back-end 컴퓨터에게 이 데이터를 **데이터베이스**에 저장 해달라고 **`요청`**합니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%202.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%202.png)

### HTTP 응답(Response)

요청을 받은 Back-end 컴퓨터가 성공, 실패 등 처리 결과를 **`응답`**합니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%203.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%203.png)

<aside>
💡 **하나만 더!**
Back-end 컴퓨터는 응답할 때, **`응답 상태코드`** 라는 것도 함께 보내줍니다.
`**응답 상태코드**`는 100~ 599까지의 숫자로 구성되어 있습니다.
자주 볼 수 있는 응답 상태코드는 **`성공(200)`**, **`Front-end 에러(400), Back-end 에러(500)`** 등이 있습니다.
예를들면, 요청에 성공하였으면 성공 메시지와  `**응답 상태코드 200**`을 함께 보내줍니다.

**`더 많은 상태코드(MDN): [https://developer.mozilla.org/ko/docs/Web/HTTP/Status](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)`**

</aside>

<aside>
💡 ***데이터베이스에 바로 요청하면 안되나요?***
보안 및 데이터 정제 등의 이유로 **`Back-end에서 검증 과정을 거쳐야 하기 때문`**에, 아무나 함부로 데이터베이스에 요청할 수 없습니다.

</aside>

---

# API

**`API란 HTTP 요청을 Back-end 컴퓨터에 보냈을때 실행되는 Back-end 기능입니다.`**

Front-end에서 HTTP라는 길을 통해서 게시물 데이터를 Back-end에 보내 저장시켰습니다.

만약, 게시물이 아닌 프로필 데이터를 저장하고 싶으면 어떻게 해야 할까요?

그러기 위해선, **`여러개의 HTTP 라는 길이 존재`**해야 하고, 각각의 요청마다 담당자가 필요합니다.

우리는 이 담당자를 **`API`** 라고 부릅니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%204.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%204.png)

<aside>
💡 ***API가 기능 이라고 했는데, 기능은 함수 아닌가요?***
정확합니다! Back-end 개발자가 만든 **함수**입니다. 함수는 **인자**와 **return 데이터**가 있었죠?!
API에 **요청**할 때 보내는 데이터는 **API 함수로 들어갈 인자**이고, **응답**으로 받게되는 데이터가 **API 함수의 return 데이터** 입니다.

</aside>

---

# API 종류(rest-API vs graphql-API)

각각의 요청마다 담당자를 만들때, 2가지 종류의 담당자가 있습니다. 

즉, API의 종류는 크게 **`rest-API`**, **`graphql-API`** 로 2가지가 있습니다.

rest-API 와 graphql-API 는 몇가지 차이점이 있습니다.

### 함수 이름의 차이

rest-API는 **`API 이름이 마치 홈페이지 주소`**처럼 생겼습니다.

graphql-API는 `**API 이름이 일반적인 함수**`와 같습니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%205.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%205.png)

### 응답 결과물의 차이

`**rest-API**` 는 응답 결과로 back-end 개발자가 만든 함수에서 보내주는 `**모든 데이터**`를 받아야만 합니다.

반면에, **`graphql-API`**는 back-end 개발자가 만든 함수에서 **`필요한 데이터만`** 골라 받을 수 있습니다.

****이러한 이유로, 각 API에 전송을 요청하는 담당자도 다릅니다.

`**rest-API**` 에 요청하는 요청담당자는 `**axios**` 입니다.

`**graphql-API**` 에 요청하는 요청담당자는 `**apollo-client**` 입니다.

요청담당자는 Front-end 에서 설치하는 라이브러리입니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%206.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%206.png)

`**rest-API**`  방식에서는 용량이 너무 커서 무거워라고 말하고 있습니다. 

제목과 작성자만 필요할 뿐인데, 내용, 작성일, 좋아요 등 모든 데이터를 받아야하기 때문입니다. 

**graphql**은 필요한 데이터만 골라 받을 수 있는 장점이 있어서, 효율적인 통신을 할 수 있습니다.

**`graphql은 페이스북에서 발생하는 수많은 데이터를 처리하기 위해 페이스북 개발팀에서 만들었으며,`**

**`facebook, airbnb, github 등 유명한 사이트에서 사용중인 통신 방법입니다.`**

우리도 역시, graphql을 기준으로 수업을 진행합니다.

<aside>
💡 **그러면, rest-API는 배우지 않아도 되나요?**
우리는 더 효율적인 방식의 graphql을 위주로 수업을 진행합니다.

그럼에도 불구하고, **`rest를 배워야하는 이유 2가지`**가 있습니다.
1. 웹 개발은 혼자 하는 것이 아닙니다. 내가 취업한 **`회사/팀에서 rest를 사용`**중일 수 있습니다.
2. `**다른 회사에서 제공해주는 API를 사용**`하는 경우도 있습니다. 예를들면, 카카오로 로그인하기 기능은, 카카오에서 제공해주는 API를 사용해야하는데, 이러한 기능들은 대부분 rest-API로 제공 되고 있습니다.

</aside>

---

# API 요청 결과 타입(JSON)

API 요청의 결과를 자세히 보시면 key와 value처럼 생기지 않았나요?

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%207.png)

아래처럼 자바스크립트(**J**ava**s**cript)의 객체(**O**bject)처럼 표기(**N**otation)할 수 있습니다.

```jsx
{
	작성자: "훈이",
	제목: "좋은 아침입니다"
}
```

앞글자를 따서 **`JSON`**이라고 부릅니다.

---

# HTTP 헤더와 바디

HTTP로 요청과 응답을 보낼 때, 그 메시지 안에는 **시작라인**, **헤더**와 **바디**가 있습니다.

[[출처](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)]

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%208.png)

## HTTP 요청 메시지

- 시작 라인
- 헤더

## HTTP 응답 메시지

- 시작 라인
- 헤더

> 요청과 응답 둘 다 **Body**가 들어갈 수 있으며, 실제 전송하려는 데이터가 여기에 들어갑니다.
> 

---

# API와 CRUD

API는 크게 4가지 방식으로 구분할 수 있습니다.

1. 새로운 것을 **`생성하는 API`**    ⇒   **C**REATE
2. 기존의 것을 **`조회하는 API`**    ⇒   **R**EAD
3. 기존의 것을 **`수정하는 API`**    ⇒   **U**PDATE
4. 기존의 것을 `**삭제하는 API**`    ⇒   **D**ELETE

그런데, 이는 rest 방식인지 graphql 방식인지에 따라 다르게 사용됩니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%209.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%209.png)

rest-API는 CRUD 각각 마다 사용하는 방식이 있습니다.

graphql-API는 데이터를 조작하지 않고 조회만 할때는 **QUERY**, 그 외의 데이터를 조작할 때는 **MUTATION**을 사용합니다. 

실제 프론트엔드에서 사용할 때, 즉 요청을 보내는 방법은 아래와 같습니다.

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2010.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2010.png)

# 한장에 정리

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2011.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2011.png)

---

# 실습 (Postman & Playground)

vscode가 없어도 API를 직접 편하게 테스트 해볼 수 있는 도구와, API에 대한 설명서를 작성해주는 도구가 있습니다. 

![BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2012.png](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2012.png)

이 도구들을 이용하여 직접 실습해보겠습니다.

## postman 설치

검색창에 postman을 입력해 들어갑니다.

[Postman API Platform | Sign Up for Free](https://www.postman.com/)

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2013.png)

본인 컴퓨터의 운영체제에 맞게 다운로드하여 설치 후 실행해서 가입까지 완료해주세요. 

### koreanjson 실습

[koreanjson.com](http://koreanjson.com) 사이트에 들어가주세요.

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2014.png)

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2015.png)

위의 예시를 보면 `/posts/:id` 라는 API로 포스트를 조회할 수 있다고 설명되어있습니다.

postman에서 직접 해보겠습니다. 

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2016.png)

요청 방식은 `GET`을 선택하고, URL은 [`https://koreanjson.com/posts/1`](https://koreanjson.com/posts/1) 을 입력합니다.

게시글 중에 1번 포스트를 조회하고 싶다는 요청을 보내는 것입니다.

`Send` 버튼을 누르면 아래의 **Body** 부분에서 데이터를 응답 받을 수 있습니다. 

## swagger

아래 주소로 접속해주세요. 

[Swagger UI](http://example.codebootcamp.co.kr/api-docs/)

미리 백엔드 개발자가 만들어 놓은 API 설명서입니다.

먼저, 전체 API 목록을 확인할 수 있습니다.

크게 Board와 Profile로 나뉘어 각각의 CRUD가 있다는 것을 한눈에 이해할 수 있죠?

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2017.png)

그 중에 하나의 API를 클릭해서 보게되면, postman에서 했던것처럼 직접 API를 요청해볼 수도 있습니다.

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2018.png)

---

---

# Playground에서 API Docs 이해하기

아래 주소로 접속해주세요. 

[GraphQL Playground](http://example.codebootcamp.co.kr/graphql)

**`swagger`**는 rest-API를 위한 설명서라고 했습니다. 

**`playground`**는 그래프큐엘을 위한 설명서를 볼 수 있고, 동시에 API를 테스트해 볼 수도 있습니다. 

오른쪽에 `DOCS`를 클릭하면 설명서를 볼 수 있습니다.

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2019.png)

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2020.png)

### Mutation 요청

`mutation`은 데이터를 조작하는 요청을 보낼 때 사용한다고 얘기했습니다. 

**DOCS**를 보고, 정해진 방식대로 요청을 보내면 됩니다. 

**DOCS**에서 `createProfile` 부분을 살펴봅니다. 

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2021.png)

왼쪽 부분(name, age, school)을 적어서 서버로 요청을 보내면, 

서버에서는 오른쪽 내용(_id, number, message)을 담아 리턴, 즉 응답해준다는 뜻입니다. 

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2022.png)

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2023.png)

왼쪽 상자에 프로필 등록(`createProfile`)을 요청하는 코드를 작성해보겠습니다.

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2024.png)

여기서 끝나면 안되고, 어떤 데이터를 받을지를 골라서 알려줘야합니다. 

리턴으로 주겠다고 적혀있었던 것에는 세가지가 있었습니다. (_id, number, message)

그 중에서 `message`만 받아보겠습니다. 

```graphql
mutation {
  createProfile(name : "철수", age : 8, school : "다람쥐초등학교"){
    message
  }
}
```

이제 준비가 다 되었습니다!!

오른쪽에 삼각형 버튼을 누르면 서버로 요청을 보내게 되고, 오른쪽에 받은 응답이 나타납니다. 👏

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2025.png)

### Query 요청

이번에는 게시글들을 조회하는 요청을 보내겠습니다. 

오른쪽에 + 버튼을 눌러 새로운 탭을 만들어주세요.

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2026.png)

게시글들을 조회하는 API가 무엇인지 DOCS에서 확인해봐야겠죠?

`fetchBoards`를 클릭해 자세한 내용을 확인합니다.

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2027.png)

이번에는 `page`라는 하나의 값만 적어서 요청해주면 되겠네요.

왼쪽 상자에 코드를 작성해보겠습니다.  

```graphql
query {
  fetchBoards(page : 1){
    title
    contents
  }
}
```

1 페이지를 요청하고, title과 contents 데이터를 받고 싶습니다.

삼각형 버튼을 눌러 실행해보면, 1페이지에 해당하는 게시글 10개가 받아와졌습니다. 👏👏👏

![Untitled](BE%20Day03%20HTTP%20req,%20res%20833233cc5aba4f5cac25302d22c618a4/Untitled%2028.png)