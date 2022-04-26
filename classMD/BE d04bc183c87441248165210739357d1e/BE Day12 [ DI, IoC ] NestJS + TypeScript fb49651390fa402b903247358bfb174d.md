# BE Day12 [ DI, IoC ] NestJS + TypeScript

**목차**

  

---

---

# Loose-Coupling & Dependency Injection

## 느슨한결합(loose-coupling)

SW에서 **결합을 "둘 이상의 객체"**로 해석했을 때, 

**느슨한 결합(Loose Coupling)**이란 "객체들 간에 결합이 되어있긴 하는데 헐겁게 됐다."로 해석할 수 있습니다.

**느슨한 결합(Loose Coupling)**은 다른 클래스를 직접적으로 사용하는 클래스의 의존성을 줄이는 것이고 **강한 결합(Tight Coupling)**은 클래스와 객체가 서로 의존하고 있는 것입니다.

이전에 배웠던 **강한 결합(Tight Coupling)의 반대 개념이라고 생각하면 됩니다.**

### **강한 결합(Tight Coupling)의 특징**

- 하나의 객체를 변경하게 되면 다른 객체들을 변경을 요구되어 변경점들을 확인하고 쉽게 놓칠 수 있습니다.
- 결합이 강하게 되어있어 결합이 되어있지 않으면 사용을 할 수 없게 됩니다.
- new를 선언할 때마다 컴퓨터 메모리를 사용하게 되는데 비교적으로 강한 결합에서 new를 더 많이 사용해 메모리를 많이 잡아먹게 됩니다.

### **느슨한 결합(Loose Coupling)의 특징**

- 클래스/클래스을 느슨하게 결합되어 새로운 기능을 개발하거나 기존 기능을 수정하고 확장하는게 쉽습니다.
- 코드의 유지 보수가 쉽습니다.
- 테스트 대역으로 치환하기가 쉬워 유닛 테스트가 용이합니다.

## **IoC(Inversion of Control / 제어의 역전)**

**제어의 역전(Inversion of Control)은 일반적인 디자인 패턴** 중 하나입니다.

일반적으로 개발자가 프로그램의 흐름을 제어하는 주체였다면, **IoC의 개념이 나오게 되며 프레임워크가 dependency를 container화 시켜 생명주기를 관리**하게 되었습니다.

즉, dependency의 **제어권이 개발자에서 프레임워크로 넘어가게 되었으며 이를 제어권의 흐름이변경되었다고 하여 IoC(Inversion of Control)**이라고 하게됩니다.

## DI(Dependency Injection/ 의존성 주입)

**DI(Dependency Injection) 의존성 주입**은 **Tight Coupling(강한 결합)을 Loose Coupling(느슨한 결합)으로 전환 시키는 방법이며,  제어의 역전(Inversion of Control)의 기술중 하나입니다.**

- 제어의 역전 : **"내가 대신 제어해줄게"**
- 의존성 주입 : **"니가 정의한 코드(클래스, 변수 등등)를"**

**DI(Dependency Injection) 의존성 주입**에 총 3가지의 방법이 존재하며 이 중 **Constructor Inject(생성자 주입)이 많은 Design pattern에서 권장됩니다.**

## Loose-Coupling & DI 실습 01

이제 **느슨한 결합(loose-coupling)**을 위한 **의존성 주입(DI) 실습**을 진행해 보겠습니다.

먼저 class 폴더 안에 새로운 폴더 **12-01-mvc-DI-singleton-IoC-1**을 만들어 주세요.

**11-06-mvc-tight-coupling-with-product-coupon**이 모든 파일을 복사 붙여넣기 해주세요.

`product.controller.js` 파일을 수정해주세요.

```jsx
// import { ProductService } from './services/product.service.js'
// import { CashService } from './services/point.service.js'

export class ProductController {
    constructor(moneyService, productService){
        this.moneyService = moneyService
        this.productService = productService
    }
    
    buyProduct(req, res) {
        // 1. 가진돈 검증하는 코드(10줄 => 2줄)
        const hasMoney = this.moneyService.checkValue() // true 또는 false
    
        // 2. 판매여부 검증하는 코드(10줄 => 2줄)
        const isSoldout = this.productService.checkSoldout() // true 또는 false
    
        // 3. 상품 구매하는 코드
        if(hasMoney && !isSoldout) {
            res.send('상품을 구매합니다.')
        }
    }

    refundProduct(req, res) {
        // 1. 판매여부 검증하는 코드(10줄 => 2줄)
        const isSoldout = this.productService.checkSoldout() // true 또는 false
    
        // 2. 상품 환불하는 코드
        if(isSoldout){
            res.send('상품을 환불합니다.')
        }
    }

}
```

**Constructor Inject(생성자 주입)**을 사용해서 **DI(Dependency Injection) 의존성 주입**을 해주었습니다.

**Constructor**를 사용해서 **DI(Dependency Injection)**를 해주었기 때문에, **제어가 역전이 되었습니다.**

이전에 강한 결합(Tight Coupling)을 했을 때는 모듈을 불러와야 했지만(import) **느슨한 결합(Loose Coupling)은 모듈을 불러오지 않아도 됩니다.**

```jsx
// import { CashService } from './services/point.service.js'

export class CouponController {
    constructor(moneyService){
        this.moneyService = moneyService
    }
    
    buyCoupon(req, res) {
        // 1. 가진돈 검증하는 코드(10줄 => 2줄)
        const hasMoney = this.moneyService.checkValue() // true 또는 false
    
        // 2. 쿠폰 구매하는 코드
        if(hasMoney) {
            res.send('쿠폰을 구매합니다.')
        }
    }

}
```

`coupon.controller.js` 파일을 다음과 동일하게 수정해주세요.

```jsx
import express from 'express'
import { CouponController } from './mvc/controllers/coupon.controller'
import { ProductController } from './mvc/controllers/product.controller'
import { CashService } from './mvc/controllers/services/cash.service'
import { ProductService } from './mvc/controllers/services/product.service'

const app = express()

const moneyService = new CashService() // 싱글톤 패턴)
const productService = new ProductService()

// 쿠폰 API
const couponController = new CouponController(moneyService)
app.post('/coupon/buy', couponController.buyCoupon)

// 상품 API
const productController = new ProductController(moneyService, productService)
app.post('/product/buy', productController.buyProduct)
app.post('/product/refund', productController.refundProduct)

app.listen(3000)
```

요청을 핸들링 하는 `index.js` 를 다음과 같이 수정해주세요.

`index.js` 에 **Singleton Pattern(싱글톤 패턴)**을 적용했습니다.

### Singleton Pattern(싱글톤 패턴)

비즈니스 로직인 `CashService` 와 `ProductService` 를 먼저 선언하였습니다. 

이렇게 하면 **new 한 번으로 모든 곳에서 사용 가능합니다.**

이런 디자인 패턴을 **Singleton Pattern(싱글톤 패턴)**이라고 합니다.

## Loose-Coupling & DI 실습 02

class 폴더 안에 새로운 폴더 **12-02-mvc-DI-singleton-IoC-2**을 만들어 주시고 **12-01-mvc-DI-singleton-IoC-1에** 모든 파일을 복사 붙여넣기 해주세요.

이번에는 포인트 결제를 추가해보겠습니다.

**./mvc/controllers/services/point.service.js** 의 경로에 `point.service.js` 파일을 만들어주세요.

```jsx
export class PointService {
    
    checkValue(){
        // 1. 가진포인트 검증하는 코드(10줄)
        // ...
        // ...
        // ...
        // ...
        // ...
        // ...
        // ...
        // ...
        // ...
        // ...
    }

}
```

다음과 같이  `point.service.js` 에 가진 포인트를 검증하는 코드를 작성해 주세요.

```jsx
import express from 'express'
import { CouponController } from './mvc/controllers/coupon.controller.js'
import { ProductController } from './mvc/controllers/product.controller.js'
import { CashService } from './mvc/controllers/services/cash.service.js'
import { PointService } from './mvc/controllers/services/point.service.js'
import { ProductService } from './mvc/controllers/services/product.service.js'

const app = express()

const moneyService1 = new PointService() // 포인트결제 추가
const moneyService2 = new CashService() // new 한 번으로 모든곳에서 사용 가능(싱글톤 패턴)
const productService = new ProductService()

// 쿠폰 API
const couponController = new CouponController(moneyService1)
app.post('/coupon/buy', couponController.buyCoupon)

// 상품 API
const productController = new ProductController(moneyService2, productService)
app.post('/product/buy', productController.buyProduct)
app.post('/product/refund', productController.refundProduct)

app.listen(3000)
```

 `index.js` 파일을 다음과 같이 수정해주세요.

**`const moneyService1 = new PointService()`**를 ****추가했습니다.

만약 **ProductController**에서 포인트 결제 기능을 사용하고 싶다면 **new 생성자에 매개 변수만 변경해 주면 간편하게 관리 수정이 가능**하게 됩니다.

## Loose-Coupling & DI 실습 03

class 폴더 안에 새로운 폴더 **12-03-mvc-DI-singleton-IoC-with-this**을 만들어 주시고 **12-02-mvc-DI-singleton-IoC-2**에 있는 ****모든 파일을 복사 붙여넣기 해주세요.

터미널에서 해당 폴더로 이동해 서버를 실행시켜주세요.

```jsx
// import { CashService } from './services/point.service.js'

export class CouponController {
    constructor(moneyService){
        this.moneyService = moneyService
    }
    
    buyCoupon(req, res) {
        // 1. 가진돈 검증하는 코드(10줄 => 2줄)
        const hasMoney = this.moneyService.checkValue() // true 또는 false
    
        // 2. 쿠폰 구매하는 코드
        if(hasMoney) {
            res.send('쿠폰을 구매합니다.')
        }
    }

}
```

 `coupon.controller.js` 파일을 보게 되면 분명 this.moneyService.checkValue() 로 가진 돈을 검증하게 해놓았지만 읽지 못하고 있습니다.

이유는 선언식 함수와 화살표 함수(**( ) ⇒ { }**)의 차이 때문입니다. 

화살표 함수를 사용하면 this는 함수를 선언할 때의 상위 스코프를 가리킵니다. 

일반 함수를 사용하면, 함수를 호출한 객체로 this가 바인딩이 되기 때문에 읽지 못하게 됩니다.

따라서 화살표 함수를 사용하게 되면 바로 최상단에 생성자 주입해 놓은 this.moneyService를 찾습니다.

<aside>
💡 **this 참고 자료**

[this | PoiemaWeb](https://poiemaweb.com/js-this)

</aside>

따라서 controller에 작성해 놓은 일반 함수를 모두 화살표 함수의 형태로 수정해 주세요.

```jsx
// import { ProductService } from './services/product.service.js'
// import { CashService } from './services/point.service.js'

export class ProductController {
    constructor(moneyService, productService){
        this.moneyService = moneyService
        this.productService = productService
    }
    
    buyProduct = (req, res) => {
        // 1. 가진돈 검증하는 코드(10줄 => 2줄)
        const hasMoney = this.moneyService.checkValue() // true 또는 false
    
        // 2. 판매여부 검증하는 코드(10줄 => 2줄)
        const isSoldout = this.productService.checkSoldout() // true 또는 false
    
        // 3. 상품 구매하는 코드
        if(hasMoney && !isSoldout) {
            res.send('상품을 구매합니다.')
        }
    }

    refundProduct = (req, res) => {
        // 1. 판매여부 검증하는 코드(10줄 => 2줄)
        const isSoldout = this.productService.checkSoldout() // true 또는 false
    
        // 2. 상품 환불하는 코드
        if(isSoldout){
            res.send('상품을 환불합니다.')
        }
    }

}
```

`product.controller.js`  파일을 다음과 같이 수정해 주세요.

```jsx
// import { CashService } from './services/point.service.js'

export class CouponController {
    constructor(moneyService){
        this.moneyService = moneyService
    }
    
    buyCoupon = (req, res) => {
        // 1. 가진돈 검증하는 코드(10줄 => 2줄)
        const hasMoney = this.moneyService.checkValue() // true 또는 false
    
        // 2. 쿠폰 구매하는 코드
        if(hasMoney) {
            res.send('쿠폰을 구매합니다.')
        }
    }

}
```

`coupon.controller.js` 파일을 다음과 같이 수정해 주세요.

![스크린샷 2021-12-24 오후 5.54.35.png](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-24_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.54.35.png)

`Postman` 을 열어서 [localhost:3000/coupon/buy](http://localhost:3000/coupon/buy) 에 POST 요청을 보내주세요.

![스크린샷 2021-12-24 오후 5.54.09.png](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-24_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.54.09.png)

화살표 함수로 수정하니 정상적으로 작동합니다.

---

# NestJS

## NestJS?

NestJS는 TypeScript(타입스크립트)를 지원하는 **효율적이고 확장 가능한** Node.js의 서버 애플리케이션 프레임워크이며, OOP (Object Oriented Programming), FP (Functional Programming) 및 FRP (Functional Reactive Programming) 요소를 결합하는 특징을 가지고 있습니다.

## Why is NestJS?

공식문서에 따르면, 최근 몇년간 Node.js덕분에 Javascript는 프론트, 백엔드 모두를 위한 웹의 ***"링구아 프랑카"***가 되었고 이로인해 Vue, React, Angular와 같은 프로젝트가 생겨 개발자의 생산성이 향상되고 빠르고, 테스트가 가능하며 확장성이 가능한 frontend application을 만들 수 있습니다.

그러나 Node와 Server측 Javascript를 위한 훌륭한 모듈, 라이브러리들이 존재해도 Architecture의 주요 문제를 해결하지 못했습니다!

Node.js로 Backend를 만드는 것은 마치 레고와 같습니다. 레고처럼 조립할 수 있는 부품이 있고, 그 작은 부품들을 차근차근 조립하다보면 거대한 완성품을 만들 수 있습니다. Node.js도 마찬가지로 하나의 파일에서 시작해서 점차점차 커지게 됩니다. 규칙도, 제약도 없이 자유롭게 할 수 있고 0에서 거대한 것을 창조하는 과정이기에 매우 훌륭한 경험이 될 수 있습니다.

문제는 너무 제약이 없고, 너무 자유롭다는 것입니다. 때로는 규칙이나 제약, 즉 구조와 프레임워크가 필요할 때가 있습니다. 다른언어, 예를 들어 파이썬에는 쟝고라는 프레임워크가 있고 Java는 Spring이 있습니다. 하지만 Node.js에는 규칙이 없고, 어떤 패턴을 따라야할지도 모르며 사용자가 정의해서 사용해야 합니다.

이런 자유로움은 좋은 점도 많지만,프로젝트로 협업을 진행할 경우 매우 어렵습니다. 개발자마다 다양한 Architecture 패턴을 가지고 있고, 프로젝트의 규모가 커질수록 개인의 구조와 스타일의 다름으로 인해 협업 과정에 드는 소통비용이 증가합니다. 이는 생산성 저하와 유지보수의 어려움으로 이어집니다.

### 아키텍쳐

NestJS는 Architecture 구조를 제공함으로써 Node.js의 주요문제를 해결해줍니다!

![https://media.vlpt.us/images/hkja0111/post/5a8ae852-e8b6-491f-8249-c1e5fdd356f3/image.png](https://media.vlpt.us/images/hkja0111/post/5a8ae852-e8b6-491f-8249-c1e5fdd356f3/image.png)

NestJs는 **Node.js를 위한 프레임워크**로, 규칙과 구조없이 자유분방한 node.js를 순식간에 Python+Django, Java+Spring 수준으로 만들어줍니다. 때문에 각 개발자들이 Architecture를 통일하고 소통비용을 절감하며, 확장성 있고 효율적인 개발을 할 수 있습니다.

### 효율성

NestJS는 개발자와 팀이 고도로 테스트 가능하고, 확장 가능하며, 느슨하게 결합되고 유지관리가 쉬운 애플리케이션을 만들 수 있는 **즉시 사용가능한 애플리케이션 아키텍처**를 제공합니다.

그 외에도 **TypeScript기반의 Framework**이며 **Dependency Injection**(의존성 주입), **Inversion of Control**(제어의 역전), **Module**을 통한 구조화 등 생산성에 용이합니다.

### 안정성

NestJS는 **TypeScript를 적극적으로 도입**하면서 서버 어플리케이션 개발 시 발생가능한 오류들을 사전에 방지할 수 있도록 합니다. 또한 세부적인 Module로 나누어져 있기 때문에 독립적인 Unit Test를 쉽게 작성 가능하도록 구현되어 있습니다.

### 확장성

NestJS는 Module Class를 지원하며, 각 Module은 비슷한 기능과 개념들을 Class 한 곳에 담아 캡슐화 하고 서로 Import가 가능하도록 구현되어있습니다. 이러한 Module 구조는 Architecture를 **조직적(Organize)**으로 가져가게 하고 **느슨한 결합(Loose Coupling)**을 가능하게 만들어 **확장성(Extensible)**과 **테스트 가능성(Testable)**을 높입니다.

## Install NestJS

[공식문서](https://nestjs.com/)에 들어가, Documentation을 클릭합니다. 

![Untitled](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/Untitled.png)

옆의 목차에서 First steps를 클릭하면 Setup에 대한 안내가 나와있습니다. 

![Untitled](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/Untitled%201.png)

따라서 설치해보도록 하겠습니다. 맥의 경우 `터미널` 을 열어주시고, 윈도우의 경우 vscode에서 `git bash`를 열어줍니다.

예시로 나온 npm으로 설치 해도 되지만, yarn으로 설치하기 위해 아래의 명령어를 복사해 붙여넣기 합니다. 

```bash
yarn add -g @nestjs/cli
```

맥북에서 permission 에러가 날 경우 명령어 앞에 `sudo` 를 붙여 관리자 권한으로 설치합니다. 

<aside>
💡 CLI ? 
평소 우리가 컴퓨터에서 폴더 아이콘을 클릭해 들어가 안에 있는 파일들을 아이콘으로 보고, 또 그것들을 클릭해서 실행합니다. 이것을 GUI, graphical user interface라고 합니다.

CLI는 Command-line interface로 방금 한 것처럼 터미널에서 명령어를 입력해 폴더를 열고, 파일을 실행하는 등의 상호 작용하는 방식을 말합니다. 

nestjs/cli를 설치하면 nest 명령어를 사용할 수 있게 됩니다.

</aside>

설치가 완료되면 `nest -version` 으로 잘 설치가 됐는지 확인해봅니다. 

![version.PNG](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/version.png)

← 실제로 설치된것과 버전은 다를 수 있습니다. 

이제 nest 명령어를 써서 새로운 nest 프로젝트를 만들겠습니다. class 디렉터리로 이동해서 12-04-nestjs의 프로젝트를 생성해 주세요. 아래의 명령어를 복사해 터미널에 붙여넣기해주세요.

```bash
nest new 12-04-nestjs
```

키보드 화살표를 움직여 `yarn` 으로 이동해 엔터를 누릅니다.

![yarn.PNG](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/yarn.png)

완료가 되면 같은 이름의 폴더가 생성됩니다. 이 폴더를 vscode로 엽니다. 

# NestJS 폴더 구조

nest에서 기본적으로 필요 한 것들을 미리 설치하고, 구조를 정해서 프로젝트를 만들어줬습니다. 

![Untitled](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/Untitled%202.png)

# NestJS package.json

`package.json` 파일은 프로젝트 전체 설명서라고 할 수 있습니다. 

scripts 는 명령어를 쉽게 실행할 수 있도록 단축 명령어를 만들어 둔 것이라고 할 수 있습니다. 

```json
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
```

`dependencies`와 `devDependencies` 는 node 라이브러리들의 설치 목록을 나타냅니다. 

```json
"dependencies": {
    "@nestjs/common": "^8.0.0",
    "@nestjs/core": "^8.0.0",
    "@nestjs/platform-express": "^8.0.0",
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
```

실제로 설치는 `node_modules` 폴더에 설치되었습니다. 그래서 이 폴더를 지워도, package.json에 목록이 있기 때문에 이걸 통해서 다시 설치할 수 있습니다. (`yarn install`)

마지막으로 `jest` 가 있습니다.

```json
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
```

jest는 테스트 관련된 부분입니다. 마우스로 하나 하나 클릭해서 테스트 해볼수있지만, 백엔드는 보통 보이지 않기 때문에, 명령어를 이용해서 파일을 실행해서 테스트 합니다. 

---

# TypeScript

타입스크립트는 **자바스크립트에 타입을 부여한 언어**입니다. 자바스크립트의 확장된 언어라고 볼 수 있습니다. 타입스크립트는 자바스크립트와 달리 브라우저에서 실행하려면 파일을 한번 변환해주어야 합니다. 이 변환 과정을 우리는 **컴파일(complile)** 이라고 부릅니다.

## Why TypeScript?

자바스크립트도 충분히 복잡하고 어려운데 왜 또 다른 언어를 배워야 할까요? 단지 최신 기술이라서? 혹은 다른 회사도 많이 사용하니까 우리도 써야 하는 걸까? 라는 고민을 하게 됩니다. 타입스크립트는 아래 2가지 관점에서 자바스크립트 코드의 품질과 개발 생산성을 높일 수 있습니다.

- **에러의 사전 방지**
- **코드 가이드 및 자동 완성(개발 생산성 향상)**

### **에러의 사전 방지**

타입스크립트는 에러를 사전에 미리 예방할 수 있습니다. 아래 2개의 코드를 비교하여 어떻게 에러를 사전에 방지할 수 있는지 살펴보겠습니다.

```jsx
function sumJs(a, b) {
  return a + b;
}
```

```tsx
function sumTs(a: number, b: number) {
  return a + b;
}
```

두 코드 모두 두 숫자의 합을 구하는 함수 코드입니다. `sumJs` 자바스크립트로 그리고 `sumTs` 는 타입스크립트로 작성하였습니다. 

```tsx
sum(10, 20); // 30
```

이렇게 `sum` 함수를 이용하여 숫자 10과 20을 더합니다. 그러면 저희가 원하는 결과인 30을 얻을 수 있습니다. 그런데 만약 아래와 같이 함수를 호출하면 어떻게 될까요?

```jsx
sum('10', '20'); // 1020
```

자바스크립트에 익숙한 분들이라면 위 코드의 결과가 그렇게 헷갈리진 않을 겁니다. 숫자 대신 문자열을 더하기 때문에 `10 + 20 = 30`이 아닌 `1020`이라는 결과가 나타납니다.

타입스크립트는 이처럼 의도하지 않은 코드의 동작을 예방할 수 있습니다. 

```tsx
function sumTs(a: number, b: number) {
  return a + b;
}
sumTs('10', '20'); // Error: '10'은 number에 할당될 수 없습니다.
```

다음은 타입 명시로 의도지 않은 코드이 동작을 예방했습니다.

![스크린샷 2021-12-06 오전 11.39.36.png](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-06_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.39.36.png)

이 코드를 VSCode에서 확인하면 다음과 같은 오류를 확인할 수 있습니다.

### **코드 자동 완성과 가이드**

타입스크립트의 또 다른 장점은 코드를 작성할 때 개발 툴의 기능을 최대로 활용할 수 있다는 것입니다. 요즘에 개발을 할 때 가장 많이 사용되는 **`Visual Studio Code`**는 툴의 내부가 타입스크립트로 작성되어 있어 타입스크립트 개발에 최적화 되어 있습니다.

개발자 관점에서 자바스크립트에 타입이 더해졌을 때 어떠한 장점이 있는지 살펴보기 위해 아래 자바스크립트 코드를 살펴보겠습니다.

```jsx
function sumJs(a, b) {
    return a + b;
  }

var total = sum(10, 20);
total.toLocaleString();
```

위 코드는 앞에서 살펴봤던 `sumJS` 함수를 이용하여 두 숫자의 합을 구한 다음 `toLocaleString()`(특정 언어의 표현 방식에 맞게 숫자를 표기하는 API)를 적용한 코드입니다. 여기서 `toLocaleString()`라는 API가 어떤 역할을 하는지가 중요한게 아니라 위와 같이 코드를 작성할 때 `total`이라는 변수의 타입이 코드를 작성하는 시점에 `number` 라는 것을 자바스크립트가 인지하지 못하고 있는게 중요합니다.

즉, 개발자가 스스로 `sumJs` 함수의 결과를 예상하고 타입이 `number`라고 가정한 상태에서 `number`의 API인 `toLocaleString()`를 코딩하게 되는 것이죠. 이 과정을 보면 아래와 같습니다.

![스크린샷 2021-12-06 오전 11.55.26.png](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-06_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.55.26.png)

위에서 볼 수 있듯이 `total`이라는 값이 정해져 있지 않기 때문에 자바스크립트 Number에서 제공하는 API인 `toLocaleString()`을 일일이 작성했습니다. 만약에 오탈자라도 나서 `toLocalString()`이라고 했다면 이 `sumJs` 함수를 실행했을 때만 오류를 확인할 수 있었을 겁니다.

그렇다면 만약 타입스크립트로 작성하면 어떻게 될까요?

```tsx
function sumTs(a: number, b: number): number {
return a + b;
}
var total = sumTs(10, 20);
total.toLocaleString();
```

![스크린샷 2021-12-06 오후 12.02.49.png](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.02.49.png)

변수 `total`에 대한 타입이 지정되어 있기 때문에 VSCode에서 해당 타입에 대한 API를 미리 보기로 띄워줄 수 있습니다.

---

# TypeScript Basic

## TypeScript Start

먼저 class 폴더안에 새로운 폴더 12-05-typescript 를 만들어 주세요. 

`**yarn` `init`** 명령어를 입력해주고, 모든 질문에 엔터를 눌러 넘어갑니다. 

이를 통해 **package.json** 파일이 생성됩니다. 

npm 모듈의 경우 npm 명령어를 이용해 설치하거나 yarn을 이용해 설치할 수 있습니다. 

저희는 yarn을 사용해 타입스크립트를 설치하겠습니다.

`**yarn add typescript**`를 입력해주세요.

설치가 완료되면

1. `**node_modules**` 폴더가 생성되며, 안에 **TypeScript**가 동작하는 코드가 적혀있습니다. 
2.  **`package.json`** 파일에 자동으로 설치된 **TypeScript**의 버전이 적혀져 나옵니다.
    
    ```json
    {
      "name": "12-05-typescript",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "typescript": "^4.5.2"
      }
    }
    ```
    

12-05-typescript  폴더의 자바스크립트 파일을 타입스크립트 파일로 컴파일(complile) 변환 할수 있습니다. 

해당 폴더에 index.ts 파일을 만들어주세요

`**$yarn tsc ./index.ts`** 를 입력해주세요.

![스크린샷 2021-12-06 오후 1.51.25.png](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.51.25.png)

해당 디렉토리에 index.js파일이 새로 생성된것을 확인할수 있습니다.

이제 컴파일(complile)을 할때 부가적인 옵션들을 부여할수 있는데 그 옵션들에 대해서 정의할 수 있는 파일이 `**tsconfig.json**` 입니다.

기본적으로 `**key-value**` 의 형태로 정의되어있습니다.

`**yarn tsc --init`** 를 입력하시면 아래와 같은 메세지와 함께 해당 디렉토리에 tsconfig.json 생성됩니다.

```bash
Created a new tsconfig.json with:
TS
target: es2016
module: commonjs
strict: true
esModuleInterop: true
skipLibCheck: true
forceConsistentCasingInFileNames: true
```

tsconfig.json의 컴파일 옵션은 아래 형식을 복사에서 붙여넣기 해주세요. 특별하게 추가할 옵션이 없습니다.

```json
{
    "compilerOptions": {
      "target": "ES2015",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true
    },
    "$schema": "https://json.schemastore.org/tsconfig",
    "display": "Recommended"
  }
```

## String Type

```tsx
// 문자타입
let aaa = "안녕하세요";
aaa = 3;

let bbb: string;
bbb ="반갑습니다"
bbb = 123
```

다음과 같이 index.ts에 `aaa` 에 "안녕하세요"라는 문자열을 선언후 다시 숫자 `3`을 재선언 하게 되면 VScode에서 `'number' 형식은 'string' 형식에 할당할 수 없습니다.`  라는 오류를 확인할수 있습니다.

`bbb`에 `string` 타입을 지정 해주면 `bbb`에는 `string`타입 만 허용합니다.

## Nmber Type

```tsx
// 숫자 타입
let ccc: number = 5
ccc = "333"
```

다음과 같이 index.ts에 `bbb`에 `number`타입을 지정해 주었습니다. `ccc`에는 `number`타입만 허용합니다.

VScode에서 `'string' 형식은 'number' 형식에 할당할 수 없습니다.` 라는 오류를 확인할 수 있습니다.

## Array Type

타입이 `배열`인 경우 간단하게 아래와 같이 선언합니다.

```tsx
let arr: number[] = [1,2,3];
```

또는 아래와 같이 `제네릭`을 사용할 수 있습니다.

```tsx
let arr: Array<number> = [1,2,3];
```

`연산자`를 사용해서 타입을 아래와 같이 정의가 가능합니다.

```tsx
// 배열 타입
let ddd: number[] = [1, 2, 3, 4, 5, 6]
let eee: (number | string)[] = ["1", 2, 3, 4, 5, 6]
let fff: (number[] | string[]) = [1, 2, 3, 4, 5, 6]
```

유니온 타입(Union Type)이란 자바스크립트의 OR 연산자(`||`)와 같이 A이거나 B이다 라는 의미의 타입입니다.

 타입 스크립트 에서는 `|`을 사용해 OR 연산을 합니다.

`ddd`같은 경우에는 `number` 타입으로만 이루어진 배열만을 정의하였습니다.

`eee`는 `string` 이거나 `number`타입의 배열을 허용합니다. 이때 OR 연산자를 사용했습니다.

`fff`는 `string` 으로 이루어진 배열이거나 `number` 로 이루어진 배열만 혀용합니다.

## Object Type

`Object(객체)`의 타입을 지정할 때는 `intertface`를 사용하게 됩니다.

`intertface`는 상호 간에 정의한 약속 혹은 규칙을 의미합니다. 타입스크립트에서의 `intertface`는 보통 다음과 같은 범주에 대해 약속을 정의할 수 있습니다.

- 객체의 스펙(속성과 속성의 타입)
- 함수의 파라미터
- 함수의 스펙(파라미터, 반환 타입 등)
- 배열과 객체를 접근하는 방식
- 클래스

`intertface`를 사용해서 객체에 타입을 정의 해보겠습니다.

```tsx
// 객체 타입
interface IProfile {
    school: string
    age: number
}

let profile: IProfile = {
    school: '다람쥐 초등학교',
    age: 13
}

profile.age = "bbb"
```

다음과 같이 `IProfile` 이라는 `intertface`를 생성해주고 `profile`이라는 객체에 형식을 정의했습니다.

`profile.age`에 `"bbb"`를 재선언 해주었다면, VScode에서 `'string' 형식은 'number' 형식에 할당할 수 없습니다.` 라는 오류를 확인할 수 있습니다.

## TypeScript Decorator

데코레이터는 실행하려는 사용자가 구조를 수정하지 않고 **기존 객체에 새로운 기능을 추가할 수 있도록 하는 디자인 패턴**입니다.

일반적으로 데코레이트 하려는 **함수의 정의 전에 호출**됩니다. 데코레이터는 함수를 인수로 얻고 대가로 새로운 함수로 돌려주는 **cllable(전달받은 object 인자가 호출 가능한지를 판단)구조** 입니다.

자바스크립트를 확장한 언어라고 할 수 있는 **타입 스크립트에서는 실험적인 기능**으로 데코 레이터를 제공하고 있습니다. 따라서 커맨드 라인이나 `tsconfig.json`에서 `experimentalDecorators` 옵션을 추가해 줘야 합니다.

데코레이터는 앞에서 말한 것처럼 **“클래스”, “메서드”, “접근자”, “프로퍼티”, “파라미터”**에 적용할 수 있습니다.

이제 타입 스크립트를 이용해 데코레이터 원리 실습해 보겠습니다.

class 폴더안에 새로운 폴더 12-06-typescript-decorator 를 만들어 주세요. 

`**yarn` `init`** 명령어를 입력해 **package.json** 파일이 생성해주세
  "dependencies": {
    "ts-node": "^10.4.0",
    "typescript": "^4.5.4"
  }
}

```json

```

`**yarn add typescript**`를 입력해 타입스크립트 모듈을 설치해주세요.

`**yarn add ts-node**`를 입력해 ts-node를  설치해 주세요. 타입 스크립트 파일을 실행해 볼 수 있습니다.

`**yarn tsc --init`** 를 입력해 tsconfig.json 생성해주세요.

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

tsconfig.json 은 다음과 같고 `"experimentalDecorators": true` 로 설정해주세요.  

12-06-typescript-decorator에 **decorator.ts 파일을 생성**해 주세요.

```jsx
function qqq(aaaaaa) {
    console.log('################')
    console.log(aaaaaa)
    console.log('################')
}
  
@qqq
class MyClass {

}
```

`$node dev` 를 입력해서 **decorator.ts 파일을 실행**시켜주세요.

![스크린샷 2021-12-27 오후 2.18.03.png](BE%20Day12%20%5B%20DI,%20IoC%20%5D%20NestJS%20+%20TypeScript%20fb49651390fa402b903247358bfb174d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-27_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.18.03.png)

`MyClass` 클래스위에 데코레이터 `qqq` 를 작성했습니다. `MyClass` 클래스가 함수의 매개변수로 받아져서 함수 `qqq` 내부에서 사용되었습니다.

실행 순서를 눈여겨 봐주세요~!