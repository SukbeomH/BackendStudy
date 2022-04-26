# BE Day13 MySQL with NestJS

**목차**

  

---

# MySQL 설치

## 윈도우 컴퓨터

MySQL 커뮤니티 서버 설치를 위해 아래 사이트에 들어가주세요.

[MySQL :: Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

윈도우 운영체제를 선택해 `다운로드`를 누르고, `No thanks, just start my download` 를 클릭합니다.

![Untitled](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/Untitled.png)

![Untitled](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/Untitled%201.png)

다운로드 후 파일을 실행해 설치를 진행합니다.

아래 블로그를 참고하거나, 구글링하여 설치를 완료해주세요. 

### 설치 참고 블로그

[[윈도우10 Windows10] MySql다운로드 받고 설치하기](https://appia.tistory.com/717)

## 맥 컴퓨터

윈도우와 같이 공식 홈페이지에서 다운로드 하셔도 됩니다.

여기서는 brew를 이용해 설치해보겠습니다.

터미널을 열어 `brew update` 입력 후, `brew install mysql` 을 입력해 설치해주세요.

설치가 완료되면, 서버를 실행하기 위해 터미널에 `brew services start mysql` 을 입력해줍니다.

![Untitled](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/Untitled%202.png)

이 상태로도 사용할 수 있지만, 보안을 위해 비밀번호 설정을 해줘야합니다. 

터미널에 `mysql_secure_installation` 라고 입력합니다.

복잡한 비밀번호를 사용할것이냐는 질문에 `N` 을 입력하고 엔터를 칩니다.

![Untitled](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/Untitled%203.png)

```bash
New password:

Re-enter new password:
```

`New password:` 라고 나오면, 비밀번호를 입력하고 엔터를 쳐서 설정해줍니다. 

`Re-enter new password:` 비밀번호를 다시 입력합니다. 

```bash
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
```

y를 입력해, 익명의 유저를 삭제하는데 동의합니다 

```bash
Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : n
```

n을 입력해 root의 원격 접속을 허용합니다.

```bash
By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.

Remove test database and access to it? (Press y|Y for Yes, any other key for No) : n

 ... skipping.
Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.
```

n을 입력해 test 데이터베이스를 유지합니다. 

```bash
Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
Success.
```

y를 입력해 변경된 권한을 테이블에 적용합니다.

```bash
All done!
```

## mysql 접속

터미널에 `mysql -u root -p` 라고 입력한 뒤, 방금 설정한 비밀번호를 입력합니다. 

![Untitled](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/Untitled%204.png)

`mysql>` 처럼 터미널이 바꾸면 성공입니다! 👏

---

# DB 관리 툴 설치 - DBeaver

공식 사이트에 접속합니다. 

[DBeaver](https://dbeaver.io/)

다운로드를 클릭합니다. 

![Untitled](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/Untitled%205.png)

운영체제에 따라, 커뮤니티 에디션을 다운로드하고, 설치해줍니다.

![Untitled](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/Untitled%206.png)

---

# NestJS **started with GraphQL & TypeScript**

이전에는 `NestJS` 와 Rest API & TypeScript를 사용했지만 이번에는  **GraphQL & TypeScript를 사용**하는 방법에 대해서 알아보겠습니다.

Nest는 GraphQL 애플리케이션을 빌드 하는데 **코드 우선(code first)** 및 **스키마 우선(schema first)** 방법을 제공합니다.

## Code First(코드 우선)

**코드 우선** 접근 방식에서는 데코레이터와 TypeScript 클래스를 사용하여 해당 GraphQL 스키마를 생성합니다. 

이 방법은 TypeScript로만 작업하고 언어 구문 간의 컨텍스트 전환을 피하려는 경우 유용합니다.

코드 우선 접근 방식을 사용하려면 먼저 옵션 객체에 `autoSchemaFile` 속성을 추가합니다.

```tsx
GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
```

`autoSchemaFile` 속성 값은 자동으로 생성된 스키마가 생성될 경로입니다.

## S**chema First(스키마 우선)**

**스키마 우선** 접근 방식에서 진실된 소스는 **GraqhQL SDL(Schema Definision Language)** 파일입니다.

모든 프로그래밍 언어와 독립적이며, 통합되는 언어이고, `NestJS`에서는 **GraphQL 스키마를 `TypeScript`의 클래스 및 인터페이스 형식으로 구현**됩니다.

GraphQL 스키마를 기반으로 TypeScript 정의 (클래스 또는 인터페이스 사용)를 **자동으로 생성하여 중복된 상용구 코드를 작성할 필요성을 줄여줍니다.**

```tsx
GraphQLModule.forRoot({
  typePaths: ['./**/*.graphql'],
}),
```

스키마 우선 접근 방식을 사용하려면 먼저 옵션 개체에 `typePaths` 속성을 추가합니다. `typePaths` 속성은 `GraphQLModule`이 작성할 GraphQL SDL 스키마 정의 파일을 찾아야하는 위치를 나타냅니다.

```graphql
// cat.graphql

type Query {
  cats: [Cat]
  cat(id: ID!): Cat
}

type Mutation {
  createCat(createCatInput: CreateCatInput): Cat
}

type Subscription {
  catCreated: Cat
}

type Owner {
  id: Int!
  name: String!
  age: Int
  cats: [Cat!]
}

type Cat {
  id: Int
  name: String
  age: Int
  owner: Owner
}

input CreateCatInput {
  name: String
  age: Int
}
```

아래처럼 `.graphql` 로 **스키마를 직접 작성해줘야 합니다.**

즉 **code first는 typescript로 클래스를 짜면 해당 클래스에 해당하는 graphql schema를 만들어 주고 schema first는 graphql schema를 먼저 짠후 typescript 클래스나 인터페이스를 생성해줍니다.**

## NestJS with GraphQL(Code First)

저희는 typescript에 좀 더 익숙해지기 위해서 code first 방식으로 애플리케이션을 빌드 하겠습니다.

class 디렉토리로 이동해서 13-01-nestjs-with-graphql 프로젝트를 만들어 줄겁니다. 

 `$nest new 13-01-nestjs-with-graphql`를 입력해서 새로운 프로젝트를 생성해 주세요.

`$yarn add @nestjs/graphql graphql apollo-server-express@2.x.x` 를  GraphQL을 사용하기 위해 필요한 패키지를 설치해주세요.

```json
//package.json

{
  "name": "11-01-nestjs",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^8.0.0",
    "@nestjs/core": "^8.0.0",
    "@nestjs/graphql": "^9.1.2",
    "@nestjs/platform-express": "^8.0.0",
    "apollo-server-express": "^3.5.0",
    "graphql": "^15",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^7.2.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^8.0.0",
    "@nestjs/schematics": "^8.0.0",
    "@nestjs/testing": "^8.0.0",
    "@types/express": "^4.17.13",
    "@types/jest": "^27.0.1",
    "@types/node": "^16.0.0",
    "@types/supertest": "^2.0.11",
    "@typescript-eslint/eslint-plugin": "^4.28.2",
    "@typescript-eslint/parser": "^4.28.2",
    "eslint": "^7.30.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^3.4.0",
    "jest": "^27.0.6",
    "prettier": "^2.3.2",
    "supertest": "^6.1.3",
    "ts-jest": "^27.0.3",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0",
    "tsconfig-paths": "^3.10.1",
    "typescript": "^4.3.5"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

`package.json` 은 다음과 같습니다. 

직접 모듈을 설치하셔도 되고 본인의 package.json에 복사 붙여 넣기 해도 무관합니다.

```tsx
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/board/board.module';

@Module({
  imports: [
    BoardModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
```

클래스 선언 위에  `@module()` 를 붙여서 얘는 모듈로 쓸거야라고 nest한테 알려주고있습니다. 

이런 골뱅이는 데코레이터라고 했던거 기억하시죠?  함수라고 보시면 됩니다. 

`app.module` 을 열어 `GraphQLModule`을 가져와 프로젝트에 장착해주세요.

`forRoot()` 메서드는 옵션 객체를 인수로 받을 수 있으며, 이 옵션은 `ApolloServer` 생성자(constructor)에 전달됩니다.

`$ nest g module board` : board module 생성 명령어

`$ nest g service board` : board service 생성 명령어

`$ nest g resolver board` : board resolver 생성 명령어

![스크린샷 2021-12-28 오후 5.22.54.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.22.54.png)

다음 명령어를 입력하면 `src` 폴더안에 Board라는 폴더가 생성됩니다.

 Board라는 폴더안에는 `module` `service` `resolver` 가 생성됩니다.

```tsx
//board.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

`board.service`에 문자열 “Hello World!”를 반환하는 `getHello`라는 비즈니스 로직을 다음과 같이 만들어 주세요.

```tsx
//board.resolver.ts

import { Resolver, Query } from '@nestjs/graphql';
import { BoardService } from './board.service';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => String)
  getHello(): string {
    return this.boardService.getHello();
  }
}
```

클라이언트는 아직 DB와 상호 작용할 수 있는 방법이 없습니다. 이를 해결하려면 **Resolver 클래스를 만들어야 합니다**. 코드 우선 방법에서 리졸버 클래스는 Resolver 함수를 정의하고쿼리 유형을 생성합니다

Routing 개념을 적용하여 어떤 Resolver가 어떤 Request를 수신하는지 제어합니다. 각 Resolver는 최소 1개의 Route를 가지며 각 Route는 다른 action으로 동작합니다.

constructor에 BoardService를 주입해 주시고 **getHello라는 Resolver 함수**를 만들어 **BoardService의 getHello 비즈니스 로직**을 실행시켜 주세요.

src 폴더 안에 apis 폴더를 만들어주시고 Board 폴더 전체를 apis 폴더로 안으로 이동시켜 주세요.

![스크린샷 2021-12-28 오후 3.54.56.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.54.56.png)

폴더 구성은 다음과 동일합니다. 참고해주세요.

`$ yarn start dev`를 입력해서 서버를 실행시켜 주세요.

![스크린샷 2021-12-29 오후 2.14.55.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-29_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.14.55.png)

다음과 같이 common ⇒ graphql ⇒ schema.gql의 폴더와 파일이 생성되었습니다.

![스크린샷 2021-12-29 오후 2.15.00.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-29_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.15.00.png)

schema.gql 파일에 getHello의 반환될 타입이 자동으로 기록됩니다.

![스크린샷 2021-12-29 오후 2.28.57.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-29_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.28.57.png)

[http://localhost:3000/graphql](http://localhost:3000/graphql)에 접속해서 다음과 같은 화면이 나온다면 성공입니다.

---

# NestJS connected with Mysql

이번에는 typeorm을 활용해서 nestjs와 mysql 연결해 보겠습니다.

먼저 class 폴더 안에 13-02-graphql-api 폴더를 만들어 주세요.

13-02-graphql-api 폴더 안에 13-01-nestjs-with-graphql 파일을 모두 붙여 넣어 주세요.

```json
//package.json

{
  "name": "11-01-nestjs",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^8.0.0",
    "@nestjs/core": "^8.0.0",
    "@nestjs/graphql": "^9.1.2",
    "@nestjs/platform-express": "^8.0.0",
    "@nestjs/typeorm": "^8.0.2",
    "apollo-server-express": "^3.5.0",
    "graphql": "^15",
    "mysql2": "^2.3.3",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^7.2.0",
    "typeorm": "^0.2.41"
  },
  "devDependencies": {
    "@nestjs/cli": "^8.0.0",
    "@nestjs/schematics": "^8.0.0",
    "@nestjs/testing": "^8.0.0",
    "@types/express": "^4.17.13",
    "@types/jest": "^27.0.1",
    "@types/node": "^16.0.0",
    "@types/supertest": "^2.0.11",
    "@typescript-eslint/eslint-plugin": "^4.28.2",
    "@typescript-eslint/parser": "^4.28.2",
    "eslint": "^7.30.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^3.4.0",
    "jest": "^27.0.6",
    "prettier": "^2.3.2",
    "supertest": "^6.1.3",
    "ts-jest": "^27.0.3",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0",
    "tsconfig-paths": "^3.10.1",
    "typescript": "^4.3.5"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

`package.json` 은 다음과 같습니다. 

직접 모듈을 설치하셔도 되고 본인의 package.json에 복사 붙여 넣기 해도 무관합니다.

만약 복사 붙여넣기를 하셨다면 `yarn install`를 입력해 설치되지 않은 모듈을 모두 설치해 주세요.

직접 타입스크립트를 이용해서  entity를 작성해보겠습니다. 

```tsx
//board.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  number: number;

  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  contents: string;
}
```

**./src/apis/board/entities/board.entity.ts** 경로에 `board.entity.ts` 파일을 생성해 주세요.

typeorm의 데코레이터를 이용해 key : value 형태로 타입을 지정해주세요. 

다음과 같이 작성해주시면 됩니다.

// board.service.ts

```tsx
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  findAll(): string {
    // 데이터 조회하는 로직

    return '조회에 성공하였습니다.';
  }

  create(): string {
    // 데이터 등록하는 로직

    return '등록에 성공하였습니다.';
  }
}
```

`findAll` 과 `create` 의 비즈니스 로직을 다음과 같이 만들어주세요.

```tsx
import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { BoardService } from './board.service';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => String)
  fetchBoards(): string {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(): string {
    return this.boardService.create();
  }
}
```

`Board.resolver.ts` 를 다음과 같이 변경해주세요.

다들 기억하시죠? **조회를 할 때는 Query**를 **등록, 수정, 삭제할 때는 Mutation**을 사용합니다. **typeorm의 Query와 Mutation을 데코레이터 형태**로 사용했습니다.

constructor에 BoardService를 주입해 주었습니다. BoardService의 findAll과 create의 비즈니스 로직을 실행시켜 주세요.

```tsx
//app.module.ts

import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/board/board.module';
import { Board } from './apis/board/entities/board.entity';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',       //데이터 베이스 타입
      host: 'localhost', //local 환경으로 진행
      port: 3306,          //mysql은 기본 port는 3306
      username: 'root',    //mysql은 기본 user는 root로 지정
      password: 'root',    //설치 과정에서 설정한 비밀번호
      database: 'mysql',   //연결할 데이터 베이스명
      entities: [Board],   //데이터 베이스와 연결할 entity
      synchronize: true,   //연결과 동시에 테이블을 초기화 혹은 생성할 것인지
      logging: true,       //콘솔창에 log를 표시하는지
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
```

mysql과 연결시켜주기 위해서 `TypeOrmModule` 의 옵션을 설정하였습니다.

`$ yarn start dev`를 입력해서 서버를 실행시켜 주세요.

![스크린샷 2021-12-29 오후 3.42.30.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-29_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.42.30.png)

정상적으로 실행되었고 다음과 같이 **log가 콘솔창에 나왔**다면, **mysql과 정상적으로 연결이 된 것입니다.**

![image (1).png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/image_(1).png)

![image.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/image.png)

![스크린샷 2021-12-30 오전 11.22.48.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.22.48.png)

터미널에 mysql -u root -p를 입력하고 root 사용자의 비밀번호를 입력해 로컬에 실행 중인 mysql을 열어 생성된 데이터베이스를 확인해 주세요.

![스크린샷 2021-12-29 오후 3.42.57.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-29_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.42.57.png)

schema.gql 파일에 resolver에 지정한 반환값의 타입이 자동으로 기록됩니다.

![스크린샷 2021-12-29 오후 3.49.55.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-29_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.49.55.png)

[http://localhost:3000/graphql](http://localhost:3000/graphql)에 접속해서 다음과 같은 화면이 나온다면 성공입니다.

---

# Board CRUD API

## FetchBoards

먼저 class 폴더 안에 13-03-graphql-api-fetchBoards 폴더를 만들어 주세요.

13-03-graphql-api-fetchBoards 폴더 안에 13-02-graphql-api 파일을 모두 붙여 넣어 주세요.

`yarn install`를 입력해 필요한 모듈을 모두 설치해 주세요.

이전에는 fetchBoards을 사용해 게시판을 조회했을 때는 '조회에 성공하였습니다.'라는 문자열을 반환합니다.

이번에는 작성한 Board.entity 형식에 맞게 반환하는 API로 수정하겠습니다.

반환값이 문자열이 아니라, Board 객체를 주어야 하는데 Board는 string처럼 기본으로 있는 타입이 아니므로 직접 만들어줘야 합니다. 앞서 설명했듯이 코드 우선(code first) 와 스키마 우선(schema first) 방법 두 가지가 있는데 최신 방법인 코드 우선(code first)을 사용하겠습니다.

```tsx
//board.entity.ts

import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // typeorm한테 알려줌
@ObjectType() // gql한테 알려줌
export class Board {
  @PrimaryGeneratedColumn()
  @Field(() => ID) // gql한테 알려줌
  id: number;
	
	@Column()
  @Field(() => String)  // gql한테 알려줌
  writer: string;

  @Column()
  @Field(() => String)  // gql한테 알려줌
  title: string;

  @Column()
  @Field(() => String)  // gql한테 알려줌
  contents: string;
}
```

entities 폴더 안에 `Board.entity.ts` 파일을 다음과 같이 수정해주세요.

`Board` 클래스 위에 `@ObjectType()` 데코레이터를 추가합니다. 

```tsx
//board.resolver.ts

import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board]) //graphql에게 타입을 알려준다
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(): string {
    return this.boardService.create();
  }
}
```

fetchBoards의 반환값을 여러 개의 Board 객체를 주는 것으로 수정해 보겠습니다.

여러 개의 객체를 담기 위해서 배열로 지정했습니다.

```tsx
//board.service.ts

import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  findAll(): Board[] {
    // 데이터 조회하는 로직

    // return '조회에 성공하였습니다.'
    return [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다~~~',
        contents: '내용이에요!!!',
      },
      {
        number: 2,
        writer: '영희',
        title: '좋은 날씨입니다!',
        contents: '내용@@@@@',
      },
      {
        number: 3,
        writer: '훈이',
        title: '점심 맛있게 드셨나요?!',
        contents: '식사 하셨나요?!',
      },
      {
        number: 4,
        writer: '맹구',
        title: '안녕하세요?!',
        contents: '내용이요!!!',
      },
    ];
  }

  create(): string {
    // 데이터 등록하는 로직

    return '등록에 성공하였습니다.';
  }
}
```

findAll()비즈니스 로직의 반환 값을 다음과 같이 수정해주세요.

배열 안에 객체 형태이며, 이전에 entity에 지정해 놓은 value의 타입에 맞게 수정해주세요. 

`$ yarn start dev`를 입력해서 서버를 실행시켜 주세요.

![스크린샷 2021-12-30 오후 3.12.46.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.12.46.png)

[http://localhost:3000/graphql](http://localhost:3000/graphql)에 접속해서 다음과 같은 화면이 나온다면 성공입니다.

## CreateBoards-01

먼저 class 폴더 안에 13-04-graphql-api-createBoard 폴더를 만들어 주세요.

13-04-graphql-api-createBoard 폴더 안에 13-03-graphql-api-fetchBoards 파일을 모두 붙여 넣어 주세요.

`Board.service.ts` 파일의 create 객체 메서드는 **단순히 '성공!!'이라는 문자열을 리턴**해주고 있습니다.

`Board.resolver.ts`파일의 createBoard 객체 메서드는 **string을 반환 타입**으로 정의하고 있습니다. 

이번에는 createBoard에서 Args 개별로 받아서 등록에 성공하였다는 메시지를 받아보게 수정해 보겠습니다.

```tsx
//board.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => Board)
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    @Args('writer') writer: string, 
    @Args('title') title: string,
    @Args('contents') contents: string,
  ): string {
    return this.boardService.create({ writer, title, contents });
  }
}
```

`@Args` 는 데코레이터로 '@nestjs/graphql'에서 import해 사용하는데 gql에 arguments라고 알려줍니다.

반환 메시지는 String 타입으로 반환되기 때문에 변경하지 않았습니다.

```tsx
@Args('writer') writer: string, 
@Args('title') title: string,
@Args('contents') contents: string,
```

`@Arg()` 데코레이터를 사용해서 객체 value 값의 타입을 지정했습니다.

`@Arg()` 안은 gql 타입이고, 그 뒤는 타입스크립트의 타입을 의미합니다. 

```tsx
//board.service.ts

import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  findAll(): Board[] {
    // 데이터 조회하는 로직

    // return '조회에 성공하였습니다.'
    return [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다~~~',
        contents: '내용이에요!!!',
      },
      {
        number: 2,
        writer: '영희',
        title: '좋은 날씨입니다!',
        contents: '내용@@@@@',
      },
      {
        number: 3,
        writer: '훈이',
        title: '점심 맛있게 드셨나요?!',
        contents: '식사 하셨나요?!',
      },
      {
        number: 4,
        writer: '맹구',
        title: '안녕하세요?!',
        contents: '내용이요!!!',
      },
    ];
  }

  create(args): string {
    // 데이터 등록하는 로직

    console.log('입력값들: ', args);

    return '등록에 성공하였습니다.';
  }
}
```

create 메서드의 파라미터 `args`를 받고 실제 데이터베이스에 저장은 하지 않고 콘솔 창에 입력된 객체를 확인합니다.

`$ yarn start dev`를 입력해서 서버를 실행시켜 주세요.

![스크린샷 2021-12-30 오후 4.01.48.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.01.48.png)

![스크린샷 2021-12-30 오후 4.04.26.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.04.26.png)

[http://localhost:3000/graphql](http://localhost:3000/graphql)에 접속해서 다음과 같은 화면이 나온다면 성공입니다.

![스크린샷 2021-12-30 오후 4.10.53.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.10.53.png)

콘솔 창에 platyground에서 입력값이 객체 형식으로 잘 출력됩니다.

## CreateBoards-02

먼저 class 폴더 안에 13-05-graphql-api-createBoard-with-dto 폴더를 만들어 주세요.

13-05-graphql-api-createBoard-with-dto 폴더 안에 13-04-graphql-api-createBoard 파일을 모두 붙여 넣어 주세요.

이번에는 인자를 다른 방식으로 받아보겠습니다. 방금 만든 API에서는 writer,title,contents 각각을 하나씩 하나씩 전달받았습니다. 그런데, 지금은 두개지만 더 복잡하고 많은 입력을 받아야한다면 이 방식은 효율적이지 않습니다. 

그래서 객체로 묶어서 전달받는 방식으로 변경해보겠습니다. 

**Board.entity.ts** 파일에서 Board 클래스를 `@ObjectType()` 을 이용해서 만든것처럼 InputType을 만들어줘야합니다. 

src/board 폴더에 `dto` 폴더를 생성합니다. 그리고 `createBoard.input.ts` 파일을 생성합니다.

![Untitled](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/Untitled%207.png)

<aside>
💡 DTO (data transfer object) : 데이터 전송 객체. 즉, 네트워크 간에 데이터를 어떤 식으로 보낼지를 정의한 객체입니다.

</aside>

```tsx
// createBoard.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
```

`@InputType()`를 사용하여 gql에게 이건 InputType이라고 알려줍니다. 

```tsx
//board.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => Board)
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardService.create({ createBoardInput });
  }
}
```

매개변수 전체를 `createBoard.input.ts`의 타입과 비교합니다.

![스크린샷 2021-12-30 오후 4.40.18.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.40.18.png)

![스크린샷 2021-12-30 오후 4.39.54.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.39.54.png)

[http://localhost:3000/graphql](http://localhost:3000/graphql)에 접속해서 다음과 같은 화면이 나온다면 성공입니다.

![스크린샷 2021-12-30 오후 4.43.30.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.43.30.png)

콘솔 창에 playground에서 입력값이 객체 형식으로 잘 출력됩니다.

---

# Docker Packaging

## graphql-docker-compose(Conneted with local Mysql)

먼저 class 폴더 안에 13-06-nestjs-with-graphql-docker-compose 폴더를 만들어 주세요.

13-06-nestjs-with-graphql-docker-compose 폴더 안에 13-05-graphql-api-createBoard-with-dto 파일을 모두 붙여 넣어 주세요.

이전에 MongoDB와 NodeJS 서버를 docker container에서 실행해 봤던 거 기억하시죠?

이번에는 NestJS 서버를 docker container에서 실행시키고 local에서 실행 중인 Mysql과 연결시켜보겠습니다.

`DockerFile`은 다음과 같습니다. Day08에서의 `DockerFile` 과 동일합니다. 

```docker
FROM node:16

WORKDIR /my_backend/
COPY ./package.json /my_backend/
COPY ./yarn.lock /my_backend/
RUN yarn install

COPY . /my_backend/
CMD node index.js
```

`docker-compose.yaml` 은 다음과 같습니다. 

```yaml
version: '3.3'

services: 
    my_backend:
        build: 
            context: .
            dockerfile: Dockerfile
        volumes: 
            - ./src:/my_backend/src
        ports: 
            - 3000:3000
```

Day08에서의 `docker-compose.yaml` 과 모두 동일하지만 `volumes`가 옵션이 추가되었습니다.

`volumes` 는 **./src에 경로에 있는 파일**과 **docker의 my_backend/src의 파일**이 서로 다르면 **새롭게 images를 빌드 하는 옵션입니다.**

이제 `docker-compose build`를 입력해 image를 빌드해 주시고 `docker-compose up`을 입력해 container를 실행시켜주세요.

![스크린샷 2021-12-31 오전 11.16.37.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-31_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.16.37.png)

![스크린샷 2021-12-31 오전 11.16.54.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-31_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.16.54.png)

그런데 서버는 잘 실행됐지만 NestJS가 database를 연결하지 못하고 있습니다.

NestJS에서는 database를 Container 환경을 구성해야지만 연결이 가능합니다. local에 있는 database를 연결할 수 없습니다.

## graphql-docker-compose

먼저 class 폴더 안에 13-07-nestjs-with-graphql-typeorm-mysql 폴더를 만들어 주세요.

13-07-nestjs-with-graphql-typeorm-mysql 폴더 안에 13-06-nestjs-with-graphql-docker-compose 파일을 모두 붙여 넣어 주세요.

`.docker-compose.yaml`파일을 다음과 같이 수정해주세요.

```yaml
version: '3.3'

services: 
    my_backend:
        build: 
            context: .
            dockerfile: Dockerfile
        volumes: 
            - ./src:/my_backend/src
        ports: 
            - 3000:3000

    my_database: 
        platform: linux/x86_64
        image: mysql:latest
        environment:
            MYSQL_ROOT_PASSWORD: 'root'
        command:
            - --character-set-server=utf8mb4
            - --collation-server=utf8mb4_unicode_ci
            - --skip-character-set-client-handshake
        cap_add:
            - SYS_NICE
        ports: 
            - 3306:3306
```

`my_database`는 데이터 베이스를 구성하는 부분입니다. 

**emviroment 부분은 mysql 설정하는  부분입니다.**

**command는 데이터베이스 생성하는 부분입니다.**

`app.module.ts`의 host와 password를 다음과 같이 변경해 주세요. docker container의 데이터 베이스와 연결시켜주기 위해서입니다.

```tsx
//app.module.ts

import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/board/board.module';
import { Board } from './apis/board/entities/board.entity';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mysql',
      entities: [Board],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
```

![스크린샷 2022-01-22 오후 4.08.37.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.08.37.png)

docker-packaging 전에 local mysql 서버를 종료시켜 주세요. 

`.yaml`파일에 이미 3306을 사용하게 해 놓았기 때문입니다!

![스크린샷 2022-01-22 오후 4.13.06.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.13.06.png)

`docker-compose build`를 입력해 서버, 데이터베이스 image를 생성해 주세요.

![스크린샷 2022-01-22 오후 4.12.28.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.12.28.png)

`docker-compose up` 를 입력해 container를 실행시켜 주세요.

![스크린샷 2021-12-30 오후 4.40.18.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.40.18.png)

![스크린샷 2021-12-30 오후 4.39.54.png](BE%20Day13%20MySQL%20with%20NestJS%203cfbaf9075cd4a74bd932f63689c7e58/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.39.54.png)

[http://localhost:3000/graphql](http://localhost:3000/graphql)에 접속해서 다음과 같은 화면이 나온다면 **Nest-JS와 Mysql의 docker 패키징 성공입니다!**