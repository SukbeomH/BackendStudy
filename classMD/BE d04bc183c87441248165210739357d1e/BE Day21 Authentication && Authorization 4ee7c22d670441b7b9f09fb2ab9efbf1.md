# BE Day21 Authentication && Authorization

**목차**

  

---

# 암호화

이번에는 비밀번호를 암호화 작업을 해보겠습니다. **통상적으로 암호화는 회원 가입 시 유저의 비밀번호를 암호화해서 데이터베이스에 저장해야 합니다.** 만약 비밀번호를 암호화하지 않고 비밀번호가 저장되었고 데이터베이스가 노출되었다면 타인이 유저의 계정을 이용하는 최악의 상황이 발생합니다. **즉 최악의 상황에서도 기밀성을 유지하기 위해서 암호화는 필수적입니다.**

## 정의

암호화를 구성하는 요소들을 다음과 같이 정의해보았습니다.

- 평문(Plaintext) : 해독 가능한 형태의 메시지(암호화전 메시지)
- 암호문(Cipertext) : 해독 불가능한 형태의 메시지(암호화된 메시지
- 암호화(Encryption) : 평문을 암호문으로 변환하는 과정
- 복호화(Decryption) : 암호문을 평문으로 변환하는 과정

## 암호화의 종류

암호화의 종류는 여러 가지가 있습니다. 크게 두 가지를 소개해 드리겠습니다.

둘 다 암호화 기법이지만 **Hash는 단방향 암호화 기법**이고 **Encryption은 양방향 암호화 기법입니다.**

- 양방향암호화 : 암호화와 복호화과정을 통해 송.수신간 주고받는 메시지를 안전하게 암.복호화하는 과정
- 단방향암호화 : 해싱(Hashing)을 이용한 암호화 방식으로 양방향과는 다른 개념으로, 평문을 암호문으로 암호화는 가능하지만 암호문을 평문으로 복호화 하는 것은 불가능.

즉 Hash는 평문을 암호화된 문장(텍스트)으로 만들어주고 Encryption은 평문을 암호화된 문장(텍스트)로 만들어주는 기능을 하고 + 암호화된 문장을 다시 평문으로 만드는 복호화 기능도 합니다.

## **Hash(단방향 암호화)**

우리는 Hash(단방향 암호화)를 사용할 것이니 좀 더 Hash에 대해서 알아보겠습니다.

단방향 해시 함수는 어떤 수학적 연산(또는 알고리즘)에 의해 원본 데이터를 매핑시켜 완전히 다른 암호화된 데이터로 변환시키는 것을 의미한다. 이 변환을 해시라고 하며, 해시에 의해 암호화된 데이터를 **다이제스트(digest)**라고 합니다.

또한 앞서 말했듯 해싱은 단방향입니다. 한마디로 단방향 해시 함수는 다이제스트를 복호화, 즉 원본 데이터를 구할 수는 없어야 합니다. 말 그대로 단방향성입니다.

![스크린샷 2022-01-19 오후 1.09.06.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.09.06.png)

그림을 보면서 이해해보겠습니다.

 `Password` **123456 을 해시 함수에 돌려서 다이제스트인 fs32a3xzz0 을 생성하고 해당 데이터를 DB 에 저장합니다.**

DB에 **저장된 다이제스트가 설령 DB가 누출된다 하더라도 fs32a3xzz0 은 단방향으로 해싱 된 문자라 복호화 할 수가 없습니다.**

단방향 해시 함수의 종류

- SHA
- MD
- HAS
- WHIRLPOOL

그중 가장 대표적인 해시 알고리즘인 SHA-256 을 통해 **123456 을 해싱하면 다음과 같이 나옵니다.**

**8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92**

만약 조금만 변경하여 123456 다음에 마침표(.) 하나만 더 찍어도 완전히 다른 값이 나옵니다.

**43fae6c11d7632acc6059de1cced9b09a58caaa878071308ad67f32ef6b11691**

## **Key Stretching & Salt**

단순히 해시 함수를 이용해서 변환만 한다고 해서 보안이 완벽에 가깝다고 말할 수 없습니다. 

**이런 점을 보안하기 위해 생겨난 방법이 키-스트레칭과 솔트 입니다.**

### 1. **Key Stretching**

패스워드를 저장할 때 가장 쉽게 생각 할 수 있는 방법입니다.

![스크린샷 2022-01-19 오후 3.50.05.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.50.05.png)

예를들어 SHA-256 을 사용한다고 가정할 때, 123456 이 입력되었다면 123456 의 다이제스트는 아래와 같습니다.

`8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92`

이 다이제스트를 한 번 더 SHA-256 에 돌리면 아래와 같습니다.

`49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c`

즉  키-스트레칭은 개발자가 횟수를 정해서 Hash 함수를 돌리는 방법입니다.

그러나 Hash 함수를 여러 번 돌리는 만큼 최종 다이제스트를 얻는데 그만큼 시간이 소요되기 때문에 속도 면에서 분리합니다.

### 2. Salt

여러번 해시 함수를 돌리더라도 결국 몇 번 돌렸는지 횟수만 알게된다면, **공격하는 입장에서 상징성 있는 대표 문자열들을 추려보면 충분히 공격이 가능합니다. 또 같은 비밀번호를 사용하는 사용자들이 있다면 하나의 결과를 갖고도 다수 사용자의 password 를 알아낼수 있습니다. 이를 방지하기 위해 도입한 것이 바로 솔트입니다.**

Salt(솔트)란 해시함수를 돌리기 전에 원문에 임의의 문자열을 덧붙이는 것을 말합니다. **의미 그대로 원문에 임의의 문자열을 붙이는 의미의 소금친다(Salting)이라고 생각하면 됩니다.**

![스크린샷 2022-01-19 오후 4.18.12.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.18.12.png)

**이렇게 하면 다이제스트를 알아낸다 하더라도 password 를 알아내기 더욱 어려워지며, 사용자마다 다른 Salt 를 사용한다면 설령 같은 비밀번호더라도 다이제스트의 값은 달라집니다. 이는 결국 한 명의 패스워드가 유출되더라도 같은 비밀번호를 사용하는 다른 사용자는 비교적 안전하다는 의미이기도 합니다.**

## Bcrypt

이제 npm에 등록되어 있는 암호화 모듈인 `Bcrypt`라는 암호 해싱 기능을 이용하여 데이터베이스에 암호화된 비밀번호 저장해 보겠습니다.

[bcrypt](https://www.npmjs.com/package/bcrypt)

class 폴더 안에 20-01-signup-bcrypt 폴더를 만들어 주세요.

20-01-signup-bcrypt 폴더 안에 19-03-signup파일을 모두 붙여 넣어 주세요.

터미널에 `yarn add bcrypt`를 입력해 모듈을 추가 설치해 주세요.

`./src/apis/user/user.resolver.ts` 를 수정하겠습니다.

```tsx
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    return this.userService.craete({ email, hashedPassword, name, age });
  }
}
```

설치한 `bcrypt` 모듈을 불러와 주세요.  

`import * as bcrypt from 'bcrypt';` 는 as를 사용해서 `bcrypt` 모듈의 모든 메서드를 사용할 수 있게 해주었습니다.

bcrypt.hash(password, 10)를 사용해서 비밀번호를 암호화하는데 **hash 메서드의 두 번째 인자는 salt입니다.**

`./src/apis/user/user.service.ts` 를 수정하겠습니다.

```tsx
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async craete({ email, hashedPassword, name, age }) {
    const password = hashedPassword;
    return await this.userRepository.save({ email, password, name, age });
  }
}
```

**create 메서드를 다음과 같이 수정해 주세요!**

![스크린샷 2022-01-20 오후 4.43.44.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.43.44.png)

`$yarn start:dev`를 입력해서 서버를 실행시켜 주세요.

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

![스크린샷 2022-01-17 오후 4.13.29.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.13.29.png)

 `createUser` 에 요청을 보내 유저 정보를 생성하겠습니다.

DBeaver를 실행시켜 유저정보가 잘 저장되었는지, 유저의 password가 잘 암호화되었는지 확인하겠습니다.

![스크린샷 2022-01-19 오후 4.34.36.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-19_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.34.36.png)

 잘 저장되었습니다!!

# Create User

사용자가 로그인을 위한 API를 설계해 보겠습니다.

class 폴더 안에 20-02-login 폴더를 만들어 주세요.

20-02-login 폴더 안에 20-01-signup-bcrypt파일을 모두 붙여 넣어 주세요.

로그인을 위한 API는 `auth` 폴더에서 관리하겠습니다. 

`./src/apis/auth` 에 auth 폴더를 만들어주세요.

이번에는 회원가입과 동시에 사용자 인가를 해줄수 있게 토큰을 발행하는 토큰 기반 인증 시스템을 적용하겠습니다.

## 토큰 기반 인증 시스템

토큰 기반 인증은 최근의 웹서비스에서 아주 많이 사용되고 있습니다. 토큰 기반 인증 시스템은 어떻게 작동되고, 무슨 장점을 가지고 있으며, 왜 나타나게 된걸까요? 이를 이해하기 위해 먼저 기존의 서버 기반 시스템에 대해 알아보겟습니다.

### 서버 기반 인증 시스템

기존의 서버 기반 인증 시스템은 **서버측에서 유저들의 정보를 기억**하고 있어야 했다. 따라서 여러가지 문제점이 발생했습니다.

- 서버가 유저의 인증 기록을 **세션**에 저장하는데, 로그인 유저가 많아지면 **서버가 과부하됩니다.**
- 세션을 사용하면 분산된 시스템을 설계하고 **서버를 확장하는 것이 어렵습니다.**
- 세션을 관리할 때 사용되는 쿠키는 **여러 도메인에서 관리하는 것이 번거롭습니다**.

이런 문제점들을 해결하기 위해 토큰 기반 인증 시스템을 사용하기 시작했습니다.

### 토큰 기반 인증 시스템의 장점

**무상태(Stateless) & 확장성(SCalability)**

Stateful Server의 경우 클라이언트에게 요청을 받을때마다 상태를 유지하고 정보를 서비스 제공에 이용됩니다. 반면 Stateless Server에서는 **상태정보를 저장하지 않고**, **서버는 클라이언트의 요청만으로 작업을 처리**하며 세션을 사용하지 않습니다. 따라서 토큰을 사용하면 클라이언트와 서버의 연결고리가 없어 **서버를 확장하기에 매우 적합**한 환경을 제공합니다.

**보안성**

클라이언트가 서버에 요청을 보낼때 더이상 쿠키를 보내지 않으므로 취약점이 사라집니다.

확**장성(Extensibility)**

서버를 확장시키는 것 뿐 아니라 **로그인 정보가 사용되는 분야를 확장**할 수 있습니다. 우리가 Google 계정을 이용해 Notion, Slack등을 이용하는 것처럼 토큰에 선택적인 권한을 부여해서 발급할 수 있습니다.

**시스템 작동 원리**

대략적인 토큰 기반 인증 시스템의 구현 방식은 다음과 같습니다.

![스크린샷 2022-01-24 오후 1.18.30.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-24_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.18.30.png)

1. 유저가 아이디와 비밀번호로 로그인을 합니다.
2. 서버측에서 해당 계정 정보를 검증합니다.
3. 계정 정보가 정확하다면, 서버측에서 유저에게 signed 토큰을 발급해줍니다.
4. 클라이언트 측에서 전달받은 토큰을 저장해두고, 서버에 요청을 할 때 마다 해당 토큰을 함께 서버에 전달합니다.
5. 서버는 토큰을 검증하고, 요청에 응답합니다.

💡 이러한 토큰 기반 인증 시스템의 구현체가 바로 **Json Web Token** 입니다.

### Json Web Token

JWT는 웹표준으로서 C, Java, Python, JS등 대부분의 **주류 프로그래밍 언어에서 지원됩니다**. 또한 필요한 모든 정보를 자체적으로 가지고 있어 **자가 수용적(Self-contained)**이며 그렇기에 두 개체 사이에서 **쉽게 전달될 수 있는** 장점들을 가지고 있습니다.

![스크린샷 2022-01-25 오전 9.41.21.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_9.41.21.png)

JWT는 `.`으로 구분되는 **Header, Payload, Signature**의 3가지 문자열로 되어있습니다.

- **Header**

Header는 **토큰의 타입**과 **해싱 알고리즘**이라는 두가지 정보를 담고 있습니다

```
{"alg":"HS256","typ":"JWT"}
```

보통 해싱 알고리즘은 `HS256`을 사용하지만 `HS512`을 이용해 토큰을 더 길게 만들수 있습니다.

- **Payload**

Payload에는 토큰에 담을 정보가 들어가며, 담는 정보의 한 조각은 **name/value의 한 쌍으로 이루어진 Claim**이라고 부른다. Claim은 **Registered, Public, Private**의 세 분류로 나뉘어져 있다. **Registered Claim**은 토큰 발급자, 토큰 제목, 토큰 만료시간, 토큰 발급시간 등 토큰에 대한 정보를 담기 위해 이미 이름이 정해진 Claim 입니다.

- **Signature**

JWT의 마지막 부분은 서명으로, **Header의 인코딩값과 Payload의 인코딩값을 합친 후 주어진 비밀키로 해싱**하여 생성합니다

## Create JWT

class 폴더 안에 20-02-login 폴더를 만들어 주세요.

20-02-login 폴더 안에 20-01-signup-bcrypt파일을 모두 붙여 넣어 주세요.

이번에는 본격적으로 사용자 인가를 해줄 토큰을 발행해 주겠습니다.

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

`yarn add jsonwebtoken` 을 입력해 jwt 모듈을 설치해주세요.

`./src/apis/`에 auth 폴더를 만들어 주세요. 

로그인을 통한 토큰 발행은 auth 폴더에서 진행하겠습니다.

`./src/apis/auth/auth.module.ts` 에 `auth.module.ts`파일을 만들어주세요.

```tsx
//auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthResolver, //
    AuthService,
    UserService,
  ],
})
export class AuthModule {}
```

`auth.module`를 다음과 같이 작성해 주세요.

`./src/apis/auth/auth.resolver.ts` 에 `auth.resolver.ts`파일을 만들어주세요.

```tsx
//auth.resolver.ts

import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, 
    @Args('password') password: string,
  ) {
    const user = await this.userService.findOne({ email });
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) throw new UnauthorizedException();

    const accessToken = this.authService.getAccessToken({ user });
    return accessToken;
  }
}
```

`login` 이라는 라우팅을 핸들링할 함수를 하나 만들어 주세요.

라우팅을 핸들링할때 사용할 **AuthService와 UserService를 의존성 주입을 해주었습니다.** 

**@Args() 데코레이터를 사용해서 필요한 데이터를 지정했습니다.**

해당하는 **유저를 찾기 위해서 findOne을 사용해서 유저를 조회했습니다.**

조회한 유저의 정보를 갖고 와서 이전에 **bcrypt를 사용해서 암호화해서 저장한 비밀번호와 요청된 비밀번호가 일치하는지 확인하기 위해서 bcrypt의 compare 메서드를 사용해서 검사했으며 만약 일치하지 않으면 에러를 반환합니다.**

`authService`를 사용해 **발행한 토큰을 다시 클라이언트에게 응답해 줍니다.**

`./src/apis/auth/auth.service.ts` 에 `auth.service.ts`파일을 만들어주세요.

```tsx
//auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccesskey', expiresIn: '1h' },
    );
    return accessToken;
  }
}
```

다음과 같이 jwt 모듈을 import 해주시고 **JwtService를 의존성 주입해 주세요.**

`getAccessToken`이라는 **비즈니스 로직을 만들어주세요.**

JwtService에 **sign 메서드를 사용해 토큰을 발급해 줄 겁니다. sign 메서드는 다음과 같습니다.**

![스크린샷 2022-01-25 오전 10.14.36.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.14.36.png)

다음과 같이 인자를 갖는데 여기서 **json data는 이전에 설명했듯이 유저의 정보를 담음 payload를 의미합니다.**

**sercretKey는 해싱 알고리즘이 들어가는데 기본적으로 HS256 해싱 알고리즘을 사용합니다.**

**option은 토큰 유효기간 밑 발행자를 지정할 수 있습니다.**

마지막으로 acessToken이라는 변수에 담아서 **발행한 토큰을 전달해 주세요.**

![스크린샷 2022-01-20 오후 4.43.44.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.43.44.png)

`$yarn start:dev`를 입력해서 서버를 실행시켜 주세요.

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

![스크린샷 2022-01-25 오전 10.39.54.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.39.54.png)

이전에 만들어 놓았던 `createUser` 를 사용해서 사용자를 생성해 주세요.

![스크린샷 2022-01-25 오전 10.41.45.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.41.45.png)

`login` 을 사용해서 유저의 email과 password를 입력해서 인가에 필요한 토큰을 발행 받았습니다.

# Authorization

이제 부터 본격적으로 JWT 토큰을 사용해보겠습니다. 전제적인 Flow Chart는 다음과 같습니다.

![스크린샷 2022-01-25 오후 4.24.51.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-25_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.24.51.png)

사용자의 인증이 필요한 경우 Client는 발급받은 JWT를 Requet Header에 실어 같이 보내줍니다. Backend는 JWT를 받고 Guard를 통해 JWT Strategy를 실행하고, Secret Key를 통해 JWT를 Decoding합니다. JWT를 복호화한 후에 원하는 API의 Business Logic이 수행된 후 Response 됩니다.

## Passport module

Passport는 인기있는 node.js 인증 라이브러리로서 자격증명(JWT, 사용자 이름/암호)을 확인하여 사용자를 인증하고, 인증 상태를 관리하고, 인증된 사용자에 대한 정보를 Route Handler에서 사용할 수 있도록 Request 객체에 첨부해줍니다.

[passport](https://www.npmjs.com/package/passport)

## Login-인증

class 폴더 안에 20-03-login-auth 폴더를 만들어 주세요.

20-03-login-auth 폴더 안에 20-02-login파일을 모두 붙여 넣어 주세요.

./src/common/auth 폴더를 만들어주세요. 여기에 토큰을 인증해 줄 **Guard를 제작할 겁니다**.

`.src/common/auth`에 jwt-access.strategy.ts 를 만들어주세요.

```tsx
//jwt-access.strategy.ts

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccesskey',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
```

`JwtAccessStrategy` 에 `PassportStrtegy`을 상속합니다.

super를 사용하여 부모클래스의 생성자함수를 호출하여 JWT 옵션값을 넘겨줍니다.

`jwtFromRequest`를 통해 Header의 Token으로부터 JWT를 추출해줍니다.

secretOrKey는 이전에 토큰을 발행했던 secretKey와 동일하게 적어주어야 토큰의 `payload`의 정보를 뽑아옵니다.

 `validate`는 `payload`를 열어서 사용자의 정보를 반환해줍니다.

`.src/common/auth`에 gql-auth.guard.ts 를 만들어주세요.

```tsx
//gql-auth.guard.ts

import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
```

다음과 같이 gql-auth.guard.ts에 작성해 주세요. 

**GraphQL에서 guard를 사용하기 위해서는 한 단계 더 거쳐야 합니다. 즉 GraphQL에서는 @UserGuards(’acess’)를 사용할 수 없습니다. 반대로 rest-api에서는 사용할 수 있습니다.**

```tsx
//user.resolver.ts

import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ email, hashedPassword, name, age });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser() {
    return "인증 통과!!"
  }
}
```

user.resolver.ts에 fetchUser를 추가해 주세요. 

**@UserGuards(GqlAuthAccessGuard)를 사용해**서 인증을 해줄 **guard를 데코레이터 형식으로 추가했습니다.**

💡이전에 데코레이터의 동작 방식 기억하시죠 기억이 나지 않는다면 다시 찾아보시기 바랍니다.

![스크린샷 2022-01-20 오후 4.43.44.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.43.44.png)

`$yarn start:dev`를 입력해서 서버를 실행시켜 주세요.

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

![스크린샷 2022-01-26 오후 5.47.45.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-26_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.47.45.png)

먼저 로그인을 해야합니다. 로그인을 하고 발행된 토큰을 복사해주세요.

![스크린샷 2022-01-26 오후 5.47.31.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-26_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.47.31.png)

위의 사진과 같이 HTTP Headers라는 부분을 graphql playground는 제공합니다.따라서 해당 부분에 **jwt를 통해서 받은 token정보를 실어서 보내주면됩니다.**

```
{"Authorization":"Bearer 토큰정보"}
```

**양식의 경우에는 다음과 같은 형식으로 담아 보냅니다.**

인증 통과가 되었다면 성공입니다!!

# Param Decorator

이번에는 요청된 토큰으로 인증을 받은 유저의 정보를 받아오기 위해서 커스텀으로 데코 레이터를 제작해 보겠습니다.

class 폴더 안에 20-04-login-auth-param 폴더를 만들어 주세요.

20-04-login-auth-param 폴더 안에 20-03-login-auth파일을 모두 붙여 넣어 주세요.

`.src/common/auth`에 gql-user.param.ts 를 만들어주세요.

```tsx
//gql-user.param.ts 

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  id: string;
  email: string;
}
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
```

다음과 같이 gql-user.param.ts 에 작성해주세요. 

```tsx
//user.resolver.ts

import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ email, hashedPassword, name, age });
  }

@UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    console.log('currentUser', currentUser);
    return await this.userService.findOne({ email: currentUser.email });
  }
}
```

함수안 매개변수 넣는 곳에 상위에서 제작해 놓은 데코레이터를 넣어주세요. 

```tsx
    @CurrentUser() currentUser: ICurrentUser
```

![스크린샷 2022-01-20 오후 4.43.44.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.43.44.png)

`$yarn start:dev`를 입력해서 서버를 실행시켜 주세요.

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

![스크린샷 2022-01-26 오후 6.23.42.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-26_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.23.42.png)

먼저 로그인을 해야합니다. 로그인을 하고 발행된 토큰을 복사해주세요.

![스크린샷 2022-01-26 오후 6.23.29.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-26_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.23.29.png)

위의 사진과 같이 HTTP Headers라는 부분을 graphql playground는 제공합니다. 따라서 해당 부분에 **jwt를 통해서 받은 token 정보를 실어서 보내주시면 해당하는 토큰의 유저 정보를 모두 받아 올수 있습니다.**