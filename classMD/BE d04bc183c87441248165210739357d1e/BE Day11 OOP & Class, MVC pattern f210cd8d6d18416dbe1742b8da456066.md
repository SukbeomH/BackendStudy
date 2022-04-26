# BE Day11 OOP & Class, MVC pattern

**목차**

  

---

---

# Class 와 객체지향프로그래밍(OOP)

## Class란?

`클래스(class)`는 객체 지향 프로그래밍에서 특정 **객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로, 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)**로 구성됩니다.

즉 `클래스(class)`란 물건 만드는 설명서라고 생각하시면 됩니다.

실무에선 사용자나 물건같이 동일한 종류의 객체를 여러 개 생성해야 하는 경우에 `클래스(class)` 를 사용합니다.

이번에는 `클래스(class)`의 기본적인 문법에 대해서 알아보겠습니다.

class 폴더안에 새로운 폴더 **`11-01-class-and-OOP`** 를 만들어 주시고 **`index.js`** 파일을 만들어주세요.

```jsx
class Monster{
  power = 10

  constructor(attackStep){
    if(attackStep) this.power = attackStep
  }

  attack(){
    console.log("공격하자!!!")
    console.log("내 공격력은" + this.power + "야!!!")
  }

  fly(){
    console.log("날라서 ! 도망가자!!")
  }

}

const monster1 = new Monster()
monster1.attack()
monster1.fly()

const strongMonster = new Monster(50)
strongMonster.attack()
strongMonster.fly()
```

`new Montser()` :  **new 연산자와 생성자 함수**를 사용해 새로운 객체를 생성했습니다.

`Monster 클래스` 를 만들어서 `attack()` 메서드와 `fly()`  메서드를  만들었습니다.

`constructor()`는 `new`에 의해 자동으로 호출됩니다. 

`strongMonster` 는 넘겨받은 인수와 함께 `constructor`가 자동으로 실행됩니다. 

이때 인수 **50**이 **attackStep**이라는 이름으로 `this.power`에 할당됩니다.

`monster.attack()`  : 같은 방법으로 객체 메서드를 사용했습니다.

꼭 위과 같이 작성 후에 **index.js** 파일을 실행시켜보세요.

---

### Date 클래스

```jsx
/**
class Date{
	getFullYear(){
	 }
	getMonth(){
	 }
}
**/

const aaa = new Date()
console.log(aaa.getFullYear())
aaa.getMonth()
```

이전에 자바스크립트의 Date 객체에 대해서 배웠던거 기억하시죠?

`aaa` 에 `Date 객체` 를 할당하면 `aaa` 는 `.getMonth` 와 `.getFullYear`객체 메서드를 사용할수 있습니다. 

Date라는 클래스와 객체 메서드를 만든 적이 없지만 자동으로 내장해 갖고 있습니다. 

이러한 객체를 **내장 객체**라고 합니다.

이제 class에 대해서 기본적인 개념을 숙지하셨길 바랍니다. 

다음과 같이 **객체를 이용해서 프로그래밍을 한 것을 객체지향프로그래밍(OOP)**라고 합니다.

이제 객체지향프로그래밍(OOP)에 대해서 좀 더 자세히 알아보겠습니다.

## 객체지향프로그래밍(OOP)?

- **컴퓨터 프로그래밍의 패러다임** 중 하나입니다.
- 객체 지향 프로그래밍은 컴퓨터 프로그램을 명령어의 목록으로 보는 시각에서 벗어나 여러 개의 독립된 단위, 즉 "객체"들의 모임으로 파악하고자 하는 것입니다.
- 객체지향 프로그래밍이란 **인간 중심적 프로그래밍 패러다임**이라고 할 수 있습니다.

### 객체지향프로그래밍(OOP)**의 4가지 특징**

### 1. **추상화(Abstraction)**

- 추상화는 **목적과 관련이 없는 부분을 제거**하여 필요한 부분만을 표현합니다.
- 사물들의 공통적인 특징, 즉 **추상된 특징을 파악해 인식의 대상**으로 삼는 행위를 말합니다.
- 추상화는 **구체적인 사물들의 공통적인 특징을 파악해서 이를 하나의 개념(집합)**으로 다루는 수단입니다.
    
    
    [https://camo.githubusercontent.com/7da29cdbd24063ad7bf826bed6243c7550275e8babf795788f3de219311f4f56/68747470733a2f2f696d616765732e76656c6f672e696f2f696d616765732f686b6a61303131312f706f73742f35656561633465642d383862662d343338622d613932322d3735616362343234363931322f696d6167652e706e67](https://camo.githubusercontent.com/7da29cdbd24063ad7bf826bed6243c7550275e8babf795788f3de219311f4f56/68747470733a2f2f696d616765732e76656c6f672e696f2f696d616765732f686b6a61303131312f706f73742f35656561633465642d383862662d343338622d613932322d3735616362343234363931322f696d6167652e706e67)
    

### 2. **캡슐화(Encapsulation)**

캡슐화란 하나의 객체에 대해 그 객체가 특정한 목적을 위한 필요한 변수나 메소드를 하나로 묶는 것을 의미합니다.

- 응집도 : 클래스나 모듈 안의 요소가 얼마나 밀접하게 관려있는지를 나타냅니다.
- 결합도 : 어떤 기능을 실행하는 데 다른 클래스나 모듈에 얼마나 의존하는지 나타냅니다.

**정보은닉**

캡슐화는 **정보은닉을 통해 높은 응집도와 낮은 결합력**을 갖게 합니다. 

- 필요가 없는 정보는 외부에서 접근하지 못하도록 제한하는 것입니다.
- **private 키워드**를 통해 데이터를 보호해 접근을 제한합니다.

### 3. **상속성(Inheritance)**

상속이란 기존 상위 클래스에 근거하여 새롭게 클래스와 행위를 정의할 수 있게 도와주는 개념입니다.

- 기존 클래스의 **기능을 가져와 재사용**할 수 있으면서도 **새로운 기능을 추가**할 수 있게 해줍니다.
- 여러 개체가 가진 공통된 특성을 부각시켜 하나의 개념이나 법칙으로 성립시키는 과정입니다.
- 따라서 같은 특징있는 클래스를 그대로 물려받아, 다시 작성할 필요없이 재사용으로 효율성을 늘립니다.
- 이를 통해 **다형성을 확보**할 수 있습니다.

### 4. **다형성(polymorphism)**

다형성은 상속을 통해 기능을 확장하거나 변경하는 것을 가능하게 해줍니다. 즉, 다형성은 형태가 같은데 다른 기능을 하고 서로 다른 클래스의 객체가 같은 메시지를 받았을 때 각자의 방식으로 동작하는 능력입니다.

- 다형성은 **상속과 연계되어 동작하면 매우 강력한 힘**을 발휘합니다.
- 다형성과 일반화 관계는 코드를 간결하게 하여 재사용과 유지보수가 용이하도록 도와주고 변화에도 유연하게 대처할 수 있게 해줍니다.

**오버라이딩(Overriding)**

- 부모 클래스에서 상속받은 자식 클래스에서 부모 클래스에서 만들어진 메서드를 자신의 입맛대로 다시 **재정의해서 사용**하는 것을 말합니다.

**오버로딩(Overloading)**

- 같은 이름의 메서드를 사용하지만 메서드마다 **다른 용도로 사용되며 그 결과물도 다르게 구현할 수 있게 만드는 개념**입니다.
- 오버로딩이 가능하려면 메서드끼리 이름은 같지만 매개변수의 갯수나 데이터 타입이 다르면 오버로딩이 적용됩니다.

---

## express를 이용한 API-01

class 폴더안에 새로운 폴더 **`11-02-express-1`** 을 만들어 주세요.

`yarn init` 통해 **package.json** 파일을 생성해주시고 **"type": "module"** 을 추가해주세요.

`yarn add express` 를 입력해 express를 설치해주세요.

```json
{
  "name": "11-02-express-1",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "type": "module",
  "dependencies": {
    "express": "^4.17.2"
  }
}
```

**package.json** 파일의 내부는 다음과 같습니다.

index.js 파일을 만들어 주세요.

```jsx
import express from 'express'

const app = express()

// 상품 구매하기
app.post('/product/buy', function (req, res) {
    res.send('상품을 구매합니다.')
})

// 상품 환불하기
app.post('/product/refund', function (req, res) {
    res.send('상품을 환불합니다.')
})

app.listen(3000)
```

다음과 같이 실제 DB와 연결은 안 되지만 **express를 이용해 상품 구매하기 상품 환불하기 api**를 만들어주세요. 

## express를 이용한 API-02

class 폴더 안에 새로운 폴더 **11-03-express-2** 을 만들어 주세요.

**11-01-express-1 폴더 안에 파일을 모두 붙여넣기 해주세요.**

이번에는 이전에 `index.js`에 작성해 놓았던 API에 검증하는 코드를 더했습니다.

```jsx
import express from 'express'

const app = express()

// 상품 구매하기
app.post('/product/buy', function (req, res) {
    // 1. 가진돈 검증하는 코드(10줄)
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

    // 2. 판매여부 검증하는 코드(10줄)
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

    // 3. 상품 구매하는 코드
    // if(돈있음 && 판매중) {
        res.send('상품을 구매합니다.')
    // }
})

// 상품 환불하기
app.post('/product/refund', function (req, res) {
    // 1. 판매여부 검증하는 코드(10줄)
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

    // 2. 상품 환불하는 코드
    // if(판매완료){
        res.send('상품을 환불합니다.')
    // }
})

app.listen(3000)
```

실제로 검증하는 로직을 작성하지는 않았지만 여기서 여러분께 말씀드리고 싶은 **핵심은 객체지향프로그래밍(OOP)을 하지 않으면 이처럼 코드의 길이가 길어져 가독성이 현저히 떨어지게 됩니다.**

그렇다면 이제부터 객체지향프로그래밍(OOP)을 사용하여 API를 작성해 보겠습니다.

## express와 객체지향프로그래밍(OOP)를 활용한 실습

class 폴더 안에 새로운 폴더 **11-04-express-2-with-OOP** 을 만들어 주세요.

**11-02-express-2 폴더 안에 파일을 모두 붙여넣기 해주세요.**

앞서 언급했듯이 객체지향프로그래밍(OOP)을 사용해 기존에 작성했던 API를 수정하겠습니다.

`product.js`  파일을 만들어서 판매 여부를 검증하는 기능을 만들어 보겠습니다.

```jsx
export class ProductService {

    checkSoldout() {
        // 판매여부 검증하는 코드(10줄)
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

`ProductService` 라는 class를 만들었습니다.

판매 여부를 검증하는 코드를`checkSoldout()` 라는 객체 메서드에 만들었습니다.

외부에서 불러올 수 있도록 class 앞에 export 해주었습니다.

`cash.js`  파일을 만들어서 가진돈을 검증하는 기능을 만들어 보겠습니다.

```jsx
export class CashService {
    
    checkValue(){
        // 1. 가진돈 검증하는 코드(10줄)
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

`CashService` 라는 class를 만들었습니다.

가진돈을 검증하는 코드를`checkValue()` 라는 객체 메서드에 만들었습니다.

외부에서 불러올 수 있도록 class 앞에 export 해주었습니다.

`index.js` 파일을 수정하겠습니다. 

```jsx
import express from 'express'
import { ProductService } from './product.js'
import { CashService } from './cash.js'

const app = express()

// 상품 구매하기
app.post('/product/buy', function (req, res) {
    // 1. 가진돈 검증하는 코드(10줄 => 2줄)
    const moneyService = new CashService()
    const hasMoney = moneyService.checkValue() // true 또는 false

    // 2. 판매여부 검증하는 코드(10줄 => 2줄)
    const productService = new ProductService()
    const isSoldout = productService.checkSoldout() // true 또는 false

    // 3. 상품 구매하는 코드
    if(hasMoney && !isSoldout) {
        res.send('상품을 구매합니다.')
    }
})

// 상품 환불하기
app.post('/product/refund', function (req, res) {
    // 1. 판매여부 검증하는 코드(10줄 => 2줄)
    const productService = new ProductService()
    const isSoldout = productService.checkSoldout() // true 또는 false

    // 2. 상품 환불하는 코드
    if(isSoldout){
        res.send('상품을 환불합니다.')
    }
})

app.listen(3000)
```

상품을 구매하는 기능에 가진 돈을 검증하기 위해서 new 연산자를 통해서 `CashService()`  **moneyService 변수에 할당했습니다.**

**moneyService**는 `checkValue()` 객체 메서드를 사용해 가진돈을 검증합니다. 

이러한 방법으로 판매여부 검증하게 됩니다.

상품 환불하기 기능에 동일하게 판매 여부를 검증해야 하는데 **객체지향프로그래밍(OOP)을 사용하면 다음과 같이 동일하게 메서드를 재사용이 가능하고 추후에 유지 보수도 간편합니다.**

한눈에 봐도 **메인 index.js 파일이 간편해진 것을 볼 수 있습니다.**

---

# MVC 패턴

## Design Pattern?

디자인 패턴이란 프로그램이나 어떤 특정한 것을 개발하는 중에 발생했던 문제점들을 정리해서 상황에 따라 간편하게 적용해서 쓸 수 있는 것을 정리하여 **특정한 "규약"을 통해 쉽게 쓸 수 있는 형태**로 만든 것을 말합니다.

디자인 패턴에는 스트래티지 패턴, 옵저버 패턴 등등 정말 여러가지가 있고 그 중에 **하나가 바로 MVC패턴**입니다.

## MVC Pattern

![스크린샷 2021-12-22 오후 1.58.57.png](BE%20Day11%20OOP%20&%20Class,%20MVC%20pattern%20f210cd8d6d18416dbe1742b8da456066/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.58.57.png)

MVC 는 **Model, View, Controller**의 약자 입니다. 하나의 애플리케이션, 프로젝트를 구성할 때 그 **구성요소를 세가지의 역할로 구분한 패턴**입니다.

위의 그림처럼 사용자가 controller를 조작하면 controller는 model을 통해서 데이터를 가져오고 그 정보를 바탕으로 시각적인 표현을 담당하는 View를 제어해서 사용자에게 전달하게 됩니다. 

## Why MVC Pattern?

사용자가 보는 페이지, 데이터처리, 그리고 이 2가지를 중간에서 제어하는 컨트롤, 이 3가지로 구성되는 하나의 애플리케이션을 만들면 각각 맡은 바에만 집중을 할 수 있게 됩니다. 공장에서도 하나의 역할들만 담당을 해서 처리를 해서 효율적이게 됩니다. 프로그래밍에서도 마찬가지입니다.

서로 분리되어 각자의 역할에 집중해 개발한다면, 유지보수성, 애플리케이션의 확장성, 그리고 유연성이 증가하고, 중복코딩이라는 문제점 또한 사라지게 됩니다.  

## MVC Pattern 적용하기 -01

class 폴더 안에 새로운 폴더 **11-05-mvc-tight-coupling-with-product** 을 만들어 주세요.

`yarn init` 통해 **package.json** 파일을 생성해주시고 **"type": "module"** 을 추가해주세요.

![스크린샷 2021-12-22 오후 2.48.10.png](BE%20Day11%20OOP%20&%20Class,%20MVC%20pattern%20f210cd8d6d18416dbe1742b8da456066/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-12-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.48.10.png)

`node.js` 환경에서 **11-05-mvc-tight-coupling-with-product의** 디렉토리 구조는 다음과 같습니다. 

다음과 같은 폴더 구조로 만들어주세요.

`.(점)` 은 현재 위치를 나타냅니다.

이전에는 `cash.js와 product.js`에 **상품 검증과 가진 돈 검증**을 진행했었습니다. 

보통 `MVC 패턴`에서는 이런 로직을 **비즈니스 로직이라고 하며, service라고 칭하여 작성**합니다.

```jsx
// product.service.js

export class ProductService {

    checkSoldout() {
        // 판매여부 검증하는 코드(10줄)
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

```jsx
// cash.service.js

export class CashService {
    
    checkValue(){
        // 1. 가진돈 검증하는 코드(10줄)
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

`cash.service.js` 의 위치는 **./mvc/controllers/services/cash.service.js**

`product.service.js` 의 위치는  **./mvc/controllers/services/product.service.js**

이전에는 **`index.js`에 모든** API**요청 대해서 라우팅을 해서 비즈니스 로직을 실행시켰습니다.** 

이렇게 되면 가독성 저하되고 유지 보수 비용이 증가합니다. 

따라서 **기능에 따라 route 경로를 분리합니다.** 

**즉 route에 따른 controller를 작성합니다.**

```jsx
// product.controller.js

import { ProductService } from './services/product.service.js'
import { CashService } from './services/cash.service.js'

export class ProductController {
    
    buyProduct(req, res) {
        // 1. 가진돈 검증하는 코드(10줄 => 2줄)
        const moneyService = new CashService()
        const hasMoney = moneyService.checkValue() // true 또는 false
    
        // 2. 판매여부 검증하는 코드(10줄 => 2줄)
        const productService = new ProductService()
        const isSoldout = productService.checkSoldout() // true 또는 false
    
        // 3. 상품 구매하는 코드
        if(hasMoney && !isSoldout) {
            res.send('상품을 구매합니다.')
        }
    }

    refundProduct(req, res) {
        // 1. 판매여부 검증하는 코드(10줄 => 2줄)
        const productService = new ProductService()
        const isSoldout = productService.checkSoldout() // true 또는 false
    
        // 2. 상품 환불하는 코드
        if(isSoldout){
            res.send('상품을 환불합니다.')
        }
    }

}
```

`product.controller.js` 의 위치는 **./mvc/controllers/product.controller.js** 입니다.

### 강한 결합(Tight Coupling)

`buyProduct` 는  `cashService` 와 `productService` 를 변수로 생성하고, 직접 사용하는데 

이런 관계를 **의존관계(dependency)라고 합니다.**

위와 같이 `controller` 내부에서  **비즈니스 로직을 변수로 선언하여 사용함에 따라 강하게 결합(Tight Coupling)하며 높은 의존성을 갖고 있습니다.**

`index.js` 파일의 위치는 **./index.js**입니다.

```jsx
//index.js

import express from 'express'
import { ProductController } from './mvc/controllers/product.controller'

const app = express()

// 상품 API
const productController = new ProductController()
app.post('/product/buy', productController.buyProduct)
app.post('/product/refund', productController.refundProduct)

app.listen(3000)
```

`index.js` 에는 endPoint 별로 분리하여 라우팅을 핸들링 해줍니다. 

즉, **endPoint 별로 분리하여 controller를 실행시켜 줍니다.**

## MVC Pattern 적용하기 -02

class 폴더 안에 새로운 폴더 **11-06-mvc-tight-coupling-with-product-coupon** 을 만들어 주세요.

**11-06-mvc-tight-coupling-with-product-coupon** 폴더 안에 **11-05-mvc-tight-coupling-with-product** 폴더의 파일을 모두 복사 붙여넣기 해주세요.

이번에는 쿠폰을 구매하는 기능을 추가하겠습니다.

이전에도 언급했듯이 기능에 따라 route 경로를 분리해야 합니다. 따라서 `coupon.controller.js` 파일을 **./mvc/controllers/coupon.controller.js** 에 만들어주세요.

```jsx
import { CashService } from './services/cash.service.js'

export class CouponController {
    
    buyCoupon(req, res) {
        // 1. 가진돈 검증하는 코드(10줄 => 2줄)
        const moneyService = new CashService()
        const hasMoney = moneyService.checkValue() // true 또는 false
    
        // // 2. 쿠폰 구매하는 코드
        if(hasMoney) {
            res.send('쿠폰을 구매합니다.')
        }
    }

}
```

**MVC패턴**을 적용했기 때문에 가진 돈을 검증하는 비즈니스 로직인 **CashService를 재사용이 가능**합니다. 

`buyCoupon` 객체 메서드도 **비즈니스 로직을 변수로 선언하여 사용했기 때문에 강한 결합(Tight Coupling)으로서 높은 의존성을 갖고 있습니다.**

이제 라우팅을 핸들링할 수 있게 `index.js`에도 추가해 주겠습니다.

```jsx
import express from 'express'
import { CouponController } from './mvc/controllers/coupon.controller.js'
import { ProductController } from './mvc/controllers/product.controller.js'

const app = express()

// 쿠폰 API
const couponController = new CouponController()
app.post('/coupon/buy', couponController.buyCoupon)

// 상품 API
const productController = new ProductController()
app.post('/product/buy', productController.buyProduct)
app.post('/product/refund', productController.refundProduct)

app.listen(3000)
```