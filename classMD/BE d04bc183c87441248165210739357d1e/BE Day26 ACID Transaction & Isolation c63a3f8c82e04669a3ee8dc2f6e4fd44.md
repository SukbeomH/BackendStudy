# BE Day26 ACID Transaction & Isolation

---

  목차

  

---

# 결제시 발생할 수 있는 문제

상황은 이렇습니다. **결제를 완료했고 결제가 완료되어서 frontend에서 결제된 데이터를 요청받았습니다.** 당연히 백엔드는 이 데이터를 DB에 저장해야 합니다. **이때 결제정보를 저장할 뿐만 아니라 동시에 사용자가 결제한 금액을 누적 결제금액을 칼럼에 최신화 시켜주어야 합니다. 이처럼 한 프로세스에 여러 가지 일을 해야 합니다.** 

그런데 **결제정보는 저장했는데 중간에 에러가 생겨 로직이 끝났다면 결제정보만 저장되고 사용자의 구매 누적금액은 최신화가 되지 않습니다**. 이런 결제 상황에서 발생할 수 있는 문제를 해결하기 위해 `**ACID 트랜잭션**`을 사용합니다.

> **💡  이번엔 NestJS에서 Transaction을 사용해 보겠습니다.**
> 

---

# Transaction

데이터베이스에서의 Transaction 처리는 **Business Logic상 굉장히 중요한 기능**입니다. 예를 들어 서로 다른 트랜잭션들을 처리하는 도중 하나의 단위 트랜잭션에서 에러가 발생한다면 이전에 성공 했던 트랜잭션들을 다시 rollback해야 데이터의 Consistency가 깨지지 않습니다. 

**DB의 Transaction Flow는 간단하게 보면 다음과 같습니다.**

**1. 서로 다른 Transaction을 부분적으로 처리합니다.**

**2. 모든 Transaction이 정상적으로 완료되면 Commit 합니다.**

**3. 만약 Transaction중 하나라도 비정상적으로 처리되면 rollback을 수행합니다.**

## Transaction Process

![스크린샷 2022-02-09 오후 3.55.12.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.55.12.png)

## TypeOrm Transaction Strategies

TypeOrm의 Transaction을 처리하기 위한 다양한 전략이 존재합니다. 간단하게 `@Transactional` 데코레이터를 사용하여 해당 Method 위에서 간편하게 처리할 수도 있고, Callback Style로 처리할 수도 있습니다.

NestJS에서 강력하게 추천하는 방식은 바로 **QueryRunner를 통해 Transaction을 수행하는 것입니다.** 

QueryRunner를 사용하면 Transaction의 **Commit과 Rollback을 수동으로 제어**할 수 있습니다. 

Unit Testing(단위 테스트)를 보다 쉽게 진행할 수 있습니다. 즉 Jest를 통한 Testing 시 Mocking을 좀 더 쉽게 할 수 있습니다.

## Create FrontEnd

앞서 설명 드렸듯이 결제가 되었다는 가정하에 진행하겠습니다.

class 폴더 안에 26-01-point-transaction-frontend 폴더를 만들어 주세요.

26-01-point-transaction-frontend 폴더 안에 21-03-login-oauth-google파일을 모두 붙여 넣어 주세요

26-01-point-transaction-frontend에 FrontEnd 폴더에 `payment.html` 파일을 만들어주세요.

```html
<!-- payment.html  -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>결제하기</title>
    <script
      type="text/javascript"
      src="https://code.jquery.com/jquery-1.12.4.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
    ></script>
    <script
      type="text/javascript"
      src="https://unpkg.com/axios/dist/axios.min.js"
    ></script>
    <script>
      function mypayment() {
        const myAmount = Number(document.getElementById("amount").value);

        const IMP = window.IMP; // 생략 가능
        IMP.init("imp49910675"); // Example: imp00000000
        IMP.request_pay(
          {
            // param
            pg: "html5_inicis",
            pay_method: "card",
            name: "마우스",
            amount: myAmount,
            buyer_email: "gildong@gmail.com",
            buyer_name: "홍길동",
            buyer_tel: "010-4242-4242",
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181",
            m_redirect_url: "", // 모바일 결제후 리다이렉트될 주소!!
          },
          async (rsp) => {
            // callback
            if (rsp.success) {
              // 결제 성공시
              console.log(rsp);

              const data = await axios.post(
                "http://localhost:3000/graphql",
                {
                  query: `
                      mutation {
                        createPointTransaction(impUid: "${rsp.imp_uid}", amount: ${rsp.paid_amount}) {
                          id
                        }
                      }
                    `,
                },
                {
                  headers: {
                    authorization:
                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJzdWIiOiJkZGMxZDkzZi0yNGYyLTQyMWItOGMyZS1lMDA2Y2I5ODhkNjkiLCJpYXQiOjE2NDI5NTkzMDAsImV4cCI6MTY0Mjk2MjkwMH0.CnOk18TsGItY-7MaoAysFo7VRrixKpenbqQZWtriOiE",
                  },
                }
              );

              console.log(data);

              // 결제날짜 결제된 시간, 취소된 시간 등 시간은...??
            } else {
              // 결제 실패시
            }
          }
        );
      }
    </script>
  </head>
  <body>
    결제할 금액: <input type="text" id="amount" />
    <button onclick="mypayment()">결제하기</button>
  </body>
</html>
```

`payment.html` 파일을 다음과 같이 만들어주세요.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>결제하기</title>
    <script
      type="text/javascript"
      src="https://code.jquery.com/jquery-1.12.4.min.js"
    ></script>
    <script
      type="text/javascript"
      src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
    ></script>
    <script
      type="text/javascript"
      src="https://unpkg.com/axios/dist/axios.min.js"
    ></script>
    <script>
      function mypayment() {
        const myAmount = Number(document.getElementById("amount").value);

        const IMP = window.IMP; // 생략 가능
        IMP.init("imp49910675"); // Example: imp00000000
        IMP.request_pay(
          {
            // param
            pg: "html5_inicis",
            pay_method: "card",
            name: "마우스",
            amount: myAmount,
            buyer_email: "gildong@gmail.com",
            buyer_name: "홍길동",
            buyer_tel: "010-4242-4242",
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181",
            m_redirect_url: "", // 모바일 결제후 리다이렉트될 주소!!
          },
          async (rsp) => {
            // callback
            if (rsp.success) {
              // 결제 성공시
              console.log(rsp);

              const data = await axios.post(
                "http://localhost:3000/graphql",
                {
                  query: `
                      mutation {
                        createPointTransaction(impUid: "${rsp.imp_uid}", amount: ${rsp.paid_amount}) {
                          id
                        }
                      }
                    `,
                },
                {
                  headers: {
                    authorization:
                      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJzdWIiOiJhNjY2Njc1YS02MjQ3LTQ2NjktYTQyYy1jNjk4MDQwNWIwODUiLCJpYXQiOjE2NDQwNDgxNTksImV4cCI6MTY0NDA1MTc1OX0.zFC8DbpzQQbCvgGqCfQ05aknU-IkNEIAKyM4uflp9Mc",
                  },
                }
              );

              console.log(data);

              // 결제날짜 결제된 시간, 취소된 시간 등 시간은...??
            } else {
              // 결제 실패시
            }
          }
        );
      }
    </script>
  </head>
  <body>
    결제할 금액: <input type="text" id="amount" />
    <button onclick="mypayment()">결제하기</button>
  </body>
</html>
```

## Create Entity

class 폴더 안에 26-02-point-transaction-backend-entity 폴더를 만들어 주세요.

26-02-point-transaction-backend-entity 폴더 안에 26-01-point-transaction-frontend 폴더안에 파일을 모두 붙여 넣어 주세요.

26-02-point-transaction-backend-entity로 디렉토리를 이동해주세요.

`.src/apis` 에 `pointTransaction` 폴더를 추가해주세요.

pointTransaction 폴더에 entity 폴더를 만들고 entity폴더 안에 `pointTransaction.entity.ts` 파일을 추가해 주세요.

`pointTransaction.entity.ts` 는 다음과 같습니다.

```tsx
//pointTransaction.entity.ts

import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: POINT_TRANSACTION_STATUS_ENUM;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
```

다음과 같이 `entity`를 작성했습니다. 

`Enum`을 사용한 것을 확인할 수 있습니다. **일반적으로 상태를 보여주는 정형화된 데이터를 사용할 때는 Enum으로 관리합니다.**

### Enum?

예를 들어보겠습니다. `Order Table`에서 사용자가 포함되고 `status=1`인 데이터를 읽어와야 합니다. 

`status`는 Order의 상태를 설정해주는 것이며, `id=1`인 경우 `name=Payment` `id=2`는 `name=Cancel`로 `status`를 저장하여 구매가 완료 되었는지 취소했는지 확인합니다.

그런데 단순히 `status=1`로 작성할 경우, **`id = 1`이 무엇을 의미하는지는 작성한 사람만 알 수 있으며, 가독성이 좋지 않습니다.** 이렇게 사용하는 값들이 제한적인 경우 **Enum을 사용해 보완**해주는 것이 좋습니다.

**Enum으로 상수를 설정해 가독성이 좋게 만들고, 값이 변경되거나 추가할 경우 관리가 용이합니다. 또한 상수의 안정성이 보장될 뿐더러 구현 의도가 열거임을 분명히 할 수 있습니다.**

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해서 테이블을 생성해 보겠습니다.

![스크린샷 2022-02-09 오후 5.12.40.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.12.40.png)

`mysql` 에 접속해서 `point_transaction` 테이블의 컬럼의 타입을 확인해보겠습니다.

## Create Point Transaction Backend API

class 폴더 안에 26-03-point-transaction-ACID-transaction 폴더를 만들어 주세요.

26-03-point-transaction-ACID-transaction 폴더 안에 26-02-point-transaction-backend-entity 폴더안에 파일을 모두 붙여 넣어 주세요.

`.src/apis/pointTransaction` 디렉토리로 이동해서 `pointTransaction.module.ts`, `pointTransaction.resolver.ts` , `pointTransaction.service.ts` 를 만들어주세요.

```tsx
//app.module.ts

import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/board/board.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductModule } from './apis/product/product.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    AuthModule,
    BoardModule,
    PointTransactionModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'mydb',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
```

`app.module.ts` 에 `PointTransactionModule` 을 추가해주세요.

```tsx
//pointTransaction.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionResolver } from './pointTransaction.resolver';
import { PointTransactionService } from './pointTransaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([PointTransaction, User])],
  providers: [
    PointTransactionResolver, //
    PointTransactionService,
  ],
})
export class PointTransactionModule {}
```

`pointTransaction.module.ts` 다음과 같이 수정해주세요.

```tsx
//pointTransaction.resolver.ts

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.pointTransactionService.create({ impUid, amount, currentUser });
  }
}
```

`pointTransaction.resolver.ts` 다음과 같이 수정해주세요.

`@UseGuards(GqlAuthAccessGuard)` 를 사용했습니다. 즉 로그인한 사용자만 이 기능을 사용 가능합니다.

이전에 **payment.html**에서 결제가 성공적으로 이루어졌을 때 다음과 같이 frontend가 데이터를 넘겨줍니다.

![dfssdfs.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/dfssdfs.png)

- `imp_uid` 는 아임포트에서 전달받은 결제 id입니다.
- `paid_amount` 는 실제 결제 금액입니다.

이처럼 다음과 같이 데이터를 전달받아 우리의 DB에 저장해야 합니다.

```tsx
//pointTransaction.service.ts

import {
  BadRequestException,
  HttpException,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 포인트정보 기록
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid,
        amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);

      throw new BadRequestException('그냥에러');

      // 유저포인트 업데이트
      const user = await this.userRepository.findOne({ id: currentUser.id });
      const updatedUser = await this.userRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);

      await queryRunner.commitTransaction();
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
```

Repository는 `@InjectRepository` 데코레이터로 의존성 주입을 하지만, Connection 객체는 이미 TypeOrm Module을 import한 것만으로도 의존성을 가져올 수 있습니다. **이 의존성을 토대로 `createQueryRunner()` 함수를 통해 Transaction Manager를 수행할 수 있습니다**.

`createQueryRunner`함수로 queryRunner를 선언하고, Transaction의 시작을 선언해줍니다. Commit, Rollback을 수동으로 제어할 수 있듯이 Transaction의 시작과 끝 또한 제어할 수 있습니다.

전체 로직을 `try-catch-finally` 로 감싸주고 **Transaction을 처리하는 `save` method는 repository가 아니라 `queryRunner.manager`로 대체해 줍니다.** 

**Error 없이 모든 로직을 수행하면 Transaction이 완료되 `commitTransactioin`을 호출하고, finally에서 `release`함수를 호출해 Transaction을 종료합니다.** 만약 중간에 Error가 발생했을 경우 **catch에서 잡아내서 `rollback`을 수행합니다.** 

> **💡**다음 코드는 중간에 rollback이 정상적으로 수행되는지 확인하기 위해 중간에 Error를 추가했습니다.
> 

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

![스크린샷 2022-01-28 오후 4.36.18.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.36.18.png)

[http://localhost:3000/graphql에](http://localhost:3000/graphql%EC%97%90) 접속해서 플레이그라운드에서 회원가입을 해서 로그인을 통해서 `token` 값을 받아오겠습니다.

![ㅇㄴㄴㅁㅇㅁㄴㅇㅁㄴ.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E3%85%87%E3%84%B4%E3%84%B4%E3%85%81%E3%85%87%E3%85%81%E3%84%B4%E3%85%87%E3%85%81%E3%84%B4.png)

이전에 만들어 놓았던 `payment.html`에 header → authorization → token 값을 방금 전 로그인을 통해 받아온 값으로 변경해 주세요.

![스크린샷 2022-02-10 오전 10.16.22.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.16.22.png)

Open with Live Server로 `payment.html` 을 실행시켜 주세요.

![ㅇㅁㄹㄴㄴㅁㅇㄹㄴㅇㅁㄹㅁㄴㅇ.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E3%85%87%E3%85%81%E3%84%B9%E3%84%B4%E3%84%B4%E3%85%81%E3%85%87%E3%84%B9%E3%84%B4%E3%85%87%E3%85%81%E3%84%B9%E3%85%81%E3%84%B4%E3%85%87.png)

원하는 결제 금액을 설정하시고 결제를 진행해 주세요.

![스크린샷 2022-02-10 오전 10.23.40.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.23.40.png)

![스크린샷 2022-02-10 오전 10.24.05.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.24.05.png)

Mysql를 접속해서 결제 완료된 데이터와 유저의 총 결제 금액이 최신화되지 않았습니다. 

---

# Isolation

Isolation이란 **Transaction의 격리 수준**이라고 합니다. 

즉 동시에 여러 트랜잭션이 처리될 때 특정 트랜잭션이 다른 트랜잭션에서 변경하거나 조회하는 데이터를 볼 수 있도록 허용할지 말지를 결정하는 것입니다. 

**Isolation은 총 4단계를 걸칩니다.**

- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

## READ UNCOMMITTED

각 트랜잭션에서의 변경 내용이 `COMMIT`이나 `ROLLBACK` 여부에 상관 없이 다른 트랜잭션에서 값을 읽을 수 있습니다.

정합성에 문제가 많은 격리 수준이기 때문에 사용하지 않는 것을 권장됩니다.

![스크린샷 2022-02-10 오후 4.49.13.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.49.13.png)

다음 그림과 같이 `Commit`이 되지 않는 상태지만 `Update`된 값을 다른 트랜잭션에서 읽을 수 있습니다.

### Dirty Read

READ UNCOMMITTED는 문제는 `DIRTY READ`현상 발생 되는것입니다. 즉 트랜잭션이 작업이 완료되지 않았는데도 다른 트랜잭션에서 볼 수 있게 되는 현상을 의미합니다.

### EXAMPLE

class 폴더 안에 26-04-point-transaction-ACID-isolation-example 폴더를 만들어 주세요.

26-04-point-transaction-ACID-isolation-example 디렉터리로 이동해서 `$nest new backend`를 입력해서 새로운 프로젝트를 생성해 주세요.

이전에 진행했던 DB 연결을 해주세요.

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
    "@nestjs/jwt": "^8.0.0",
    "@nestjs/passport": "^8.0.1",
    "@nestjs/platform-express": "^8.0.0",
    "@nestjs/typeorm": "^8.0.2",
    "apollo-server-express": "^3.5.0",
    "bcrypt": "^5.0.1",
    "graphql": "^15",
    "mysql2": "^2.3.3",
    "passport": "^0.5.2",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.0",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^7.2.0",
    "typeorm": "^0.2.41"
  },
  "devDependencies": {
    "@nestjs/cli": "^8.0.0",
    "@nestjs/schematics": "^8.0.0",
    "@nestjs/testing": "^8.0.0",
    "@types/bcrypt": "^5.0.0",
    "@types/express": "^4.17.13",
    "@types/jest": "^27.0.1",
    "@types/node": "^16.0.0",
    "@types/passport-google-oauth20": "^2.0.11",
    "@types/passport-jwt": "^3.0.6",
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

`package.json`에 다음을 복사 붙여넣기해서 필요한 모듈을 설치해 주세요.

`$nest g module payment`

`$nest g resolver payment`

`$nest g service payment`

를 입력해서 payment의 **resolver, service, module**을 만들어주세요.

payment 폴더가 생겼다면 `**entity 폴더`를 만들어주시고 `entity 폴더` 안에 `payment.entity.ts` 파일을 만들어주세요.**

src 폴더 안에 apis 폴더를 하나 더 만들어서 payment 폴더를 넣어주세요.

```tsx
//payment.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  amount: number;
}
```

`payment.entity.ts`를 다음과 같이 수정해 주세요.

```tsx
//payment.resolver.ts

import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  createPayment(
    @Args('amount') amount: number, //
  ) {
    return this.paymentService.create({ amount });
  }

  @Query(() => [Payment])
  fetchPayments() {
    return this.paymentService.findAll();
  }
}
```

`payment.resolver.ts`를 다음과 같이 수정해 주세요.

```tsx
//payment.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly connection: Connection,
  ) {}

  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED');
    try {
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);

      // 5초 뒤 특정 이유로 실패
      setTimeout(async () => {
        await queryRunner.rollbackTransaction();
      }, 5000);
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED');
    try {
      // 5초 이내에 조회할 시, 위에서 등록한 금액(커밋되지 않은 금액)이 조회되는 문제
      const payment = await queryRunner.manager.find(Payment);
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }
}
```

`createQueryRunner`를 의존성 주입을 시켜주고 queryRunner를 선언하고, Transaction의 시작을 선언해줍니다. 이때 `'READ UNCOMMITTED'` 를 다음과 같이 입력해주면 **READ UNCOMMITTED Isolation을 사용할수 있습니다.**

`create 비즈니스로직`은 `setTimeout`을 사용해서 **5초 뒤에 특정 이유로 rollback을 시켜줍니다.**

`findAll 비즈니스 로직`은 Transaction을 사용해서 **커밋 되지 않은 금액까지 조회합니다.**

`payment.service.ts`를 다음과 같이 수정해 주세요.

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

![스크린샷 2022-02-10 오후 5.22.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.22.38.png)

[http://localhost:3000/graphql에](http://localhost:3000/graphql%EC%97%90) 접속해서 **플레이그라운드에서 요청을 보내보겠습니다.**

![스크린샷 2022-02-10 오후 5.09.49.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.09.49.png)

다음과 같이 **payment에 데이터를 추가합니다.**

![스크린샷 2022-02-10 오후 5.11.00.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.00.png)

**5초 뒤에 ROLLBACK이 실행되기 때문에 5초 안에 payment를 조회하는 요청을 보내면 데이터가 정상적으로 조회됩니다.**

![스크린샷 2022-02-10 오후 5.26.19.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.26.19.png)

![스크린샷 2022-02-10 오후 5.11.06.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-10_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.06.png)

**5초 뒤 ROLLBACK이 되었다는 로그를 확인하고 payment를 조회하는 요청을 보내면 빈 배열을 반환합니다.**

## **READ COMMITTED & REPEATABLE READ**

RDB(관계형 데이터베이스)에서 대부분 기본적으로 사용되고 있는 격리 수준입니다.

Dirty Read와 같은 현상은 발생하지 않습니다.

실제 테이블 값을 가져오는 것이 아니라 Undo 영역에 백업된 레코드에서 값을 가져옵니다.

### Problem Of READ COMMITTED

![스크린샷 2022-02-11 오후 3.28.14.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.28.14.png)

- `트랜잭션-1`이 Commit한 이후 아직 끝나지 않는 `트랜잭션-2`가 다시 테이블 값을 읽으면 값이 변경됨을 알 수 있습니다.
- 하나의 트랜잭션내에서 똑같은 SELECT 쿼리를 실행했을 때는 항상 같은 결과를 가져와야 하는 `REPEATABLE READ`의 정합성에 어긋나게 됩니다.
- 이러한 문제는 주로 입금, 출금 처리가 진행되는 금전적인 처리에서 주로 발생하며 이런한 현상은 데이터의 정합성은 깨지고, 버그는 찾기 어려워 집니다.

### **REPEATABLE READ**

MySQL에서는 트랜잭션마다 트랜잭션 ID를 부여하여 트랜잭션 ID보다 작은 트랜잭션 번호에서 변경한 것만 읽게 됩니다.

Undo 공간에 백업해두고 실제 레코드 값을 변경합니다.

- 백업된 데이터는 불필요하다고 판단하는 시점에 주기적으로 삭제합니다.
- Undo에 백업된 레코드가 많아지면 MySQL 서버의 처리 성능이 떨어질 수 있습니다.

이러한 변경방식은 [MVCC(Multi Version Concurrency Control)](https://en.wikipedia.org/wiki/Multiversion_concurrency_control)라고 부릅니다.

![스크린샷 2022-02-11 오후 3.36.49.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.36.49.png)

### EXAMPLE

이번에는 READ COMMITED과 NON REPEATABLE READ에 대해서 실습해 보겠습니다.

이전에 READ UNCOMMITED에 실습했던 `25-02-point-transaction-ACID-isolation-example` 폴더로 들어가주세요.

이전에 만들어 놓았던 `./src/apis/payment`로 이동해서 `payment.service.02.read-committed-with-non-repeatable-read.ts` 파일을 만들어주세요.

```tsx
//payment.service.02.read-committed-with-non-repeatable-read.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly connection: Connection,
  ) {}

  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      // 하나의 트랜잭션 내에서 500원이 조회된 경우,
      // 해당 트랜잭션이 끝나기 전까지는 다시 조회하더라도 항상 500원이 반복적으로 조회(Repeatable-Read)되어야 함
      // 아래에서 1초간 반복 조회를 하는 중에 등록 요청을 할시, Repeatable-Read가 보장되지 않음
      setInterval(async () => {
        const payment = await queryRunner.manager.find(Payment);
        console.log(payment);
      }, 1000);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }
}
```

`create` 비즈니스 로직은 Transaction을 사용해서 payment에 데이터를 조회하며, commit까지 진행합니다.

`findAll` 비즈니스 로직은 Commit을 진행하지 않고 setInterval을 사용해서 반복적으로 조회할 때 항상 같은 결과를 갖고 오는지 **즉 REPEATABLE READ의 정합성에 타당한지 확인해 보겠습니다.**

`ayment.service.02.read-committed-with-non-repeatable-read.ts` 를 다음과 같이 수정해주세요.

```tsx
//payment.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service.02.read-committed-with-non-repeatable-read';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
```

```tsx
//payment.resolver.ts

import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service.02.read-committed-with-non-repeatable-read';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  createPayment(
    @Args('amount') amount: number, //
  ) {
    return this.paymentService.create({ amount });
  }

  @Query(() => [Payment])
  fetchPayments() {
    return this.paymentService.findAll();
  }
}
```

다음과 같이 resolver와 module에서 다음과 같이 import를 수정해 주세요.

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

[http://localhost:3000/graphql에](http://localhost:3000/graphql%EC%97%90) 접속해서 **플레이그라운드에서 요청을 보내보겠습니다.**

![스크린샷 2022-02-11 오후 4.22.12.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.22.12.png)

`createPayment`를 사용해서 데이터를 하나 추가합니다.

![스크린샷 2022-02-11 오후 4.20.26.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.20.26.png)

`fetchPayments`를 사용해서 payment테이블의 전체 데이터를 조회합니다. 

![스크린샷 2022-02-11 오후 4.20.55.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.20.55.png)

콘솔창을 확인하면 1초에 한번씩 데이터를 조회합니다.

![스크린샷 2022-02-11 오후 4.21.18.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.21.18.png)

`createPayment`를 사용해서 데이터를 하나 더 추가합니다.

![스크린샷 2022-02-11 오후 4.21.29.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.21.29.png)

콘솔창을 확인하면 1초에 한번씩 반복적으로 데이터를 조회하는데 500원만 조회되어야 하는데 600원 까지 조회됩니다. 이런한 현상을 `NON REPEATABLE READ`라고 합니다.

## **SERIALIZABLE**

REPEATABLE READ에 종종 다른 트랜잭션에서 수행한 변경 작업에 의해 레코드가 보였다가 안 보였다가 하는 현상이 발생합니다. 이런 문제를 **PHANTOM READ**라고 합니다.

### PHANTOM READ

![스크린샷 2022-02-11 오후 4.49.34.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.49.34.png)

다음과 같은 `PHANTOM READ` 가 발생하지 않기 위해서 `SERIALIZABLE` 를 사용합니다.

**성능 측면에서는 동시 처리성능이 가장 낮으며 가장 단순한 격리 수준이지만 가장 엄격합니다.**

데이터베이스에서는 거의 사용되지 않습니다.

### EXAMPLE

이번에는 `PHANTOM READ` 가 발생하지 않기 위해서 `SERIALIZABLE` 를 실습해 보겠습니다.

이전에 READ COMMITED에 실습했던 `25-02-point-transaction-ACID-isolation-example` 폴더로 들어가주세요.

이전에 만들어 놓았던 `./src/apis/payment`로 이동해서 `payment.service.04.serializable.ts` 파일을 만들어주세요.

```tsx
//payment.service.04.serializable.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly connection: Connection,
  ) {}

  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 조회시 락을 걸고 조회함으로써, 다른 쿼리에서 조회할시 대기시킴
      const payment = await queryRunner.manager.find(Payment, {
        lock: { mode: 'pessimistic_write' },
      });
      console.log(payment);

      // 처리에 10초간의 시간이 걸림을 가정
      setTimeout(async () => {
        await queryRunner.commitTransaction();
      }, 10000);
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 조회를 요청해 보지만, 락이 풀릴 때까지 대기(1줄 이상의 데이터 넣고 실습)
      const payment = await queryRunner.manager.find(Payment);
      console.log('==============');
      console.log(payment);
      console.log('==============');
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }
}
```

`findAll` 비즈니스 로직에 Transaction을 사용하여 조회하며 `lock: { mode: 'pessimistic_write' }` 을 사용해서 쓰기 잠금을 걸었습니다.

`create` 비즈니스 로직에는 조회를 실행하지만 이전에 **DB에 데이터가 존재해야 합니다.**

`payment.service.04.serializable.ts` 다음과 같이 수정해 주세요.

```tsx
//payment.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service.04.serializable';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
```

```tsx
//payment.resolver.ts

import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service.04.serializable';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => [Payment])
  createPayment(
    @Args('amount') amount: number, //
  ) {
    return this.paymentService.create({ amount });
  }

  @Query(() => [Payment])
  fetchPayments() {
    return this.paymentService.findAll();
  }
}
```

다음과 같이 resolver와 module을 다음과 같이 수정해 주세요.

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

[http://localhost:3000/graphql에](http://localhost:3000/graphql%EC%97%90) 접속해서 **플레이그라운드에서 요청을 보내보겠습니다.**

![스크린샷 2022-02-11 오후 5.09.07.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.09.07.png)

![스크린샷 2022-02-11 오후 5.09.59.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.09.59.png)

**fetchPayments** 요청을 보내서 데이터를 조회하는데 1**0초 뒤에 COMMIT 로그가 나오는 걸 확인할 수 있습니다. 다시 요청을 한 번 더 보내겠습니다.**

![스크린샷 2022-02-11 오후 5.08.53.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.08.53.png)

**COMMIT 로그가 나오기 전에 createPayment 요청을 보내면 다음과 같이 대기를 합니다.**

![스크린샷 2022-02-11 오후 5.15.45.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.15.45.png)

![스크린샷 2022-02-11 오후 5.16.30.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.16.30.png)

**10초가 지나서 COMMIT 후 LOCK이 풀리고 난 뒤에 정상적으로 응답을 받습니다.**

---

# ISOLATION 실습

class 폴더 안에 26-05-point-transaction-ACID-isolation 폴더를 만들어 주세요.

26-05-point-transaction-ACID-isolation 폴더 안에 26-03-point-transaction-ACID-transaction 폴더안에 파일을 모두 붙여 넣어 주세요.

`.src/apis/pointTransaction/pointTransaction.service.ts`를 다음과 같이 수정해주세요. 

```tsx
//pointTransaction.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 포인트정보 기록
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid,
        amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);

      // 유저포인트 업데이트
      const user = await queryRunner.manager.findOne(
        User,
        { id: currentUser.id },
        { lock: { mode: 'pessimistic_write' } },
      );

      const updatedUser = await this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
```

**ISOLATION 4단계인 `Transaction('SERIALIZABLE')` 을 사용하겠습니다.**

유저 포인트를 업데이트하기 위해서 현재 사용자의 포인트를 찾아올 때 `{ lock: { mode: 'pessimistic_write' } }`를 사용해서 **쓰기 잠금을 걸었습니다.**

![스크린샷 2022-02-09 오후 5.11.38.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.11.38.png)

`yarn start:dev`를 입력해 서버를 실행해주세요.

![스크린샷 2022-01-28 오후 4.36.18.png](BE%20Day22%20Access%20Token,%20Refresh%20Token%20Google%20Login%20ea1ad6a774534bd8a7c552fbe59c3d74/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-28_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.36.18.png)

[http://localhost:3000/graphql에](http://localhost:3000/graphql%EC%97%90) 접속해서 플레이그라운드에서 회원가입을 해서 로그인을 통해서 `token` 값을 받아오겠습니다.

![ㅇㄴㄴㅁㅇㅁㄴㅇㅁㄴ.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E3%85%87%E3%84%B4%E3%84%B4%E3%85%81%E3%85%87%E3%85%81%E3%84%B4%E3%85%87%E3%85%81%E3%84%B4.png)

이전에 만들어 놓았던 `payment.html`에 header → authorization → token 값을 방금 전 로그인을 통해 받아온 값으로 변경해 주세요.

![스크린샷 2022-02-11 오후 5.44.22.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.44.22.png)

Open with Live Server로 `payment.html` 을 실행시켜 주세요.

![ㅇㅁㄹㄴㄴㅁㅇㄹㄴㅇㅁㄹㅁㄴㅇ.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E3%85%87%E3%85%81%E3%84%B9%E3%84%B4%E3%84%B4%E3%85%81%E3%85%87%E3%84%B9%E3%84%B4%E3%85%87%E3%85%81%E3%84%B9%E3%85%81%E3%84%B4%E3%85%87.png)

**원하는 결제 금액을 설정하시고 결제를 진행해 주세요.**

![스크린샷 2022-02-13 오후 8.07.42.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.07.42.png)

**결제가 완료되면 다음과 같은 로그를 확인할 수 있습니다. `TRANSACTION ISOLATION LEVEL SERIALIZABLE` 이 실행된 걸 확인 가능합니다.**

![스크린샷 2022-02-13 오후 8.08.42.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.08.42.png)

![스크린샷 2022-02-13 오후 8.09.56.png](BE%20Day26%20ACID%20Transaction%20&%20Isolation%20c63a3f8c82e04669a3ee8dc2f6e4fd44/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-02-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.09.56.png)

**Mysql를 접속해서 결제 완료된 데이터와 유저의 총 결제 금액이 최신화된 것을 확인할 수 있습니다.**