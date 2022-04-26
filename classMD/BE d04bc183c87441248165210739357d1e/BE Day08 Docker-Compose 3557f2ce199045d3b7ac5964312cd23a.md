# BE Day08 Docker-Compose

**목차**

  

---

# Mongodb

mongoDB는 **문서지향(Document-Oriented) 저장소를 제공하는 NoSQL 데이터베이스 시스템**입니다.

이외에도 NoSQL 데이터베이스 10gen, Couchbse, CouchDB 등이 있지만 **인지도 1위를 유지**하고 있습니다. 

## Mongodb 특징

mongoDB에서는 데이터가 `Document`로 불리며, 이 데이터의 집합을 `Collection(RDMS에서는 Table)`이라고 합니다. 스키마 제약 없이 자유롭고, **BSON(Binary JSON) 형태로** 각 문서가 저장되며 배열(Array)이나 날짜(Date) 등 기존 **RDMS에서 지원하지 않던 형태로도 저장**할 수 있기 때문에 **관계를 연결하는 JOIN이 필요 없이 한 문서에 좀 더 이해하기 쉬운 형태 그대로 정보를 저장**할 수 있다는 것이 특징입니다.

문서지향 데이터베이스로, **객체지향 프로그래밍과 잘 맞고 JSON을 사용할 때 아주 유용합니다.** 따라서 자바스크립트를 기반으로 하는 Node.js와 호환이 매우 좋기 때문에, Node.js에서 가장 많이 사용되는 데이터베이스입니다. 물론 mysql 같은 관계형 데이터베이스 사용도 가능합니다.

- Join이 없으므로 Join이 필요 없도록 데이터 구조화가 필요
- 다양한 종류의 쿼리문을 지원(필터링, 수집, 정렬, 정규표현식 등)
- 관리의 편의성
- 스키마 없는(Schemaless) 데이터베이스를 이용한 신속 개발. 필드를 추가하거나 제거하는 것이 매우 쉬워짐
- 쉬운 수평 확장성
- 인덱싱 제공

## SQL vs Mongodb

`Mysql`과 `Mongodb`를 가장 대표적을 비교하는데 용어도 서로 다릅니다. 

![스크린샷 2021-12-15 오후 12.11.23.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.11.23.png)

읽어보면서 익숙해지도록 노력해보세요.

![스크린샷 2021-12-15 오후 12.11.11.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.11.11.png)

`mongoDB`에서는 질의문이 모두 `JSON(BSON) 객체`로 표현됩니다. 

`mongoDB`의 데이터베이스에 접근하고 조정하는 구문은 **자바스크립트 문법에 가까운 모습**을 보입니다.

## Install Mongodb for Windows

아래 사이트로 들어가, 윈도우용 mongoDB를 다운로드 후, 설치합니다.

compass도 같이 설치할 수 있습니다.

[MongoDB Enterprise Server Download](https://www.mongodb.com/try/download/enterprise)

![Untitled](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/Untitled.png)

세부 선택 사항은 아래 블로그를 참고해주세요.

[[MongoDB] 몽고DB 설치 및 테스트 on Windows](https://m.blog.naver.com/wideeyed/221815886721)

## Install Mongodb for Mac

다들 Mac의 패키지 매니저 기능을 담당하는 `brew`를 기억하시나요? 

대부분 cli로 Mac에 패키지를 설치하기 위해서 자주 사용했을 겁니다. 

 `brew` 를 사용해 `Mongodb`를 설치해보겠습니다.

먼저 터미널을 열어주세요. 

![1.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/1.png)

`brew tap mongodb/brew`을 입력해 내 맥북에 탭을 추가해주세요.

![2.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/2.png)

`brew install mongodb-community`을 입력해 **무료버전인 mongodb-community를 설치해주세요.** 

mongodb-enterprise는 유료버전입니다.

만약 Warning: ......brew link mongodb-community 같은 경고를 확인하면,  `brew link mongodb-community`를 입력해 주시면 정상적으로 설치를 다시 진행할 겁니다.

![brew list.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/brew_list.png)

`brew list`를 입력해 설치되어 있는 패키지 안에서 **mongodb-community, mongodb-database-tools, mongosh가** 존재한다면 성공적으로 잘 설치된 것입니다.

`brew services start mongodb-community`를 입력해 mongoDB 실행시켜주세요.

![스크린샷 2021-12-14 오후 12.28.37.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-14_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.28.37.png)

정상적으로 mongoDB가 실행되었다면 브라우저를 열어서 **localhost:27017**에 들어가면 다음과 같은 화면을 확인할 수 있습니다. 

**mongoDB는 기본적으로 port:27017가 고정입니다.**

이제 **root 사용자를 등록해 비밀번호가 있어야 mongoDB에 접속할 수 있도록** 설정해 주겠습니다.

![mongo shell.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/mongo_shell.png)

`mongo`를 입력하면 shell을 사용할 수 있습니다. shell을 실행시켜주세요.

![mongodb admin 접속.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/mongodb_admin_%E1%84%8C%E1%85%A5%E1%86%B8%E1%84%89%E1%85%A9%E1%86%A8.png)

기본적으로 mongoDB에 기본적으로 `admin` 이라는 DB가 존재합니다.

`use admin`을 입력해 admin을 선택해주세요.

![mongodb설정.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/mongodb%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC.png)

`db.createUser({user:'root', pwd:'원하는 비밀번호', roles:['root']})`를 입력해 사용자를 등록해 주세요.

`exit`를 입력해 shell에서 나와주세요.

![스크린샷 2021-12-15 오후 3.33.56.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.33.56.png)

`brew services restart mongodb-community`를 입력해 mongoDB를 재시작해주세요.

mongoDB 재시작 해야 root사용자와 비밀번호를 설정해 놓았던 설정이 적용됩니다.

![접속.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%8C%E1%85%A5%E1%86%B8%E1%84%89%E1%85%A9%E1%86%A8.png)

`mongo -u root -p`를 입력하고 비밀번호를 입력해 주면 방금 전 생성했던 root 사용자로 접속하게 됩니다.

## Install Mongodb Compass

`Mongodb Compass`는 MongoDB용 GUI 데이터를 시각적으로 탐색하는 툴 입니다.

데이터베이스를 **쉽게 조회하고 수정**할 수 있습니다.

Linux, Mac 또는 Windows에서 사용 가능합니다. 

[MongoDB Compass Download](https://www.mongodb.com/try/download/compass)

MongoDB 공식 홈페이지에서 설치 파일을 다운로드 해주세요.

![스크린샷 2021-12-20 오후 12.31.47.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.31.47.png)

자신의 OS와 사용하려는 버전에 맞게 설치 파일을 다운로드해 주세요.

![다운로드.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3.png)

설치 파일을 실행하여 설치를 진행해주세요.

![스크린샷 2021-12-20 오후 12.49.28.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.49.28.png)

1.New Connection > 2.Fill in connection fields individually 버튼을 클릭하여 접속 정보를 입력해주세요.

![스크린샷 2021-12-20 오후 2.48.34.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.48.34.png)

- **Hostname**: MongoDB IP (동일한 환경일 경우 localhost)
- **Port**: MongoDB 포트 번호 (Default 27017)

다음과 같이 입력 후에 **Connect** 버튼을 클릭해 주세요.

![스크린샷 2021-12-20 오후 1.56.28.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.56.28.png)

연결이 되면 다음과 같이 MongoDB Compass에 정상적으로 접속이 된 것을 확인할 수 있습니다. 

만약 연결이 안될 겨우에는 `MongoDB Community`가 실행 중인지 확인해 주세요.

---

# Docker-compose

`Docker-compose`란 **복수 개의 컨테이너를 실행시키는 도커 애플리케이션이 정의를 하기 위한 툴**입니다.

기본적으로 `YAML 파일`을 사용하여 애플리케이션의 서비스를 구성할 수 있습니다.

즉 `YAML 파일`로 여러 개의 docker 내부 속성을 설정하고 `YAML 파일`을 실행시켜 마치 docker를 배치로 한 번에 실행시키는 것과 같다고 생각하시면 됩니다.

## Docker-compose를 활용한 mongoDB 연결

이번에는 `Docker-compose`를 이용해서 위에서 설명했던 **mongoDB를 연결**해 보겠습니다.

class 폴더 안에  `08-01-docker-compose-with-mongo` 폴더를 새로 만들어주세요. 

`08-01-docker-compose-with-mongo` 폴더 안에 `07-03-docker-with-dockerignore-packagejson` 파일을 복사 붙여넣기 해주세요.

이제 **mongoDB 컨테이너**를 띄워야 합니다. 이전에 **Day07에서 Dockerfile은 하나의 컴퓨터**라고 생각하는 거 기억하시죠?

```docker
// Dockerfile.mongo

FROM mongo:latest
```

폴더 안에 `Dockerfile.mongo`를 만들어 주시고 **mongo의 버전을 최신**으로 정의했습니다.

백엔드와  **mongoDB**의 서버를 한번에 실행시키기 위해서 **야믈파일**을 정의해주어야 합니다. 

`.yml` 이나 `.yaml` 둘 다 사용 가능합니다.

현재 디렉토리에 `docker-compose.yaml` 파일을 새로 생성해주세요.

```docker
//docker-compose.yaml

version: "3.3"

services: 
    my_backend:
        build:
            context: .
            dockerfile: Dockerfile
        ports:
            - 1000:3000
    
    my_database:
        build:
            context: .
            dockerfile: Dockerfile.mongo
        ports: 
            - 1001:27017
```

컴포즈 파일은 `service` `network` 그리고 `volume` 을 정의합니다.

우리는 `service`만 정의하겠습니다.

 `service` 정의는 각각의 컨테이너에 적용되는 **configuration을 포함**하고 있습니다. 

`service` 내부에 my_backend 와 my_database를 정의해 주었습니다. 변수명과 같은 것입니다. 다른 변수명으로 정의해 주셔도 됩니다. `service` 내부에 정의된 요소는 다음과 같습니다.

- context : Dockerfile을 포함하는 디렉토리 경로 또는 git repo의 url입니다.
- dockerfile : Dockerfile을 대체하는 파일을 지정해 줍니다.

`ports` 정의는 호스트OS와 컨테이너의 포트를 바인딩 시켜줍니다. 예를들어 **컨테이너의 노출된 포트 1000을 Docker 호스트 컴퓨터(Linux VM)의 포트 3000에 전달합니다.**

이제 `docker-compose.yaml` 파일을 실행시켜 image를 build해보겠습니다.

![스크린샷 2021-12-16 오후 12.33.35.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.33.35.png)

`docker-compose build`를 입력하면 다음과 같이 image를 build 합니다.

![스크린샷 2021-12-16 오후 12.34.44.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.34.44.png)

`docker images`를 입력해서 생성된 image를 확인합니다.

![스크린샷 2021-12-16 오후 12.35.07.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.35.07.png)

`docker-compose up`을 입력해 container를 실행시켜 줍니다.

**Banckend 서버**가 잘 실행됐는지 확인하기 위해서 **Postman을 실행**시켜 주세요.

![스크린샷 2021-12-16 오후 12.41.07.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.41.07.png)

**야믈파일에 Banckend 서버의 port를 1000:3000로 정의해주었기 때문에 Postman에서 요청을 보낼때는 [localhost:1000/boards로](http://localhost:1000/boards로) 요청을 보내야 합니다.**

다음과 같이 정상적으로 응답 값을 받아온다면 정상적으로 서버가 작동하는 겁니다.

**DB 서버**가 잘 실행하는지 확인해 보겠습니다. **MongoDB Compass를** 실행시켜 주세요.

![스크린샷 2021-12-16 오후 12.37.56.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.37.56.png)

**야믈파일에 DB 서버의 port를 1001:27017로 정의해 주었기 때문에 MongoDB Compass의 연결 port를 1001로 정의후 connect 해주세요.**

연결이 되었다면 정상적으로 DB 서버가 실행 중인 겁니다.

## Dockerfile.mongodb를 image로 변경

Dockerfile.mongodb를 image로 변경해 보겠습니다. 즉 `Dockerfile.mongo`로 정의해두었던 mongoDB의 설정을 야믈파일에 직접 정의해 보겠습니다.

class 폴더 안에 `08-02-docker-compose-with-mongo-image` 폴더를 새로 만들어주세요. 

 `08-02-docker-compose-with-mongo-image` 폴더 안에 `08-01-docker-compose-with-mongo` 파일을 복사 붙여넣기 해주세요.

`08-02-docker-compose-with-mongo-image` 폴더 안에 `Dockerfile.mongo` 는 삭제해 주세요.

```docker
// docker-compose.yaml

version: "3.3"

services: 
    my_backend:
        build:
            context: .
            dockerfile: Dockerfile
        ports:
            - 1000:3000
    
    my_database:
        image: mongo:latest
        ports: 
            - 1001:27017
```

기존에 `Dockerfile.mongo`에 정의해 두었던  mongo의 최신 버전을 image에 정의해 주었습니다. 

이제 따로 `build`에 대한 정의는 필요 없으니 지워주었습니다.

이제 `docker-compose.yaml` 파일을 실행시켜 image를 build해보겠습니다.

`docker-compose build`를 입력해주세요.

![스크린샷 2021-12-16 오후 1.36.31.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.36.31.png)

그런데 **"my_database uses an image, skipping"** 이라는 문구를 확인됩니다.

이전에 `my_database` 가 만들어졌고 변경사항이 없기 때문에 **skip** 되는 겁니다.

`docker-compose up`을 입력해 container를 실행시켜 줍니다.

![스크린샷 2021-12-16 오후 1.36.58.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.36.58.png)

**"Pulling my_database (mongo:latest)..."** 이라는 문구를 확인할 수 있습니다. 기존에 존재했던 `my_database`를 가져오면서 실행합니다.

**Banckend 서버**가 잘 실행됐는지 확인하기 위해서 **Postman을 실행**시켜 주세요.

![스크린샷 2021-12-16 오후 1.45.42.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.45.42.png)

**야믈파일에 Banckend 서버의 port를 3000:3000로 정의해주었기 때문에 Postman에서 요청을 보낼때는 [localhost:1000/boards로](http://localhost:1000/boards로) 요청을 보내야 합니다.**

다음과 같이 정상적으로 응답 값을 받아온다면 정상적으로 서버가 작동하는 겁니다.

**DB 서버**가 잘 실행하는지 확인해 보겠습니다. **MongoDB Compass를** 실행시켜 주세요.

![스크린샷 2021-12-16 오후 1.46.14.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.46.14.png)

**야믈파일에 DB 서버의 port를 27017:27017로 정의해 주었기 때문에 MongoDB Compass의 연결 port를 27017로 정의후 connect 해주세요.**

연결이 되었다면 정상적으로 DB 서버가 실행 중인 겁니다.

---

# ODM(Object Document Mapping) & Mongoose

`Mongoose`는 **Node.js와 MongoDB를 위한 ODM(Object Data Mapping) library**입니다.

**호환성이 없는 JavaScript와 MongoDB의 데이터를 Mapping하여 간편한 CRUD를 가능하게 해줍니다.**

이번에는 직접 스키마를 작성해 실제 데이터 베이스와 연결하여 요청을 보내 데이터를 생성하고 생성된 데이터를 읽어오는 작업까지 해보겠습니다.

class 폴더 안에  `08-03-rest-api-with-mongoose-1` 폴더를 새로 만들어주세요. 

`08-03-rest-api-with-mongoose-1` 폴더 안에 `08-02-docker-compose-with-mongo-imag`폴더 에 있는 모든 파일을 복사 붙여넣기 해주세요.

터미널을 열어서 `yarn add mongoose` 를 입력해 라이브러리를 설치해주세요.

[mongoose](https://www.npmjs.com/package/mongoose)

 `package.json` 파일에 설치된 mongoose의 버전이 적혀져 나온다면 잘 설치된 겁니다.

## **Defining a Model**

**Model 정의**를 위해 model 폴더를 먼저 생성해 주시고 폴더 안에 `board.model.js` 파일을 만들어주세요.

```jsx
// board.model.js

import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
    writer: String,
    title: String,
    contents: String,
});

export const Board = mongoose.model('Board', boardSchema)
```

`mongoose` 라이브러리를 사용하기 위해서 먼저 불러와 줍니다.

새로운 스키마를 `boardSchema`변수에 담아서 선언하고 내부에는 다음과 같이 요소들의 key 값의 타입을 지정해 주었습니다.

`model() 메소드`를 사용하여 문자열과 schema를 전달하여 model을 생성합니다. **첫번째 인자는 해당 collection의 단수적 표현을 나타내는 문자열 입니다.**

생성된 `model` 을 외부에서 접근할수 있도록 `export` 해주었습니다.

**mongoose의 스키마는 mongoDB에 저장되는 document의 Data 구조 즉 필드 타입에 관한 정보를 JSON 형태로 정의한 것입니다.**

![스크린샷 2021-12-16 오후 2.40.02.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.40.02.png)

Mongoose Schema는 다음의 **Data type**을 지원합니다.

## **Connecting to MongoDB**

이번에는 프로젝트 내에 mongoDB를 연결해보겠습니다.

`index.js`게시물을 등록하고 등록된 게시물을 읽어오는 로직을 작성하겠습니다.

`index.js` 파일에 다음을 추가해서 mongoDB를 연결해주세요.

```jsx
//index.js

mongoose.connect("mongodb://my_database:27017/codecamp")
```

앱이 하나의 데이터베이스만 사용하는 경우 `mongoose.connect`. 추가 연결을 생성해야 하는 경우 `mongoose.createConnection` 를 사용합니다.

`mongoose.connect('mongodb://localhost/my_database');` 의 형태로 작성됩니다. 

## POST 데이터 등록

```jsx
//index.js

app.post('/board', async function (req, res) {
    // 데이터 등록하는 로직(데이터베이스에 저장하기)

    const board = new Board({writer: req.body.writer, title: req.body.title, contents: req.body.contents})
    await board.save()

    res.send("등록에 성공하였습니다.")
})
```

`/board` **endpoint를 지정**해서 POST 요청을 받았을 때 **JSON 데이터를 담은 BODY**에서 각각의 요소를 하나하나 빼와서 **연결해 놓은 mongoDB의 boards collection**에 저장해 줍니다.

## GET 데이터 조회

```jsx
//index.js

app.get('/boards', async function (req, res) {
    // 데이터 조회하는 로직(데이터베이스에서 꺼내오기)

    const boards = await Board.find()
    res.send(boards);
})
```

`/board` endpoint를 지정해서  연결된 **mongoDB의 boards collection에 저장된 모든 데이터를 조회해서 응답해 줍니다.**

`find`는 보통 모든 데이터를 조회할 때 사용되며, `findOne` 은 **특정 데이터만 조회할 때 자주 사용**됩니다.

## 실습

이제 Postman을 사용해서 직접 통신을 해보겠습니다. 

실습 전에 docker를 이용해서 서버를 실행시키겠습니다.

1. `docker-compose build` 를 입력해 docker image를 생성해주세요.
2. `docker-compose up`을 입력해 container를 실행시켜 주세요.

실습을 위해 **Postman을 실행**시켜 주세요.

먼저 데이터를 등록해보겠습니다.

**POST메서드를 선택**해 주시고 **[localhost:3000/board](http://localhost:3000/board를)** 를 입력해 주세요.

**Body를 입력해 주기 위해서 raw를 선택하고 다음과 같이 JSON 데이터를 입력해 주세요**

```json
{
	"writer": "sunhobaik",
	"title": "codecamp",
	"contents": "여기 정말 좋아요! 한번 꼭 놀러오세요! [https://naver.com](https://naver.com/)"
}
```

**Send를 클릭**해서 요청을 보내보세요.

![스크린샷 2021-12-17 오전 11.19.11.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-17_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.19.11.png)

다음과 같은 응답 메시지를 받았다면 성공적인 통신입니다.

이제 등록된 데이터를 조회해 보겠습니다. 

**GET메서드를 선택**해 주시고 **[localhost:3000/boards](http://localhost:3000/boards)** 를 입력해 주세요.

**Send를 클릭**해서 요청을 보내보세요. 

![스크린샷 2021-12-17 오전 11.53.52.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-17_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.53.52.png)

이전에 POST 메서드로 요청을 보낸 데이터가 정상적으로 조회되면 성공적으로 데이터를 저장하고 불러왔습니다.

마지막으로 `mongoDB-compass`를 실행해서 **생성한 DB와  collention과 저장한 데이터를 확인해 보겠습니다.**

![스크린샷 2021-12-16 오후 1.46.14.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.46.14%201.png)

다음과 같이 `mongoDB-compass` 를 연결시켜 주세요. 

![스크린샷 2021-12-17 오전 11.19.45.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-17_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.19.45.png)

다음과 같이 DB가 조회됩니다. codecamp DB를 선택해주세요.

![스크린샷 2021-12-17 오후 12.12.38.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.12.38.png)

생성한 boards collection을 확인할 수 있습니다.  boards collection을 선택해주세요.

![스크린샷 2021-12-17 오전 11.20.03.png](BE%20Day08%20Docker-Compose%203557f2ce199045d3b7ac5964312cd23a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-17_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.20.03.png)

저장한 데이터가 다음과 같이 잘 보이면 성공입니다!!!!