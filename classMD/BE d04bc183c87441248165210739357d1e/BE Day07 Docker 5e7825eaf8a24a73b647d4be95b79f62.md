# BE Day07 Docker

**목차**

  

---

# 프론트엔드와 백엔드의 전체 구조

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled.png)

1. 여기 우리의 컴퓨터가 있습니다. 
2. vscode에서 싸이월드 코드를 가지고 라이브 서버를 띄웁니다. 
3. 브라우저에서 백엔드 서버로 API를 요청합니다.
4. 백엔드 서버는 데이터베이스에서 board 정보를 저장하거나, 가져오고 브라우저에 응답을 보냅니다. 

---

# 데이터베이스 SQL vs NoSQL

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%201.png)

1. **브라우저**에서 **백엔드 서버**로 **API** 요청을 보냅니다.
2. 요청을 받은 백엔드가 **DB**로 데이터를 저장하거나, 가져오는 등의 행동을 하기 위해 ORM(Object-Relational Mapper)이나 ODM(Object-Document Mapper)을 사용합니다. 
3. **ORM**은 **테이블**로 이루어진 데이터베이스를 다룰 때 사용하는 **SQL**을 다른 언어에서 쉽게 사용하도록 해줍니다. 
4. **ODM**은 문서(**document**)와 **collection**으로 이루어진 **NoSQL** 데이터베이스를 다룰 수 있도록 해줍니다.

---

## 도커 설치

<aside>
⚠️ 윈도우 사용자의 경우 아래 링크에서 [WSL2를 설치하고 활성화하는 방법]을 참고해서 먼저 설치해주세요.

[[Windows 10] Docker 설치 완벽 가이드(Home 포함)](https://www.lainyzine.com/ko/article/a-complete-guide-to-how-to-install-docker-desktop-on-windows-10/)

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%202.png)

</aside>

[https://www.docker.com/](https://www.docker.com/) 도커 홈페이지에 들어갑니다. 

<aside>
👆 **Get Started** 를 누릅니다.

</aside>

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%203.png)

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%204.png)

<aside>
😉 본인 컴퓨터의 운영체제에 맞게 다운로드한 후, 설치하고, 재부팅합니다.

</aside>

## docker 설치 확인

터미널에서 다음의 명령어를 입력해봅니다.

`docker --version`

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%205.png)

잘 나온다면 설치한 docker 프로그램을 실행시켜 보세요! 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%206.png)

---

## Docker를 사용하는 이유

우리가 서버를 돌리기 위해서는 먼저 환경이 갖춰져야 합니다. 

새로 컴퓨터를 샀다거나 또는 새로 직원이 들어왔다고 생각해봅시다. 그럼 컴퓨터에 우리가 개발한 환경과 똑같이 만들어야합니다.

이를위해 Node.js와 같은 언어 그리고 언어의 버전, 데이터베이스, 수 많은 node_modules를 버전을 맞춰서 설치해줘야 합니다. 한두가지가 아니겠죠.

그래서 예전 회사에서는 환경을 구축하는 과정을 하나씩 캡쳐하고, 기록해서 방법을 정리해두기도 합니다. 가이드 문서가 있다고 한들 매번 이렇게 구축하는 것은 매우 번거로운 일입니다. 이를 간편하게 해주는 것이 바로 도커입니다.

---

## Docker 란?

도커는 개발 환경 요소들이 설치된 모습을 이미지로 저장합니다. 저장한 이미지를 클라우드에 올립니다. 이미지들이 서로 연결되서 동작하는 설정을 **문서(Dockerfile)**로 저장합니다. 새 컴퓨터에 가서 복사한 문서의 내용대로 이미지를 다운받아 설치합니다. 

가상 머신이랑 비슷하다고 볼 수 있습니다. 하지만 가상머신보다 훨씬 빠르고, 자원을 효율적으로 사용합니다. 왼쪽이 가상머신, 오른쪽이 도커입니다. 도커에는 불필요한 추가적인 운영체제 설치가 필요 없습니다. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%207.png)

<[출처](https://medium.com/@darkrasid/docker%EC%99%80-vm-d95d60e56fdd)>

도커 허브에서는 npm 다운 받는 것처럼 다른 사람들이 올려놓은 이미지를 다운로드 할 수도 있습니다. 

또한,  한 컴퓨터에서 다른 환경의 여러 서비스를 실행해야 하는 경우, 컨테이너로 분리되어 있기 때문에 서로 독립되어 실행 될 수 있습니다.

이것들을 모두 간단한 명령어로 실행 할 수 있습니다. 

## Dockerfile

컨테이너를 실행하기 전에 먼저 해줘야할 것은 이미지를 만드는 것입니다. `Dockerfile` 이라는 이름의 파일을 만들고 이미지를 만들기 위한 명령어를 입력합니다. 그리고 `docker build` 명령어를 통해 이미지를 만들게 됩니다. 

### Dockerfile 작성

class 폴더 안에  `07-01-docker` 폴더를 새로 만들어주세요. 

`Dockerfile` 파일을 새로 만들고, 안에 다음과 같은 코드를 작성합니다. 

```docker
FROM node:16

WORKDIR /my_backend/
COPY . /my_backend/

CMD node index.js
```

`FROM 리눅스:최신버전` 이런식으로 쓰면, 리눅스의 최신 버전이 깔린 컴퓨터가 한대 만들어집니다. 

그런데 우리는 컴퓨터에 node, npm, yarn도 깔아야 합니다. 도커에는 다른 사람들이 만들어놓은 여러 이미지가 있는데 우리가 필요한 것들이 이미 깔려있는 이미지도 있습니다.

`FROM node:16` 을 하면 node, npm, yarn이 모두 깔린 리눅스 컴퓨터가 하나 생기게 됩니다.

밖에 있는 소스 코드를 이렇게 만든 가상 컴퓨터 안에 넣어보겠습니다. 

`index.js` 파일을 새로 만들고 안에 콘솔 로그를 작성해주세요. 

```jsx
console.log("안녕하세요!!! 도커 안에서 index.ts 파일을 실행했군요!!")
```

방금 만든 파일을 도커 안에서 실행시키고 싶습니다. 

다시 **Dockerfile**로 돌아와보겠습니다.

`COPY . /my_backend/` 는 밖에 있는 소스 코드를 모두 my_backend 폴더로 복붙하겠다는 뜻입니다. 

`CMD node index.js` 를 통해서 복사해서 넣은 파일을 실행해줍니다. 

그런데 어디서 저 명령어를 실행할지를 모르기 때문에,

작업 폴더를 지정해줍니다.  `WORKDIR /my_backend/`

## docker build

이제 도커 파일을 빌드해줘야합니다. 

터미널에서 07-01-docker 폴더로 이동해 `docker build .` 명령어를 입력해줍니다.

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%208.png)

빌드가 잘 됐습니다. ✨

<aside>
⚠️ 혹시 이런 에러가 나온다면, 설치한 docker 프로그램이 켜져있나 확인해주세요!

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%209.png)

</aside>

빌드가 완료되면 이미지가 생성된 것이고, 이는 `docker images` 명령어로 확인해볼 수 있습니다. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2010.png)

**CREATED**를 보면 방금 전에 우리가 만든 이미지라는 것을 알 수 있습니다. 

이렇게 한번 이미지를 만들어놓으면, 언제 어디서든 똑같은 환경의 가상 컴퓨터를 만들 수 있게 됩니다. 도커를 쓰면 참 편리하죠? 

## docker run

이제 이 이미지를 실행해보겠습니다.

`docker run 이미지ID` 명령어를 입력해주세요.

**docker images 명령어**로 알 수 있는 **IMAGE ID**를 사용하시면 됩니다.

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2011.png)

# dockerignore

`06-03-rest-api-with-sms-email` 폴더를 복사 붙여넣기해 `07-02-docker-with-dockerignore`로 이름을 변경합니다. 

폴더 안에 `Dockerfile`을 만들어줍니다. 

```docker
FROM node:16

WORKDIR /my_backend/
COPY . /my_backend/

CMD node index.js
```

`FROM nodeL16` : node가 깔려있는 리눅스 컴퓨터를 한대 만들고,

`WORKDIR /my_backend/` 명령어를 입력할 위치를 정해주고,

`COPY . /my_backend/` 모든 소스 코드를 복사해 도커 컴퓨터에 넣어줍니다. 

`CMD node index.js` 서버를 실행해줍니다. 

  🚨  여기에 문제가 있습니다. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2012.png)

각자의 컴퓨터 환경에서 설치된 node_modules 폴더는 

새로 만든 도커 컴퓨터와는 환경이 다르기 때문에 사용하면 안되고, 

가상 컴퓨터에서 모듈을 따로 설치를 해줘야합니다. 

`RUN yarn install` 를 **dockerfile**에추가해줍니다. 

```docker
FROM node:16

WORKDIR /my_backend/
COPY . /my_backend/

RUN yarn install
CMD node index.js
```

기존에 있는 node_modules 폴더까지 복사할 필요는 없겠죠.

그렇기 때문에 무시하라고 알려주는 설정을 해주겠습니다. 

`.dockerignore` 파일을 새로 만들고 아래와 같이 적습니다. 

```
node_modules/
```

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2013.png)

이렇게 하면 도커에서는 `node_modules` 폴더를 무시해서, 복사가 되지 않습니다. 

터미널에서 해당 폴더(`07-02-docker-with-dockerignore`)로 이동해 도커를 빌드해줍니다. 

`docker build .` 명령어를 입력합니다. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2014.png)

이미지가 잘 만들어졌는지 확인해보겠습니다. 

`docker images`

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2015.png)

두 개의 이미지 중에서 방금 전에 만들어진 이미지의 아이디를 복사해주세요. 

`docker run 이미지_아이디` 를 입력해, 도커를 실행해주세요. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2016.png)

## 도커 내부 접속

도커 안에 들어가보겠습니다. 

현재 도커가 실행중인 터미널은 그대로 두고, 창문 모양의 버튼을 눌러 새로운 터미널을 띄워줍니다. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2017.png)

새롭게 생긴 터미널에서 해당 폴더(`07-02-docker-with-dockerignore`)로 이동해줍니다. 

`docker ps` 명령어를 입력해, 현재 프로세스를 확인해봅니다. 

방금 실행한 도커(컨테이너) 한개가 실행 중임을 확인할 수 있습니다.

**STATUS**를 보면 **Up**으로 되어있죠?

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2018.png)

이제 이 컨테이너에 내부에 들어가보겠습니다. 

`docker exec -it 컨테이너_아이디 /bin/bash` 명령어를 입력하면, 화면이 bash 쉘로 바뀌게됩니다.

<aside>
💡 windows 사용자의 경우 `docker exec -it 컨테이너_아이디 sh` 명령어를 입력해주세요.

</aside>

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2019.png)

쉽게 얘기하면 도커에서 돌아가고 있는 가상 컴퓨터의 터미널로 들어온 것입니다.  

가상 컴퓨터의 터미널에 왔으니 우리의 소스코드가 잘 복사가 되어있는지 확인해보겠습니다.

`ls` 를 입력해보세요. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2020.png)

모든 코드가 잘 들어와있습니다! 👏

이제 분리했던 터미널을 닫아주고, 도커로 띄운 서버의 API가 잘 작동하는지 postman으로 확인해보겠습니다. 

`'/boards'` 로 GET 요청을 해보면 ??

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2021.png)

안됩니다.. 😧

여기에는 포트 문제가 있습니다. 

여태까지 `node index.js` 로 3000번 포트에서 실행하고 `localhost:3000`에 접속 하면 됐지만 !

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2022.png)

docker 환경에서는 내 컴퓨터 안에 도커라는 프로그램이 있고, 그 안에서 node index.js가 실행중입니다.

그러니까 가상 컴퓨터 안에서는 3000번이 잘 접속되지만, 내 컴퓨터에서는 3000번에 아무 것도 없습니다.

따라서, 가상 컴퓨터의 3000번과 내 컴퓨터의 포트를 연결해줘야합니다.  

<aside>
☺️ 이것을 `포트 포워딩`이라고 부릅니다 !

</aside>

실행되고 있는 컨테이너를 멈춰주겠습니다. 

새로 터미널을 열고 `class/07-02-docker-with-dockerignore` 폴더로 이동합니다. 

`docker ps` 명령어를 입력 해서 컨테이너 아이디를 복사합니다. 

복사한 컨테이너 아이디를 이용해서 `docker stop 컨테이너_아이디` 명령어를 실행합니다. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2023.png)

이제 도커를 다시 실행하는데, 내 컴퓨터의 1000번 포트와 도커 컴퓨터의 3000번 포트를 연결해주겠습니다.

`docker run -p 1000:3000 이미지_아이디` 명령어를 입력합니다. 

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2024.png)

다시 postman으로 요청을 보내서 확인해보겠습니다.

내 컴퓨터의 1000번 포트로 연결을 했기 때문에 3000이 아니라, 

 `http://localhost:1000/boards` 으로 GET 요청을 보냅니다.

![Untitled](BE%20Day07%20Docker%205e7825eaf8a24a73b647d4be95b79f62/Untitled%2025.png)

이제 잘 되는 것을 확인할 수 있습니다 ! 👏

`docker stop 컨테이너_아이디` 으로 컨테이너를 종료해주세요. 

---

# Docker와 package.json

`07-02-docker-with-dockerignore` 폴더를 복사 붙여넣기 해 사본을 만들고

폴더 이름을 `07-03-docker-with-dockerignore-packagejson` 로 변경합니다. 

기존 `Dockerfile` 은 다음과 같습니다. 

```docker
FROM node:16

WORKDIR /my_backend/
COPY . /my_backend/

RUN yarn install
CMD node index.js
```

만약에, `index.js` 파일의 코드를 일부 수정해서 다시 이미지를 굽고 싶다고 한다면

모든 코드를 다시 복사해 가상 컴퓨터에 붙여넣기 하고, `COPY . /my_backend/`

`RUN yarn install` 을 해서 노드 모듈도 다시 설치하게 됩니다.

`index.js` 파일만 수정했지, `package.json` 내용은 건드리지 않았는데

다시 설치를 모두 한다는게 매우 비효율적입니다. 

docker는 `Dockerfile`을 보면서 명령어를 한줄씩 실행하다가 

기존 내용에서 변경되지 않았다면 그대로 쓰고, 아니라면 그 부분부터 새로 굽습니다. 

모든 소스 코드를 카피하기 전에 먼저, package.json을 복사하도록 적어줍니다. 

`COPY ./package.json /my_backend/`

그리고 yarn install(`RUN yarn install`)을 하고, 

나머지 파일을 복사해오고(`COPY . /my_backend/`),

 node로 서버를 실행(`CMD node index.js`)해줍니다. 

```docker
FROM node:16

WORKDIR /my_backend/
COPY ./package.json /my_backend/
RUN yarn install

COPY . /my_backend/
CMD node index.js
```

이렇게 **Dockerfile**을 적으면, 

**package.json**이 수정되지 않았다면 yarn install 까지는 기존 것을 그대로 쓰고, 

밑에 실제로 코드가 고쳐진 부분만 실행됩니다. 

여기서 끝나면 안되고, yarn.lock 파일도 같이 움직여야합니다. 

이 파일도 복사해주는 코드를 추가해줍니다. `COPY ./yarn.lock /my_backend/`

```docker
FROM node:16

WORKDIR /my_backend/
COPY ./package.json /my_backend/
COPY ./yarn.lock /my_backend/
RUN yarn install

COPY . /my_backend/
CMD node index.js
```