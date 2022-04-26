# BE Day22 Access Token, Refresh Token / Google Login

**목차**

  

---

# Refresh Token?

로그인 요청을 하고 나서, 서버에서 토큰을 프론트에게 넘겨줄 때, 토큰을 하나 더 만들어서 넘겨줍니다. 하나 더 만든 토큰을 `refresh token`이라고 하고 기존에 발행하던 토큰을 `access token`이라고 합니다.

`refresh token`은 `access token`이 만료되었을 때, `access token`을 다시 발행하기 위한 용도로 쓸것이기 때문에 `access token`보다 유효기간이 길어야 합니다.

## Why Refresh Token?

**`Access Token(JWT)`**를 통한 인증 방식의 문제는 해킹을 당했을 경우 보안에 취약하다는 점이 있습니다.

유효기간이 짧은 토큰의 경우 그만큼 사용자는 로그인을 자주 해서 새롭게 토큰을 발급 받아야 하므로 불편합니다.

그렇다고 유효기간을 늘리면 토큰을 해킹당했을 때 보안에 더 취약해지게 됩니다.

이러한 점들을 보완하는 것이 **`Refresh Token`**입니다.

- refresh token은 access token과 같은 형태의 JWT입니다. refresh token은 처음에 로그인을 완료 했을 때 access token과 동시에 발급됩니다. access token보다 긴 유효기간을 가지면서 access token이 만료되었을 때 새로 발급해 주는 열쇠가 됩니다.
- access token이 해킹 당하면 정보가 유출됩니다. 하지만 유효기간을 짧게 해두면 그 기간 안에서만 사용이 가능하기 때문에 더 안전하다는 의미가 됩니다.
- refresh token의 유효기간이 만료되면, 사용자는 새로 로그인 해야 합니다. refresh token도 해킹될 가능성이 있기 때문에 적절한 유효기간 설정이 필요합니다.

## Access Token & Refresh Token Authorization Process

![스크린샷 2022-01-28 오후 12.48.42.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.48.42.png)

1) 사용자가 로그인을 한다.

2) 서버에서 사용자가 입력한 id, pw를 회원 DB에서 값을 비교한다.

3) 로그인이 완료되면 Access token, Refresh token을 발급한다.

4) 만료된 토큰이 있는 쿠키와 함께 요청을 보낸다.

5) 서버가 토큰이 만료되었음을 확인하고 에러를 반환한다.

6) 토큰이 만료되었음을 확인하고 토큰 재발급 요청을 만료된 토큰과 쿠키와 함께 요청을 보낸다.

7) 쿠키에 refreshToken을 확인해 토큰을 재발급해서 반환한다.

8) 재발급된 토큰과 쿠키를 이전에 실패한 요청에 재요청을 보낸다.

9) 정상적으로 요청에 대한 값을 반환한다.

> Access token 만료가 될 때마다 계속 과정 4~7 과정을 거칠 필요가 없습니다. 프론트에서 Access token의 payload를 통해 유효기간을 알 수 있으며, 프론트단에서 API요청 전에 토큰이 만료 됐다면 바로 재발급 요청을 할 수 도있습니다.
> 

# **Web Storage**

Web Storage란 HTML5부터 제공하는 기능으로, 해당 도메인과 관련된 특정 데이터를 서버가 아니라 클라이언트 웹브라우저에 저장할 수 있도록 제공하는 기능입니다.

쿠키(cookie)와 비슷한 기능이며, Web Storage의 개념은 키/값 쌍으로 데이터를 저장하고, 키를 기반으로 데이터를 조회하는 패턴입니다.

영구저장소(LocalStorage)와 임시저장소(SessionStorage)를 따로 두어 데이터의 지속성을 구분할 수 있어 응용 환경에 맞는 선택이 가능하다.

Web Storage는 쿠키와 마찬가지로 사이트의 도메인 단위로 접근이 제한된다. 예를 들면, A도메인에서 저장한 데이터는 B도메인에서 조회할 수 없다. 이는 데이터의 보안 측면에서 당연합니다.

## Features of Web Storage

### 1. 서버 전송이 없다.

저장된 데이터가 클라이언트에 존재할 뿐 서버로 전송은 이루어 지지 않는다. 이는 네트워크 트래픽 비용을 줄여줍니다.

### 2. 단순 문자열을 넘어 객체정보를 저장할 수 있다.

문자열 기반 데이터 이외에 체계적으로 구조화된 객체를 저장할 수 있는 점은 개발편의성을 제공해주는 주요한 장점입니다. 단, 브라우저의 지원 여부를 확인해 봐야 하는 항목이다.

### 3. 용량의 제한이 없다.

### 4. 영구 데이터 저장이 가능하다.

만료 기간의 설정이 없습니다. 즉, 한번 저장한 데이터는 영구적으로 존재합니다.

## Why **Web Storage?**

쿠키와 Web Storage 모두 브라우저에 저장되지만 쿠키는 아래와 같은 단점이 있습니다. 

쿠키의 단점을 Web Storage를 사용함으로써 극복할 수 있습니다.

### 1. 4KB의 데이터 저장 제한

### 2. HTTP Request에 암호화 되지 않은 상태로 사용하기 때문에 보안이 취약하다.

### 3. 쿠키는 모든 HTTP Request에 포함되어 있어 웹서비스 성능에 영향을 줄 수 있다.

## **Web Storage VS Cookie**

### 1. 쿠키는 매번 서버로 전송된다.

웹사이트에서 쿠키를 설정하면 이후 모든 웹 요청은 쿠키 정보를 포함해 서버로 전송됩니다. Web Storage는 저장된 데이터가 클라이언트에 존재할 뿐 서버로 전송되지는 않는다. 이는 네트워크 트래픽 비용을 줄여줍니다.

### 2. Web Storage는 단순 문자열을 넘어(스크립트) 객체정보를 저장할 수 있다.

문자열 기반 데이터 외에 체계적으로 구조화된 객체를 저장할 수 있습니다. 이는 개발 편의성을 제공해주는 장점입니다.(단, 브라우저의 지원 여부를 확인해봐야 합니다)

### 3. Web Storage는 용량의 제한이 없다.

쿠키는 개수와 용량에 제한이 있습니다. 클라리언트에 최대 300개의 쿠키를 저장할 수 있으며, 하나의 사이트(도메인)에서는 최대 20개를 저장할 수 있습니다. 또한, 하나의 쿠키값은 최대 4KB로 제한되어 있습다.

**그러나 Web Storage에는 제한이 없습다. 쿠키도 하위키를 이용하면 이러한 제한을 일부 해소할 수는 있으나, 대용량으로 쿠키를 저장할 일은 없습니다.**

### 4. Web Storage는 영구 데이터 저장이 가능하다.

쿠키는 만료일자를 지정하게 되어있어 언젠가 제거 됩니다. 만약 만료일자를 지정하지 않으면 세션쿠키가 됩니다. 만일 영구 쿠키를 원한다면 만료일자를 굉장히 멀게 설정하여 해결할 수 있습니다.

Web Storage는 만료기간의 설정이 없습니다. 즉, 한 번 저장한 데이터는 영구적으로 존재하게 됩니다.

## **Web Storage Type**

Web Storage는 데이터의 지속성과 관련하여 두 가지 용도의 저장소를 제공합니다.

기본적으로 Web Storage는 Cookie와 마찬가지로 사이트의 도메인 단위로 접근이 제한됩니다. 예를 들면, a 도메인에 저장한 데이터는 b도메인에서 조회할 수 없습니다. 이는 데이터 보안측면에서 당연합니다.

### 1. LocalStorage

- 브라우저를 닫았다가 다시 열어도 계속 유지된다. 저장한 데이터를 명시적으로 지우지 않는 이상 영구적으로 보관이 가능하다.
- 도메인마다 별로도 LocalStorage가 생성된다.
- 도메인만 같으면 전역으로 공유가 가능하다.
- Windows 전역 객체의 LocalStorage라는 컬렉션을 통해 저장과 조회가 이루어진다.

### 2. SessionStorage

- 브라우저가 열려있는 한 페이지를 Reload해도 계속 유지된다. 하지만 브라우저를 닫으면 삭제된다.
- Windows 전역 객체의 SessionStorage라는 컬렉션을 통해 저장과 조회가 이루어진다
- 데이터의 지속성과 액세스 범위에 특수한 제한이 존재한다. Web Storage의 기본 보안처럼 도메인별로 별도로 생성된다. 같은 사이트의 같은 도메인이라도 브라우저가 다르면 서로 다른 영역이 된다. 브라우저 컨텍스트가 다르기 때문이다.

> 💡**브라우저 컨텍스트는 Document를 표시하는 환경을 뜻합니다. 즉, 브라우저가 불러온 웹페이지라고 생각하면 됩니다.**
> 

## **Cookie?**

쿠키는 클라이언트(브라우저) 로컬에 저장되는 키와 값이 들어있는 작은 데이터 파일입니다.

사용자 인증이 유효한 시간을 명시할 수 있으며, 유효 시간이 정해지면 브라우저가 종료되어도 인증이 유지된다는 특징이 있습니다.

쿠키는 클라이언트의 상태 정보를 로컬에 저장했다가 참조합니다.

클라이언트에 300개까지 쿠키저장 가능, 하나의 도메인당 20개의 값만 가질 수 있음, 하나의 쿠기값은 4KB까지 저장합니다.

Response Header에 Set-Cookie 속성을 사용하면 클라이언트에 쿠기를 만들 수 있습니다.

쿠키는 사용자가 따로 요청하지 않아도 브라우저가 Request시에 Request Header를 넣어서 자동으로 서버에 전송합니다.

### Components of Cookies

- 이름: 각각의 쿠키를 구별하는 데 사용되는 이름
- 값: 쿠키의 이름과 관련된 값
- 유효시간: 쿠키의 유지시간
- 도메인: 쿠키를 전송할 도메인
- 경로: 쿠키를 전송할 요청 경로

### How cookies work

1. 클라이언트가 페이지 요청

2. 서버에서 쿠키를 생성

3. HTTP 헤더에 쿠키를 포함시켜 응답

4. 브라우저가 종료되어도 쿠키 만료 기간이 있다면 클라이언트에서 보관하고 있다

5. 같은 요청을 할 경우 HTTP헤더에 쿠키를 함께 보낸다

6. 서버에서 쿠키를 읽어 이전 상태 정보를 변경 할 필요가 있을 때 쿠키를 업데이트하여 변경된 쿠키를 HTTP 헤더에 포함시켜 응답한다.

### Examples of Cookies

- 방문 사이트에서 로그인 시, "아이디와 비밀번호를 저장하시겠습니까?"
- 쇼핑몰의 장바구니 기능
- 자동로그인, 팝업에서 "오늘 더 이상 이 창을 보지 않음" 체크

# Refresh Token Example

이번에는 refreshToken을 발행하면서 cookie에 refreshToken이잘 들어가는지 확인해보고 토큰이 만료시켰을때 에러를 확인해 보겠습니다.

class 폴더 안에 21-01-login-auth-param-with-refresh-cookie 폴더를 만들어 주세요.

21-01-login-auth-param-with-refresh-cookie 폴더 안에 20-04-login-auth-param파일을 모두 붙여 넣어 주세요.

./src/common/ 에 `types` 폴더를 만들어주시고 `types` 폴더 안에 `context.ts` 파일을 만들어주세요.

```tsx
//context.ts

import { UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

export interface IContext {
  req: Request;
  res: Response;
}
```

NestJS는 express 기반이기 때문에 express에 해당하는 모듈을 모두 사용할 수 있습니다. `context.ts`의 하는 역할은 로그인을 할 때 사용할 것이기 때문에 하단에 설명해 드리겠습니다.

./src/apis/auth/auth.service.ts를 수정하겠습니다

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

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshkey', expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }
}
```

다음과 같이 `setRefreshToken` 이라는 비즈니스 로직을 추가해 주세요.

항상 refreshToken의 expire 시간은 accessToken의 expire 시간 보다 길어야 합니다.

`setRefreshToken` 는 refreshToken을 헤더에 추가합니다.

./src/apis/auth/auth.resolver.ts를 수정하겠습니다

```tsx
//auth.resolver.ts

import { UnauthorizedException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/common/types/context';
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
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    const user = await this.userService.findOne({ email });
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) throw new UnauthorizedException();

    this.authService.setRefreshToken({ user, res: context.res });
    const accessToken = this.authService.getAccessToken({ user });
    return accessToken;
  }
}
```

상위에서 만들어 놓은 `context.ts` 에 미리 정해 놓은 Request 와 Response의 타입을 가져와 사용하겠습니다. context의 res를 사용해 `setRefreshToken` 비즈니스 로직을 실행해 cookie에 refreshToken을 넣어줍니다.

![스크린샷 2022-01-20 오후 4.43.44.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.43.44.png)

`$yarn start:dev`를 입력해서 서버를 실행시켜 주세요.

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

![스크린샷 2022-01-28 오후 4.36.18.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.36.18.png)

먼저 login을 진행해 보겠습니다.

![스크린샷 2022-01-28 오후 4.38.21.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.38.21.png)

refreshToken이 쿠키에 잘 받아와지는 걸 볼 수 있습니다.

이번에는 토큰을 accessToken을 발행하자마자 파괴시켜 요청을 보내보겠습니다.

![ㅇㄴㄹㄴㄹㅇㄴㄹㄴㅇㄹㄴㅇ.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E3%85%87%E3%84%B4%E3%84%B9%E3%84%B4%E3%84%B9%E3%85%87%E3%84%B4%E3%84%B9%E3%84%B4%E3%85%87%E3%84%B9%E3%84%B4%E3%85%87.png)

auth.service.ts에 accessToken 발생의 expiresIn을 1s로 변경해서 생성되어 1초 만에 파괴시키게 변경해 주세요.

![스크린샷 2022-01-28 오후 4.49.18.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.49.18.png)

login을 해서 토큰을 재발급 받으세요.

![스크린샷 2022-01-28 오후 4.48.59.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.48.59.png)

재발급한 토큰을 header에 넣어줘서 요청을 보냈을 경우 유효하지 않습니다.

그렇다면 이제부터 refreshToken을 이용해서 accessToken을 재발행 해보겠습니다.

# Restore Token Example

이번에는 토큰이 만료되었을 경우 refreshToken을 사용해 accessToken을 재발행해 보겠습니다.

class 폴더 안에 21-02-login-auth-param-with-refresh-restore 폴더를 만들어 주세요.

21-02-login-auth-param-with-refresh-restore폴더 안에 21-01-login-auth-param-with-refresh-cookie파일을 모두 붙여 넣어 주세요.

./src/common/auth에 `jwt-refresh.strategy.ts` 파일을 만들어 주세요.

```tsx
//jwt-refresh.strategy.ts

import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookies = req.headers.cookies;
        if (cookies) return cookies.replace('refreshToken=', '');
      },
      secretOrKey: 'myRefreshkey',
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

이번에도 동일하게 passport 모듈을 사용했습니다.

요청에 헤더의 cookies를 가져오는데 만약 존재할 경우 문자열로 반환해서 발행했던 secretOrKey를 사용해 토큰을 열어줍니다.

토큰의 payload를 열어서 사용자의 정보를 반환합니다.

./src/common/auth/gql-auth.guard.ts 파일을 열어봐주세요.

![ㅇㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴ.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E3%85%87%E3%84%B4%E3%84%B9%E3%84%B4%E3%85%87%E3%84%B9%E3%84%B4%E3%85%87%E3%84%B9%E3%84%B4%E3%85%87%E3%84%B9%E3%85%87%E3%84%B4%E3%84%B9%E3%85%87%E3%84%B4.png)

이전에 미리 추가했던 부분 기억하시나요? gql에서 guard를 직접적으로 사용하지 못하기 때문에 다음과 같이 중간단계를 만들어 줘야 합니다.

auth.resolver.ts에 accessToken을 재발급하는 기능을 추가하겠습니다.

```tsx
//auth.resolver.ts

import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthRefreshGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { IContext } from 'src/common/types/context';
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
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    const user = await this.userService.findOne({ email });
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) throw new UnauthorizedException();

    this.authService.setRefreshToken({ user, res: context.res });
    const accessToken = this.authService.getAccessToken({ user });
    return accessToken;
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(
    @Context() context: IContext,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    const user = currentUser;
    // context.res.setHeader
    this.authService.setRefreshToken({ user, res: context.res });
    const accessToken = this.authService.getAccessToken({ user });
    return accessToken;
  }
}
```

@UseGuards(GqlAuthRefreshGuard)를 사용해서 refreshToken을 검사합니다.

setRefreshToken 비즈니스 로직을 사용해 쿠키에 refreshToken을 넣어줍니다.

getAccessToken 비즈니스 로직을 사용해 토큰을 재발행 해줍니다.

![스크린샷 2022-01-20 오후 4.43.44.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.43.44.png)

`$yarn start:dev`를 입력해서 서버를 실행시켜 주세요.

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

![스크린샷 2022-01-28 오후 4.36.18.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.36.18.png)

먼저 login을 진행해 보주세요. 토큰이 발행되고 1초 뒤에 파괴되었겠죠?

당연히 fetchUser를 보내도 사용할 수 없는 토큰이라는 에러를 반환합니다.

![스크린샷 2022-01-27 오후 1.10.27.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-27_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.10.27.png)

graphql playground에서 다음과 같이 setting 값을 적용해야 header의 cookies 값을 확인할 수 있습니다.

![스크린샷 2022-01-28 오후 5.47.03.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.47.03.png)

```tsx
{
	"Cookies" :"refreshToken=토큰명"
}
```

다음과 같이 refreshToken을 확인해서 HTTP HEADERS에 상위와 같은 양식으로 요청을 보내면 accessToken이 재발행 됩니다.

---

# Google social Login

## Principle of Social Login

**소셜로그인을 진행하는 주체는 총 3명입니다.**

- **client** : 소셜로그인 때는 우리가 알고 있는 그 유저가 아닙니다. 바로 소셜로그인을 사용하는 유저, 즉 서비스를 만드는 "나"입니다.
- **resource owner** : 소셜로그인 기능을 제공하는 서비스를 사용하는 유저입니다. 여기서 owner가 붙는 이유는, client가 받고자 하는 정보의 주인이기 때문입니다.
- **resource server**: 소셜로그인 기능을 제공하는 곳, 그리고 client가 받아야 하는 진짜 유저의 데이터를 가지고 있는 곳을 의미합니다.

1. 사용자가 소셜로그인 버튼을 누르면, 로그인하고자 하는 소셜의(카카오나 구글) 로그인페이지로 가게됩니다.
2. 이 때 이 로그인 페이지로 가게 하기 위해, 서비스제공자와 소셜 사이에서의 모종의 상호작용이 일어나게 됩니다. 이 상호작용을 위해 서비스 제공자는 미리 OAuth라는 서비스를 사용하게 됩니다. 
3. 로그인을 성공하면, 소셜은 사용자의 페이지가 기존에 사용하던 서비스 페이지로 redirect 되도록 해줍니다.

즉 소셜로그인은, 구글이나 카카오에서 "나"라는 제공자와 "사용자" 사이에서 로그인을 중개해주는 역할을 하는 것입니다. 이 중개자의 역할을 가능하도록 해주는 서비스가 OAuth 입니다.

사용자가 소셜로그인에 로그인 했을 때, 그 아이디와 비번을 서비스 제공자에게 주는 것이 아니라, OAuth를 거쳐서 소셜에서는 "나"에게 Access Token을 제공하고, "나"는 이 토큰을 통해서 소셜에 접근할 수 있게 되고, 사용자에게 로그인 페이지를 제공할 수 있는 것입니다.

## Implementation Of Social Login

### 1. 등록

내가 구현 할 어플리케이션(이하 **Client**)이 **Resource Server** 를 사용하기 위해서는 **등록** 이라는 절차를 거쳐야 합니다. Facebook Developer, Google Developer 와 같은 사이트에서 진행합니다.

**등록** 과정을 거치게 되면, **Client** 와 **Resource Server** 는 아래 3가지를 공유하게 됩니다.

- Client ID
    - 내가 구현 할 어플리케이션을 식별 할 수 있는 ID
- Client Secret
    - 내가 구현 할 어플리케이션을 식별 할 수 있는 PW (절대, 코드에 노출되어지면 안되는 정보)
- Authorized Redirect URL
    - 소셜 서비스가 인증이 가능하도록 권한을 부여하는 과정에서 그 인증코드(Authorized Code)를 전달해줄 경로

### 2. 인증

**a.** 로그인 하고자 하는 **resource owner** 즉, 데이터의 주인인 서비스 유저에게 승인을 받아야 합니다.

버튼을 누르면, **resource owner**가 **소셜서비스(resource server)**에 로그인을 시도하는 창으로 이동합니다.

1) 로그인 되어 있는 경우 : **소셜서비스(resource server)**에서 로그인을 시도한 링크의 client ID를 점검합니다.

2) 로그인 되어 있지 않은 경우 : 로그인을 진행합니다.

→ 로그인 완료 후에, 로그인을 시도한 링크의 redirect URL을 비교합니다.

1) **소셜서비스(resource server)**가 해당 URL을 가지고 있지 않다면 종료

2) 같은 URL을 가지고 있지 않다면,  **resource owner**의 개인 정보를 **client**에게 제공해도 되는지 허용여부에 대한 메시지를 띄웁니다.

→ 허용할 경우, 그 응답이 **client**에게 전달됩니다.

→ **client**는 그 응답에 담긴 데이터를 분석합니다.

- User ID : 1
    - Resouce Owner를 식별 할 수 있는 아이디
- Scope : B,C
    - Resource Owner가 허락해 접근 할 수 있는 리소스 목록

**b. resource owner**에게 승인을 받았으니, 승인을 받았다는 증거를 가지고 **소셜서비스(resource server)**에게 해당 유저의 데이터를 전달해달라고 요청해야합니다.

- Authorization Code를 소셜서비스가 서비스 사용자에게 제공하는 응답의 header에 location: https://[redirect URL]?code=[Authorization Code]이라는 값을 주어 redirect 합니다.
- location으로 인해, 서비스 사용자는 해당 주소로 redirect 됩니다.
- 따라서 서비스 제공자인 "나"는 redirect로 넘어온 URL뒤의 params형태로 담긴 authorization code를 알게되는데 아래 그림과 같은 형식의 주소로 서비스 제공자는 소셜서비스로 접속합니다.

![https://blog.kakaocdn.net/dn/liCtu/btqOnZ0OgdO/6JoUKlv478sk3ZKdTmhKRk/img.png](https://blog.kakaocdn.net/dn/liCtu/btqOnZ0OgdO/6JoUKlv478sk3ZKdTmhKRk/img.png)

- 이 때 서비스제공자인 "나"가 소셜서비스로 접속할때 가지고 간 주소링크에서 Authorizaion code와 clientID, client secret, redirect URL이 모두 일치하는지를 확인합니다.
- 일치하면 드디어 Access Token을 발급합니다.

→ access token을 가지고 **소셜서비스(resource server)**에 일종의 GET 요청을 보내서 **resource owner**의 데이터를 받아옵니다.

---

## Google Login Flow

![dfsfsdfsdf.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/dfsfsdfsdf.png)

## **Setting up the application to use Google social Login**

우선 google cloud에 접속해서 로그인해 주세요.

[Cloud Console - Web UI Admin | Google Cloud](https://cloud.google.com/cloud-console/)

우측 상단의 계정 옆 "콘솔"을 클릭하고, 

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled.png)

새 프로젝트를 통해 프로젝트를 만듭니다.

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%201.png)

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%202.png)

상단 검색창에서 사용자의 정보를 편리하게 가져와줄 people api를 검색하여 사용합니다.

![https://blog.kakaocdn.net/dn/vesOg/btq2fec06ba/uPzNLXHI7kAK8YbOtKabW0/img.png](https://blog.kakaocdn.net/dn/vesOg/btq2fec06ba/uPzNLXHI7kAK8YbOtKabW0/img.png)

![https://blog.kakaocdn.net/dn/cput4O/btq2iqbLABg/Bj0GLuZgLA1vo02QE1XxoK/img.png](https://blog.kakaocdn.net/dn/cput4O/btq2iqbLABg/Bj0GLuZgLA1vo02QE1XxoK/img.png)

좌측 메뉴의 API 및 서비스에 사용자 인증정보를 클릭합니다.

![https://blog.kakaocdn.net/dn/qls6u/btq2gghyMI5/zL3Yu6o3DYzdA7CQaA1ZKk/img.png](https://blog.kakaocdn.net/dn/qls6u/btq2gghyMI5/zL3Yu6o3DYzdA7CQaA1ZKk/img.png)

 왼쪽 상단의 "동의 화면 구성"을 클릭합니다.

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%203.png)

- 위 문구가 안보이시는 분들은 API 및 서비스 - Oauth 동의 화면에서 들어가셔도 됩니다.

### **OAuth 동의화면**

UserType은 "외부" 선택 → 만들기 클릭

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%204.png)

### **앱 정보**

필수 입력들만 적어주고, `저장 후 계속`을 누릅니다.

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%205.png)

### **범위**

`범위 추가 또는 삭제` 버튼 클릭 → **People API**를 체크 후 **업데이트** 클릭→  **저장 후 계속**을 눌러줍니다.

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%206.png)

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%207.png)

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%208.png)

### 테스트 사용자

Testing을 위해 `add users` 버튼을 눌러 테스트 사용자를 추가한 후 **저장 후 계속**을 누릅니다. 

![https://blog.kakaocdn.net/dn/IdMgm/btq2oSeJeZ0/VkdOB5nRUi99cmdnjIqEy0/img.png](https://blog.kakaocdn.net/dn/IdMgm/btq2oSeJeZ0/VkdOB5nRUi99cmdnjIqEy0/img.png)

좌측 메뉴의 **API 및 서비스** → **사용자 인증 정보**를 다시 클릭하여  

`+ 사용자 인증 정보 만들기` → `API 키`를 클릭합니다.(자동으로 만들어집니다.)

![ㅇㄴㄹㅇㄴㄹㅇㄴㄹ.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E3%85%87%E3%84%B4%E3%84%B9%E3%85%87%E3%84%B4%E3%84%B9%E3%85%87%E3%84%B4%E3%84%B9.png)

다시 좌측 메뉴의 **API 및 서비스** → **사용자 인증 정보**를 클릭하여 `+ 사용자 인증 정보 만들기` →  `OAuth 클라이언트 ID`를 클릭합니다.

**애플리케이션 유형**은 **웹 애플리케이션**을 선택해줍니다.

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%209.png)

`승인된 리디렉션 URI`에서 **URI추가**를 누릅니다.  

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%2010.png)

[http://localhost:3000/login/google](http://localhost:3000/login/google)로 입력해주세요. 후에 `저장`을 누릅니다.

리디렉션 URI에 추가된 URI만 구글 서버와 통신할 수 있습니다!

![스크린샷 2022-02-07 오후 5.55.07.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.55.07.png)

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%2011.png)

이렇게 생성된 ID와 비밀번호를 가지고 아래 실습을 진행하겠습니다. 

## 실습

class 폴더 안에 21-03-login-oauth-google 폴더를 만들어 주세요.

21-03-login-oauth-google폴더 안에 frontend, backend 폴더를 각각 만들어주세요.

backend 폴더 안에는 21-02-login-auth-param-with-refresh-restore 폴더의 파일을 붙여넣기 해주세요.

frontend 폴더 안에는 `social-login.html` 파일을 만들어 주세요.

```html
<!-- social-login.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>소셜로그인</title>
  </head>
  <body>
    <a href="http://localhost:3000/login/google">구글로그인</a>
  </body>
</html>
```

`./src/common/auth` 경로에 `jwt-social-google.strategy.ts` 파일을 만들어주세요.

```tsx
//jwt-social-google.strategy.ts

mport { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '클라이언트 ID',
      clientSecret: '클라이언트 보안 비밀',
      callbackURL:  '추가한 리디렉션 URI',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string, //
    refreshToken: string,
    profile: Profile,
  ) {
    return {
      email: profile.emails[0].value,
      password: profile.id,
      name: profile.displayName,
      age: 0,
    };
  }
}
```

다음과 같이 guard를 만들어 줬습니다. 

이전에 만들었던 guard와 동일한 구조지만 요청 필수 매개변수 

- clientID : 클라이언트 ID입니다.
- clientSecret : 클라이언트 보안 비밀입니다.
- callbackURL:  추가한 리디렉션 URI 입니다.
- scope :  스코프는 받아올 유저 정보가 입니다.

이전에도 언급했듯이 RestAPI에서 Guard를 사용할 때는 중간단계 없이 사용할 수 있다고 했던 부분 기억하시죠?

`./src/apis/auth` 경로에 `auth.controller.ts` 파일을 만들어주세요.

```tsx
//auth.controller.ts

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller('/')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 가입확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 회원가입
    if (!user) {
      const { password, ...rest } = req.user;
      const createUser = { ...rest, hashedPassword: password };
      user = await this.userService.create({ ...createUser });
    }

    // 로그인
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/class/21-03-login-oauth-google/frontend/social-login.html',
    );
  }
}
```

 RestAPI에서 라우터를 핸들링할때는 resolver를 사용합니다.

**이전에 추가한 리디렉션 URI과 동일하게 엔드포인트를 지정해주세요.**

Guard가 통과되면 다음과 같은 로직이 실행되는데 이미 회원가입이 되었다면 로그인해 주고 회원가입이 되지 않았다면 회원가입 후 로그인을 합니다. 이때 `refreshToken`을 넘겨주는데 이는 `accessToken`보다 `refreshToken`의 생명주기가 길기 때문입니다.

로그인이 성공되면 redirect를 `[http://localhost:5500/class/21-03-login-oauth-google/frontend/social-login.htm](http://localhost:5500/class/21-03-login-oauth-google/frontend/social-login.htm)` 로 해주세요. Live Server의 기본 Port는 5500입니다.

![스크린샷 2022-01-20 오후 4.43.44.png](BE%20Day21%20Authentication%20&&%20Authorization%204ee7c22d670441b7b9f09fb2ab9efbf1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-20_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.43.44.png)

`$yarn start:dev`를 입력해서 서버를 실행시켜 주세요.

![스크린샷 2022-02-08 오후 1.54.16.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.54.16.png)

frontend 폴더에 `social-login.html` 파일을 Open with Live Server로 실행시켜 주세요.

![스크린샷 2022-02-08 오후 1.57.09.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.57.09.png)

구글 로그인을 클릭해서 다음과 같은 화면이 나오고 로그인을 진행하시면 됩니다.

![스크린샷 2022-02-08 오후 2.00.19.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.00.19.png)

DB를 실행시키면 다음과 같이 회원가입이 잘 되었습니다.

![Untitled](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/Untitled%2012.png)

`refreshToken`도 잘 받아왔습니다!