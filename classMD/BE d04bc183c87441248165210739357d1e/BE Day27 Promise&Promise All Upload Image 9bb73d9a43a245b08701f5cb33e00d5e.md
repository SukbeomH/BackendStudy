# BE Day27 Promise&Promise All / Upload Image

---

# Promise

## Promise?

프로미스는 자바스크립트 비동기 처리에 사용되는 객체입니다.  

자바스크립트의 비동기 처리란 ‘특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성’을 의미합니다.  

## Why Promise?

프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용합니다. 일반적으로 웹 애플리케이션을 구현할 때 서버에서 데이터를 요청하고 받아오기 위해 아래와 같은 API를 사용합니다.

```jsx
$.get('url주소/products/1', function(response) {
	//...
});
```

위 API가 실행되면 서버에다가 ‘데이터 하나 보내주세요’ 라는 요청을 보냅니다. 

그런데 자바스크립트는 데이터를 받아오는 것을 기다리지 않고, 화면에 데이터를 표시하려고 하기 때문에 오류가 발생하거나 빈 화면이 뜹니다. 

이와 같은 문제점을 해결하기 위한 방법 중 하나가 프로미스입니다.

## Three states of a Promise

프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(states)입니다. 즉 처리 과정을 의미합니다.

 `new Promise()`로 프로미스를 생성하고 종료될 때까지 3가지 상태를 갖습니다.

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

**Pending(대기)**

먼저 아래와 같이 `new Promise()` 메서드를 호출하면 대기(Pending) 상태가 됩니다.

```jsx
new Promise();
```

`new Promise()` 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve`, `reject`입니다.

```jsx
new Promise(function(resolve, reject) {
	// ...
});
```

---

**Fulfilled(이행)**

여기서 콜백 함수의 인자 `resolve`를 아래와 같이 실행하면 이행(Fulfilled) 상태가 됩니다.

```jsx
new Promise(function(resolve, reject) {
  resolve();
});

```

그리고 이행 상태가 되면 아래와 같이 `then()`을 이용하여 처리 결과 값을 받을 수 있습니다.

```jsx
function getData() {
  return new Promise(function(resolve, reject) {
    let data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function(resolvedData) {
  console.log(resolvedData);
	// 100
});

```

※ 프로미스의 '이행' 상태를 좀 다르게 표현해보면 '완료' 입니다.

---

**Rejected(실패)**

`new Promise()`로 프로미스 객체를 생성하면 콜백 함수 인자로 `resolve`와 `reject`를 사용할 수 있다고 했습니다. 여기서 `reject`를 아래와 같이 호출하면 실패(Rejected) 상태가 됩니다.

```jsx
new Promise(function(resolve, reject) {
  reject();
});
```

그리고, 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 `catch()`로 받을 수 있습니다.

```jsx
function getData() {
  return new Promise(function(resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function(err) {
  console.log(err);
	// Error: Request is failed
});

```

![https://joshua1988.github.io/images/posts/web/javascript/promise.svg](https://joshua1988.github.io/images/posts/web/javascript/promise.svg)

---

## Example

이번에는 간단하게 `Promise`를 활용해서 코드를 작성해보겠습니다.

class 폴더 안에 26-01-promise 폴더를 만들어 주세요.

`yarn init` 명령어를 입력해서 package.json을 생성해주세요.

```json
{
  "scripts": {
    "dev": "ts-node index.ts"
  },
  "dependencies": {
    "ts-node": "^10.4.0",
    "typescript": "^4.5.4"
  }
}
```

package.json은 다음과 같습니다. 필요한 모듈을 설치해 주세요.

`index.ts` 파일을 만들어주세요.

```tsx
async function fetchData() {
  const result = await new Promise((resolver, reject) => {
    setTimeout(() => {
      try {
        resolver("성공!!");
      } catch (error) {
        reject("실패!!");
      }
    }, 2000);
  });

  console.log(result);
  console.log("끝!!!");
}

fetchData();
```

`setTimeout`을 사용해 **2초 뒤에 함수가 실행됩니다.**

앞서 설명했듯이 `resolver`와 `reject`를 인자로 활용했습니다.

`try-catch 문`을 활용해서 전체 코드를 감쌌고 **만약 중간에 Error가 발생했을 경우 result는 실패, 문제없이 코드가 실행되었다면 result는 성공 일 것입니다.**

![스크린샷 2022-02-13 오후 9.07.07.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.07.07.png)

`yarn dev`를 입력해 파일을 실행하면 중간에 에러가 발생하지 않았기 때문에 **2초 뒤에 다음과 같은 결과 창을 확인할 수 있습니다.**

---

# Promies all

여러 개의 비동기 처리를 병렬로 처기 하기 위한다면 `Promise all` 을 사용합니다.

여기서 말하는 여러 개의 비동기 처리란, 순서가 보장되지 않아도 되는 상황을 말합니다.

이전에 우리가 만들었던 상품 정보와 상품 태그를 저장하는 API에서 배열로 받은 상품 태그를 순서와 무관하게 저장하는 경우를 예를 들 수 있을 것 같습니다.

그렇다면 이런 순서와 무관한 비동기 작업을 병렬로 진행하려면 어떻게 해야 할까? 일단 `Promise all`을 이용하여 확인해 보겠습니다.

## Example

class 폴더 안에 26-02-promise-all 폴더를 만들어 주세요.

`yarn init` 명령어를 입력해서 package.json을 생성해주세요.

```json
{
  "scripts": {
    "dev": "ts-node index.ts"
  },
  "dependencies": {
    "ts-node": "^10.4.0",
    "typescript": "^4.5.4"
  }
}
```

package.json은 다음과 같습니다. 필요한 모듈을 설치해 주세요.

```tsx
async function display(text, time) {
  return new Promise((resolved, rejected) => {
    setTimeout(
      () =>
        typeof text === "string"
          ? resolved("오호 스트링?")
          : rejected("누구냐 넌..."),
      time
    );
  });
}

async function aaa() {
  console.time("Promise 시간");
  await display("jacob", 3000);
  await display("제이콥", 2000);
  await display("콥짱", 1000);
  console.timeEnd("Promise 시간");
}

async function bbb() {
  console.time("Promise.all 시간");
  await Promise.all([
    display("jacob", 3000),
    display("제이콥", 2000),
    display("콥짱", 1000),
  ]);
  console.timeEnd("Promise.all 시간");
}

aaa();
bbb();
```

병렬로 처리하는 `promise all` 과 `promise의` 처리 속도를 확인하기 위해서 다음과 같이 `index.ts`를 작성해 주세요. 한눈에 봐도 `awiat`가 각각 3개와 1개입니다. 효율성 면에서 `await`는 최소한으로 하는 것이 좋습니다.

![스크린샷 2022-02-15 오전 9.37.28.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-15_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_9.37.28.png)

`yarn dev`를 입력해 `index.ts`를 실행시키면 다음과 같이 처리 속도를 확인할 수 있습니다.

---

# Cloud Service

`클라우드 컴퓨팅`이란 인터넷 기반의 컴퓨팅을 말합니다. 인터넷 상의 가상화된 서버에 프로그램을 두고 필요할때마다 컴퓨터나 스마트폰 등에 불러와 사용하는 서비스입니다.

`클라우드(Cloud)`라는 단어가 말해주듯, 인터넷 통신망 어딘가에서 구름에 싸여 보이지 않는 컴퓨팅 자원(CPU, 메모리, 디스크 등)을 원하는 대로 가져다 쓸 수 있습니다. 

구름에 싸여 있다는 것은 그 내부를 보려고 하거나 알지 않아도 얼마든지 내가 원하는 것을 꺼내어 사용할 수 있다는 것이며, 인터넷이 연결된 어느 곳에서든 이것을 보장 받을 수 있다는 뜻입니다.

### 클라우드 컴퓨팅(Cloud Computing)

클라우드 컴퓨팅(Cloud Computing)이란 내 컴퓨터의 서버, 네트워크 등을 사용하는 것이 아닌 **'컴퓨팅 리소스'**를 제공하는 회사를 통해 서버, 네트워크를 제공받아 사용하는 것입니다.

**컴퓨팅 리소스를 제공하는 대표적인 클라우드 서비스 제공자에는 'Goggle Cloud', 'MS Azure', 'AWS'가 있습니다.**

## **장점**

웹서비스 운영자 입장에서 클라우드를 바라본다면 다음과 같은 장점이 있습니다.

- 서버를 직접 구매할 때 고려해야 할 전력, 위치, 확장성을 고민하지 않고
- 데이터 센터 어딘가에 이미 준비되어 있는 서버를 사용하며,
- 서버 세팅 등을 신경쓰지 않고 서비스 운영에만 집중 가능

또한 서비스 부하에 따라 실시간 확장성을 지원 받을 수 있으며, 사용한 만큼 비용을 지불하기 때문에 서비스 운영에 있어서 효율성이 훨씬 높아진다고 할 수 있습니다.

---

# Upload Image

## Create **Google  Cloud Storage**

**1. 왼쪽의 메뉴바에서 저장소 - Cloud Storage를 클릭해서 들어가 주세요.**

![111111.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/111111.png)

**2. 버킷 만들기 버튼을 클릭한다.**

![2222.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/2222.png)

**3. 순차적으로 옵션을 선택해서 다음과 같이 설정해 주세요.**

![스크린샷 2022-02-15 오후 4.05.17.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.05.17.png)

1. **다음과 같이 스토리지가 만들어집니다.**

![스크린샷 2022-02-15 오후 4.06.49.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.06.49.png)

## Create Credentials

1. **[Cloud Console에서의 서비스 계정 만들기 페이지](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts/create?supportedpurview=project&_ga=2.204254096.1844839264.1630222182-2088319269.1630219413&_gac=1.12247622.1630222315.CjwKCAjw4KyJBhAbEiwAaAQbE6CkIG4f4ME7-ozUClYD5n_0Pt_dn_IqtKkZJITbRpWWoT7NhTHsJxoCAS0QAvD_BwE)**로 이동해서 생성하기 시작한다. 아래 화면이 해당 페이지이며 여기서 인증할 프로젝트를 선택해주세요.

![https://blog.kakaocdn.net/dn/nULAQ/btrd0vNqA3S/Dndg3yxAAftcnZZtN5uv1K/img.png](https://blog.kakaocdn.net/dn/nULAQ/btrd0vNqA3S/Dndg3yxAAftcnZZtN5uv1K/img.png)

1.  **'서비스 계정 세부정보'에서 서비스 계정 이름, 설명 등을 입력하면 아래 화면이 나온다. 여기서 역할에 '소유자'를 부여해 주시고 계정을 만들어주세요.**

![https://blog.kakaocdn.net/dn/XFHZn/btrd04v1D3X/RekjjABsWnbo9TrwTcDHC1/img.png](https://blog.kakaocdn.net/dn/XFHZn/btrd04v1D3X/RekjjABsWnbo9TrwTcDHC1/img.png)

1. **계정 생성 후 '서비스 계정' 화면으로 들어가 생성한 계정을 클릭해주세요.**

![https://blog.kakaocdn.net/dn/b6oBWi/btrd16tlc02/KGzoCsR1OxqvsQ2ZkIG5pk/img.png](https://blog.kakaocdn.net/dn/b6oBWi/btrd16tlc02/KGzoCsR1OxqvsQ2ZkIG5pk/img.png)

1. 계정 클릭 후 '키'를 누르고 키 추가를 선택하여 새 키를 만들어주세요. 새 키 만들기 버튼을 누르고 json 유형을 선택하고 만들기를 누르면 json 파일이 받아지면 로컬이나 서버 작업환경에 옮겨주세요.

![https://blog.kakaocdn.net/dn/bvN1qo/btrd2yQHc7M/2k6ri1sOk0b58dWouSIPk1/img.png](https://blog.kakaocdn.net/dn/bvN1qo/btrd2yQHc7M/2k6ri1sOk0b58dWouSIPk1/img.png)

## Image Upload Process

![스크린샷 2022-02-15 오후 3.42.21.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.42.21.png)

## Upload Single File

class 폴더 안에 26-03-file-upload 폴더를 만들어 주세요.

26-03-file-upload 폴더 안에 25-03-point-transaction-ACID-isolation의 backend 폴더 안에 있는 모든 파일을 복사 붙여넣기 해주세요.

그래프큐엘로 파일을 받기 위해 graphql-upload 라는 라이브러리를 사용합니다.

`yarn add graphql-upload` 을 해주세요.

main.ts 파일에 장착해줍니다. `app.use(graphqlUploadExpress());`

```tsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress()); // 추가
  await app.listen(3000);
}
bootstrap();
```

`$nest g module file`

`$nest g resolver file`

`$nest g service file`

를 입력해서 payment의 **resolver, service, module**을 만들어주세요.

file 폴더를 apis 폴더로 이동시켜주세요.

![env.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/env.png)

26-03-file-upload 폴더 내부에. **env 파일을 만들어 주시고 다음과 같은 설정에 맞게 작성해 주세요.**

![config.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/config.png)

환경 변수를 관리하는. env 파일을 전역에서 사용하기 위해서는 `yarn add @nestjs/config` 를 입력해 설치해 주시고 app.module에 다음과 같이 설정해 주셔야 합니다.

```tsx
//file.resolver.ts

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.fileService.upload({ file });
  }
}
```

 `GraphQLUpload`의 type을 사용해서 frontend가 넘겨준 formdata를 받습니다. 즉 static 파일을 처리하기 위함입니다.

`file.resolver.ts` 를 다음과 같이 작성해주세요.

```tsx
//file.service.ts

import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IUpload {
  file: FileUpload;
}

@Injectable()
export class FileService {
  async upload({ file }: IUpload) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(STORAGE_BUCKET);

    const url = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => resolve(`${STORAGE_BUCKET}/${file.filename}`))
        .on('error', (error) => reject(error));
    });
    return url;
  }
}
```

`new Storage`를 생성해서 storage를 사용하기 위해 필요한 값들을 넣어줍니다. 이전에 환경 변수에 넣어 두었던 환경 변수를 사용합니다.

`new Promise`를 사용해서 받아온 file을 `createReadStream()`을 사용해서 파일을 읽어오고 `pipe`를 기준으로 스토리지에 파일을 올립니다. `**on`을 기준으로  finish일 경우 resolve를 사용해서 경로를 반환하고 `on`을 기준으로 error 일 경우에는 reject를 사용해서 error를 반환합니다.**

`promise`가 끝날때까지 기다리기 위해서 `await`를 사용했고 이 값을 **변수에 할당해 반환합니다.**

`file.service.ts` 를 다음과 같이 작성해주세요.

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

**postman을 실행해서 다음과 같이 요청을 보내주세요.**

`Body`에 `form-data`를 선택해 아래와 같이 적어줍니다.

![Untitled](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/Untitled.png)

- operations의 value에 `{"query" : "mutation($file: Upload!) { uploadFile(file: $file) }", "variables" : {"file" : null } }` 를 넣어주세요.
- map의 value의 `{ "0" : ["variables.file" ]}` 를 넣어주세요.
- 세번째로 KEY에 0을 적고 File 타입으로 변경해줍니다.

![Untitled](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/Untitled%201.png)

![스크린샷 2022-02-15 오후 8.21.13.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.21.13.png)

![ㄹㅇㄴㄹㄴ.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E3%84%B9%E3%85%87%E3%84%B4%E3%84%B9%E3%84%B4.png)

**그렇다면 정상적으로 파일이 잘 올라갔는지 확인하겠습니다.**

![스크린샷 2022-02-15 오후 8.27.38.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.27.38.png)

![스크린샷 2022-02-15 오후 8.28.00.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.28.00.png)

**정상적으로 파일이 올라갔습니다.**

## Upload Multple File

이전에는 파일 하나를 storage에 올렸다면 이번에는 **여러 개의 파일을 올려보겠습니다.** 다양한 방법이 있겠지만 이번에는 **Promise all을 사용해서 최적화된 Multple File을 진행하겠습니다.**

class 폴더 안에 26-04-file-upload-multiple 폴더를 만들어 주세요.

26-04-file-upload-multiple 폴더 안에 26-03-file-upload 폴더 안에 있는 모든 파일을 복사 붙여넣기 해주세요.

```tsx
//file.service.ts

import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IUpload {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: IUpload) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const waitedFiles = await Promise.all(files);
    const urls = await Promise.all(
      waitedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            file
              .createReadStream()
              .pipe(storage.file(file.filename).createWriteStream())
              .on('finish', () =>
                resolve(`${process.env.STORAGE_BUCKET}/${file.filename}`),
              )
              .on('error', (error) => reject(error));
          }),
      ),
    );
    return urls;
  }
}
```

`new Storage`를 생성해서 storage를 사용하기 위해 필요한 값들을 넣어줍니다. 이전에 환경 변수에 넣어 두었던 환경 변수를 사용합니다.

`waitedFiles`를 변수로 사용해서 `**Promise pending` 상태의 파일 이행 상태로 변경하기 위해서 `Promise all` 을 사용합니다.  배열 안에 객체의 형태입니다.**

![스크린샷 2022-02-16 오전 11.23.07.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.23.07.png)

변수`waitedFiles`를 map 함수를 사용해 **file 하나씩을 이전에 single file upload를 했던 로직을 수행해 대기 상태로 만들어 놓습니다.**

map 함수가 끝나면 **병렬의 구조로 한 번에 다 같이 storage에 파일을 업로드합니다.**

`promise all`이 끝날때까지 기다리기 위해서 `await`를 사용했고 이 값을 **변수에 할당해 반환합니다.**

`file.service.ts` 를 다음과 같이 작성해주세요.

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

**postman을 실행해서 다음과 같이 요청을 보내주세요.**

- operations의 value는  `{"query" : "mutation($files: [Upload!]!) { uploadFile(files: $files) }", "variables" : {"files" : [null, null] } }` 입니다.
- map의 value는  `{ "0" : ["variables.files.0"], "1" : ["variables.files.1"]}` 입니다.
- 파일은 두개를 넣어줍니다.

![스크린샷 2022-02-16 오전 11.26.10.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.26.10.png)

![ㄹㅇㄴㄹㄴ.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E3%84%B9%E3%85%87%E3%84%B4%E3%84%B9%E3%84%B4.png)

**그렇다면 정상적으로 파일이 잘 올라갔는지 확인하겠습니다.**

![스크린샷 2022-02-16 오전 11.27.35.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.27.35.png)

**정상적으로 파일이 올라갔습니다.**

# Cloud Functions

Google **Cloud Functions**는 **클라우드** 서비스를 빌드 및 연결하기 위한 서버리스 실행 환경입니다. **Cloud Functions**를 사용하면 **클라우드** 인프라와 서비스에서 발생하는 이벤트에 연결되는 단일 목적의 간단한 함수를 작성할 수 있습니다.

**Cloud Functions는 Google Cloud Storage에서 보내는 변경 알림에 응답할 수 있습니다. 객체 생성, 삭제, 보관, 메타데이터 업데이트와 같이 버킷 내의 다양한 이벤트에 대한 응답으로 트리거되도록 해당 알림을 구성할 수 있습니다.**

## Cloud Fuctions connected with Cloud Storage Process

![스크린샷 2022-02-16 오전 11.49.58.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.49.58.png)

class 폴더 안에 26-05-file-upload-thumbnail 폴더를 만들어 주세요.

26-05-file-upload-thumbnail 폴더 안에 26-04-file-upload-multiple 폴더 안에 있는 모든 파일을 복사 붙여넣기 해주세요.

## Create Cloud Function

1. **Cloud Function로 이동해서 생성하기 시작해 주세요.**

![1111.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/1111.png)

1. **트리거 유형은 Cloud Storage를 선택해 주세요**

![222222.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/222222.png)

1. **버킷을 이전에 만들어 놓았던 버킷으로 설정해 주세요.**

![33333.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/33333.png)

1. **다음과 같이 구성해 주시고 저장을 클릭해 주세요.**

![스크린샷 2022-02-16 오전 11.58.25.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.58.25.png)

1. **Cloud Build API를 사용해 주세요라는 문구를 확인하면 사용으로 설정해 주세요.**

![스크린샷 2022-02-16 오전 11.59.28.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.59.28.png)

1. **index.js에 “Hello Wrold!”를 확인하기 위해서 다음과 같이 index.js를 작성하시고 배포를 해주세요.**

![스크린샷 2022-02-16 오후 12.00.04.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.00.04.png)

## Watching Log

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

![스크린샷 2022-02-16 오전 11.26.10.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.26.10.png)

**postman을 실행해서 다음과 같이 요청을 보내주세요.**

![스크린샷 2022-02-16 오후 12.02.06.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.02.06.png)

**배포가 완료되어서 로그를 확인하기 위해서는 다음과 같이 로그 보기를 클릭해서 들어가주세요.**

![스크린샷 2022-02-16 오후 12.04.31.png](BE%20Day27%20Promise&Promise%20All%20Upload%20Image%209bb73d9a43a245b08701f5cb33e00d5e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.04.31.png)

**로그를 확인해보면 다음과 같이 파일 하나가 올라갈때마다 “hello world”가 생긴걸 확인할 수 있습니다.**