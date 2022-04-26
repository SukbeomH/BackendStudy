# BE Day04 Express with Rest API, Swagger

**목차**

---

# express 설치

express는 Node에서 쉽게 웹 서버를 개발할 수 있도록 도와주는 프레임워크입니다! 

(💡 [공식 홈페이지](https://expressjs.com/ko/)를 참고해보세요! )

프론트에서 우리가 만든 백엔드 API로 요청을 할 때, 먼저 그 요청을 잘 받아야겠죠? 

그 후에는, 요청에 대해 응답을 잘 해줘야겠죠? 이런 일을 하도록 도와주는게 **express**입니다. 

먼저 **class** 폴더 안에 `04-01-rest-api-with-express-1` 폴더를 새로 만들어줍니다. 

`yarn init` 명령어를 입력해주고, 모든 질문에 엔터를 눌러 넘어갑니다. 

이를 통해 **package.json** 파일이 생성됩니다. 

여기서 `"type": "module"` 을 한줄 추가해줍니다. 

```json
{
  "name": "04-01-rest-api-with-express-1",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
  },
  "type": "module"
}
```

npm 모듈의 경우 npm 명령어를 이용해 설치하거나 yarn을 이용해 설치할 수 있습니다. 

[express](https://www.npmjs.com/package/express)

저희는 yarn을 이용해 설치하겠습니다. 

터미널에서 해당 폴더로 이동한 후, `yarn add express` 를 입력해주세요.

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled.png)

설치가 완료되면

1. `node_modules` 폴더가 생성되며, 안에 **express**가 동작하는 코드가 적혀있습니다. 
2.  `package.json` 파일에 설치된 **express**의 버전이 적혀져 나옵니다.
    
    ```json
    {
      "name": "04-01-rest-api-with-express-1",
      "version": "1.0.0",
      "main": "index.js",
      "license": "MIT",
      "scripts": {
    		"test": "echo \"Error: no test specified\" && exit 1"
      },
      "dependencies": {
        "express": "^4.17.1"
      },
      "type": "module"
    }
    ```
    

---

# rest API 만들기

이제 API를 만들 준비는 끝났습니다. 

같은 폴더에 `index.js` 파일을 만들어주세요. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%201.png)

방금 설치한 `express` 를 사용하려면 다른 js 파일에 정의된 함수를 불러와야합니다. 

이럴 때는 **import**를 사용한다고 했었죠!

```jsx
import express from 'express'
```

npm 사이트에 나온 설명을 참고해 API를 만들어보겠습니다. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%202.png)

```jsx
import express from 'express'

const app = express()

// GET 요청이 들어왔을 때
app.get('/', function (req, res) { 
  res.send('Hello World') // 응답 보내기
})
 
app.listen(3000) // 3000번 포트에서 실행
```

다른 파일에서 불러온 `express`를 실행해, 실행한 결과인 express 어플을 새로운 변수 **app**에 담아줍니다. 

그리고 GET 요청이 들어왔을 때 Hello World라고 응답을 보내주는 코드입니다.

마지막으로 app.listen(3000)을 적어줘서 서버를 3000번 포트에서 실행하도록 설정합니다. 

`node index.js` 명령어로 서버를 켜보겠습니다. 

서버를 실행시키면 3000번 포트에서 실행됩니다!

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%203.png)

postman에서 [`http://localhost:3000/`](http://localhost:3000/) 에 **GET** 요청을 보냅니다. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%204.png)

응답으로 `Hello World`를 받았습니다!! 👏👏👏

서버를 종료하고 싶으면 터미널에서 `컨트롤 + c` 를 눌러줍니다.

그전까지는 서버가 계속 켜져있는 상태로, 터미널에 다른 입력을 할 수 없습니다. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%205.png)

<aside>
💡 서버가 실행이 안됩니다!! 

address already in use :::3000

혹시 이런 에러 문구가 나오지 않나요?
하나의 포트 번호에는 하나의 프로그램만 실행할 수 있습니다. 
아래 설명을 읽고, 터미널을 통해서 프로그램을 종료해주세요!

</aside>

만약에 서버가 켜진 터미널을 찾을 수가 없다면,

`netstat -anv | grep LISTEN` 명령어를 입력해보세요.

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%206.png)

3000번 포트로 서버를 켰기 때문에 그 부분을 찾아, process id를 기억합니다. 

이제 이 아이디를 이용해서 프로그램을 종료해주겠습니다.

`kill -9 프로세스_아이디` 를 입력해주면 됩니다. 위의 예시에서는 **kill -9 89055**가 되겠네요. 

다시 `netstat -anv | grep LISTEN` 명령어를 입력해서 확인해보면, 3000번 포트에서 동작중인 프로그램은 없다는것을 확인 할 수 있습니다. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%207.png)

## 라우팅

<aside>
😉 [라우팅 개념을 참고](https://expressjs.com/ko/starter/basic-routing.html)해보세요!

</aside>

`04-02-rest-api-with-express-1` 폴더를 복사 붙여넣기 해 사본을 만들어주세요. 

`04-02-rest-api-with-express-2`로 이름을 변경해주세요. 

`index.js` 파일을 수정해보겠습니다. 

Rest API 에서 데이터를 가져오는 요청은 GET으로 해야합니다. 

`/boards` 라는 엔드포인트로 GET 요청이 들어왔을 때, 

추후에 데이터를 조회하는 로직을 추가하도록 하고,

지금은 **"조회에 성공하였습니다."**라고 바로 응답을 보내주는 코드를 추가해주세요. 

```jsx
import express from 'express';

const app = express();

app.get('/boards', (req, res) => {
    // 데이터 조회하는 로직

    res.send("조회에 성공하였습니다.")
})

app.listen(3000)

```

### req, res

여기서 get 함수의 두번째 매개변수로 화살표 함수를 받고 있습니다.

그리고 이 화살표 함수는 **req**, **res**라는 두 변수를 받고 있습니다. 

req는 흔히 **Request**를 줄여서 사용하는 변수명입니다. 여기에는 브라우저에서 보낸 HTTP 요청이 들어있습니다. 구제척으로는 요청을 보낸 브라우저 주소, 쿠키, 바디, 쿼리 등이 들어있습니다.

res는 흔히 Response를 줄여서 사용하는 변수명입니다. 서버에서 다시 클라이언트(브라우저)로 응답을 보낼 때 사용합니다. 쿠키, HTTP status 코드, json 등의 내용을 담아 보낼 수 있습니다. 

이번에는 `/board` 로 **POST** 요청이 들어왔을 때, 

**"등록에 성공하였습니다."**라고 응답을 보내주는 코드를 추가해주세요.

```jsx
// ... 기존 코드

app.post('/board', (req, res) => {
    // 데이터 등록하는 로직

    res.send("등록에 성공하였습니다.")
})

app.listen(3000)

```

`04-02-rest-api-with-express-2` `/index.js` 파일의 최종 코드는 다음과 같이 완성되었습니다. 

```jsx
import express from 'express'

const app = express()

app.get('/boards', (req, res) => {
    // 데이터 조회하는 로직

    res.send("조회에 성공하였습니다.")
})

app.post('/boaO4_', (req, res) => {
    // 데이터 등록하는 로직

    res.send("등록에 성공하였습니다.")
})

app.listen(3000)
```

## 서버 띄우기

터미널에서 `04-02-rest-api-with-express-2` 폴더 안으로 이동합니다. 

`node index.js` 명령어를 입력해서 서버를 띄워보겠습니다. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%208.png)

이렇게 커서가 떠있는 상태면 잘된것입니다. 

## rest-API 요청 실습(postman)

서버가 켜졌으니, 이제 요청을 보내서 잘 응답이 오는지 확인해보겠습니다. 

**postman**을 켜주세요. 

`GET` 요청을 먼저 보내보겠습니다.

URL에는 `[localhost:3000/boards](http://localhost:4000/boards)` 라고 적겠습니다. 

3000인 이유는 우리가 아까 port를 3000으로 적었기 때문입니다. 

**Send**를 누르면 **'조회에 성공하였습니다.'**라는 응답을 받을 수가 있습니다. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%209.png)

이번에는 POST 요청으로 바꾸고, URL에 boards를 board로 고친 후 Send를 눌러보세요!

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2010.png)

---

## express로 JSON 받기

 `04-02-rest-api-with-express-2` 폴더를 복사 붙여넣기해 사본을 만들어줍니다. 

폴더의 이름을 `04-03-rest-api-with-express-3` 로 바꿔줍니다. 

`index.js` 파일을 수정해보겠습니다.

위에서 잠깐 살펴보았던 req가 무엇인지, 콘솔에 로그를 찍어 확인해보겠습니다. 

`console.log(req);` 한줄 추가해주세요.

```jsx

app.post('/board', (req, res) => {
  // 데이터 등록하는 로직
  console.log(req);

  res.send('등록에 성공하였습니다.');
});
```

**서버를 종료했다가 다시 띄우고,** 

postman으로 요청보내면 터미널에 req에 뭐가 들어있는지 많은 내용이 보입니다.

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2011.png)

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2012.png)

HTTP 메시지에는 헤더가 있다고 배웠었죠? 여기서도 보이네요.

<aside>
💡 코드를 수정했다면 서버를 종료하고, 다시 열어줘야합니다 !
수정한 부분이 반영되지 않았다면 서버를 껐다가 켰는지 확인해주세요 ✨
추후에 **Nest**를 이용하면, 다시 켜지 않아도 반영될 수 있게 할 수 있습니다.

</aside>

이번에는 실제로 서버로 데이터를 보내보겠습니다. 

게시글을 등록하려면 어떤 내용을 등록해야될지 보내줘야겠죠? 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2013.png)

HTTP 메시지의 바디 안에 JSON 형식으로 데이터를 넣어주면 되는데, 

이때 서버에서는 json을 읽어오기 위해 중간에 한번 처리를 해줘야합니다. 

`app.use(express.json())` 코드를 추가해주세요.

잘 받아오는지 확인하기 위해 `console.log(req.body)`도 추가해주세요. 

postman에서 Body를 클릭해 raw형식의 JSON을 선택하고 아래 데이터를 적어주세요

```json
{
	"writer": "철수",
  "title": "제목입니다~~~",
  "contents": "내용이에요!!!"
}
```

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2014.png)

터미널에서 기존에 돌아가고 있던 서버가 있다면 종료해주고, 

다시 `node index.js` 명령어를 입력해 서버를 실행합니다. 

postman에서 `Send` 버튼을 누르고, 터미널을 보면 데이터가 잘 받아진것을 확인할 수 있습니다! 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2015.png)

# rest-api ) 게시판 목록 데이터 보내기

지금까지 우리는 브라우저에서 어떤 요청이 오던 단순한 한 문장으로 응답했습니다.

> **`"등록에 성공하였습니다."`**
> 

하지만 보통 데이터는 **배열 안에 객체**가 들어있는 형태가 많습니다. 

프리캠프에서 보았던 과일 인기 검색어를 다시 살펴보세요! 

![BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled_(1).png](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled_(1).png)

```jsx
const fruits = [
		{ number:  1, title: "레드향"　　　　},
		{ number:  2, title: "샤인머스켓"　　},
		{ number:  3, title: "산청딸기"　　　},
		{ number:  4, title: "한라봉"　　　　},
		{ number:  5, title: "사과"　　　　　},
		{ number:  6, title: "애플망고"　　　},
		{ number:  7, title: "딸기"　　　　　},
		{ number:  8, title: "천혜향"　　　　},
		{ number:  9, title: "과일선물세트"　},
		{ number: 10, title: "귤"　　　　　 },
]
```

게시판 목록을 조회했을 때의 데이터도 비슷합니다! 

아래 표는 게시판의 데이터베이스입니다. 

| number | writer | title | contents |
| --- | --- | --- | --- |
| 1 | "철수" | "제목입니다~~~" | "내용이에요!!!" |
| 2 | "영희" | "좋은 날씨입니다!" | "내용@@@@@" |
| 3 | "훈이" | "점심 맛있게 드셨나요?!" | "식사 하셨나요?!" |
| 4 | "맹구" | "안녕하세요?!" | "내용이요!!!" |

이 표를 코드로 표현하려면 어떻게 해야할까요?

게시글 하나 하나를 객체로 표현하고, 글들을 모두 모아 하나의 배열로 나타낼 수 있습니다.

```jsx
[
	{ number: 1, writer: "철수", title: "제목입니다~~~", contents: "내용이에요!!!" },
	{ number: 2, writer: "영희", title: "좋은 날씨입니다!", contents: "내용@@@@@" },
	{ number: 3, writer: "훈이", title: "점심 맛있게 드셨나요?!", contents: "식사 하셨나요?!" },
	{ number: 4, writer: "맹구", title: "안녕하세요?!", contents: "내용이요!!!" }
]
```

이제 이 데이터를 클라이언트에 보내주면 됩니다!

app.get('/boards') 안에서 기존에 있던 **res.send("조회에 성공하였습니다.")** 부분은 주석처리하고, 

게시글 데이터를 보내는 코드를 작성합니다.

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2016.png)

### postman으로 확인하기

터미널에서 기존에 돌아가고 있던 서버가 있다면 종료해주고, 

다시 `node index.js` 명령어를 입력해 서버를 실행합니다. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2017.png)

**postman**을 실행합니다. 

**`GET`** 요청을 선택하고, URL에는 **[localhost:3000/boards](http://localhost:4000/boards)** 를 입력합니다. 

**`send`**를 누르면 게시글 데이터가 잘 나오는 것을 확인할 수 있습니다. 👏

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2018.png)

---

# createTokenOfPhone → rest-api로 만들기

핸드폰 번호를 받아 인증 토큰을 만들어줬던 함수 `createTokenOfPhone` 를 기억하시나요? 

이 함수를 이용해서 요청이 왔을 때 request body에서 핸드폰 번호를 받아 검증한 후,

인증번호를 전송해주는 API를 만들어보겠습니다. 

`04-03-rest-api-with-express-3` 폴더를 복사 붙여넣기해 사본을 만들어줍니다.

폴더의 이름을 `04-04-rest-api-with-express-3-token` 로 바꿔줍니다.

`01-05-token-count-api-facade-import` 폴더로 가서 phone.js 파일의 코드를 복사합니다. 

```jsx
export function checkValidationPhone(phone){
    if(phone.length !== 10 && phone.length !== 11){
        console.log("에러발생!!! 핸드폰 번호를 제대로 입력해 주세요.")
        return false
    }
    return true
}

export function getToken(count){
    if(count === undefined){
        console.log("에러발생!!! 갯수를 입력해 주세요!!!")
        return
    } else if(count <= 0){
        console.log("에러발생!!! 갯수가 너무 적습니다!")
        return
    } else if(count > 10){
        console.log("에러발생!!! 갯수가 너무 많습니다!")
        return
    }
    const result = String(Math.floor(Math.random() * 10**count)).padStart(count, "0")
    return result
}

export function sendTokenToSMS(phone, token){
    console.log(phone + "번호로 인증번호" + token + "을 전송합니다.")
}
```

`04-04-rest-api-with-express-3-token` 폴더 안에 `phone.js` 파일을 새로 생성해,

복사한 코드를 붙여넣기 합니다.  

`/phone/token` URL로 **POST** 요청이 왔을 때 처리해주는 API를 추가해주겠습니다.

**index.js** 파일에 아래의 코드를 추가해줍니다.

```jsx
app.post('/phone/token', (req, res) => {
    // 1. 휴대폰번호 자릿수 맞는지 확인하기
    const isValidationPhone = checkValidationPhone(req.body.phone)
    if(isValidationPhone === true){
        // 2. 핸드폰 토큰 6자리 만들기
        const token = getToken(6)

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(req.body.phone, token)
    }

    res.send("인증번호를 전송했습니다.")
})

app.listen(3000)
```

`phone.js` 파일에 있는 함수들 **checkValidationPhone, getToken, sendTokenToSMS**을 사용하려면 **import** 해줘야합니다. 

`index.js` 파일의 위에 import 해주세요. 

```jsx
import express from 'express'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'

const app = express()
app.use(express.json())
```

### postman으로 확인하기

터미널에서 `04-04-rest-api-with-express-3-token`  폴더로 이동합니다. 

**node index.js** 명령어로 서버를 띄웁니다. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2019.png)

**postman**을 열어주세요. 

**POST** 방식을 선택하고 URL은 '**localhost:3000/phone/token**'을 적어줍니다. 

**Body** 부분에는 핸드폰 번호를 아래와 같이 json 형식으로 적어주세요. Send를 누르면 서버로 요청을 보내게 됩니다.

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2020.png)

그리고 터미널을 확인해보면 핸드폰 번호도 잘 전달되었고, 토큰도 만들어졌습니다. 👏👏👏👏

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2021.png)

---

# Swagger를 활용한 API-Docs 만들기

<aside>
<img src="BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Screenshot_2021-12-06_at_11.36.14.png" alt="BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Screenshot_2021-12-06_at_11.36.14.png" width="40px" /> 스웨거는 REST API를 쉽게 문서화하고 테스트할 수 있도록 도와주는 도구입니다!

</aside>

[공식 사이트](https://swagger.io/)

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2022.png)

직접 실습해보겠습니다.

먼저, `04-04-rest-api-with-express-3-token` 폴더를 복사 붙여넣기 해 사본을 만들어줍니다. 

폴더명을 `04-05-rest-api-with-express-3-token-swagger` 로 변경해줍니다. 

우리가 Node.js로 만든 API를 스웨거와 연결하기 위해 설치해야할 npm 모듈이 두가지가 있습니다.

 swagger-ui-express

[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express?activeTab=readme)

- API 설명이 적힌 파일을 넘겨주면, express에서 위의 이미지와 같은 사이트를 만들어서 띄워줍니다.

 swagger-jsdoc

[swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)

- 주석으로 API에 대한 설명을 적으면 `swagger-ui-express`에 넘겨주기 위한 문서를 만들어줍니다.

터미널에서 `04-05-rest-api-with-express-3-token-swagger` 로 이동합니다. 

설치하기 위해 `npm install swagger-ui-express swagger-jsdoc` 명령어를 입력해주세요. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2023.png)

**swagger** 문서를 만들기 위해서는 두가지 파일이 필요합니다. 

관련 파일을 담아두기 위해 `swagger`라는 폴더를 새로 만들어주세요. 

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2024.png)

먼저 board api와 관련된 설명을 주석으로 달아주겠습니다. 

**swagger** 폴더 안에 `board.swagger.js` 파일을 만들고, 아래 내용을 넣어주세요. 

```jsx
/**
 * @swagger
 * /boards:
 *      get:
 *          summary: 게시글 가져오기
 *          tags: [Board]
 *          parameters:
 *              - in: query
 *                name: number
 *                type: int
 *          responses:
 *              200:
 *                  description: 성공
 *                  content:
 *                      application/json:
 *                          schema:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                  number:
 *	                                    type: int
 *	                                    example: 1
 *                                  writer:
 *	                                    type: string
 *	                                    example: 철수
 *                                  title:
 *	                                    type: string
 *	                                    example: 제목입니다~~~
 *                                  contents:
 *	                                    type: string
 *	                                    example: 내용이에요!!!
 */

/**
 * @swagger
 * /boards:
 *       post:
 *          summary: 게시글 등록하기
 *          tags: [Board]
 *          parameters:
 *              - in: query
 *                name: writer
 *                type: string
 *              - in: query
 *                name: password
 *                type: string
 *              - in: query
 *                name: title
 *                type: string
 *              - in: query
 *                name: contents
 *                type: string
 *          responses:
 *              200:
 *                  description: 성공
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *	                                    type: string
 *	                                    example: 게시물이 정상적으로 등록되었습니다.
 */
```

❓ 어떤 내용을 주석으로 적으면 되는지는 아래의 사이트를 참고해보세요!

[Basic Structure](https://swagger.io/docs/specification/basic-structure/)

이 파일을 가지고, API 문서를 만들어주는 설정이 필요합니다.

npm 사이트를 참고해볼까요?

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2025.png)

`swagger` 폴더에 `config.js` 파일을 만들고, 아래의 내용을 적어주세요. 

```jsx
export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '코드캠프 백엔드',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.js'],
};
```

이제 다시 index.js 파일로 가서 swagger ui를 만들어보겠습니다. 

아래의 코드를 추가해주세요.

```jsx
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'

...

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
```

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2026.png)

터미널에서 해당 폴더로 이동한 후, `node index.js` 로 서버를 띄워줍니다. 

 [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) 를 접속해보면, 아래와 같은 내용을 확인할 수 있습니다! 👏👏👏👏👏👏

![Untitled](BE%20Day04%20Express%20with%20Rest%20API,%20Swagger%201dc7187041bb48b18603daf376ead05a/Untitled%2027.png)

---