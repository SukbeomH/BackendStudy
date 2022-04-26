# BE Day16 Table

**목차**

  

---

# 1 : 1 테이블 생성

`13-07-nestjs-with-graphql-typeorm-mysql` 폴더를 복사 붙여넣기 해, 사본을 만들어줍니다.

폴더명을 `16-01-mysql-one-to-one` 으로 변경해주세요. 

## TypeORM

`board.entity.ts` 파일을 보면, 우리는 게시판 클래스를 만들어놨습니다.

```tsx
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
```

이번에는 상품과 상품 위치에 대한 entity도 만들고, 서로 연결시켜보겠습니다.  

그래프큐엘은 하지 않고, typeorm만 해주겠습니다.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled.png)

`apis` 폴더에  `product`와 `productSaleslocation` 폴더를 새로 만들고,

각 폴더에 새 폴더 `entities`를 만들고,

그 안에 새로운 파일 `product.entity.ts`와 `productSaleslocation.entity.ts` 파일을 만들어줍니다.

`productSaleslocation.entity.ts` 파일 안에 `ProductSaleslocation` 클래스를 만들어줍니다.

```tsx
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  addressDetail: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column({ type: 'timestamp' })
  meetingTime: Date;
}
```

`product.entity.ts` 파일 안에 `Product` 클래스를 만들고, 

`ProductSaleslocation`를   **JoinColumn**과 **OneToOne**으로 연결해줍니다. 

```tsx
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

```

`@JoinColumn()`은 한쪽 테이블에만 적어야 합니다. 

`@OneToOne()` 은 한쪽에만 쓰거나, 양쪽에 써줄 수 있습니다. 여기서는 **Product**에만 써주겠습니다. 

`app.module.ts` 파일에 방금 만든 클래스를 **entities**에 추가해줘야합니다.

기존의 방식대로 배열에 직접 하나씩 넣어줄 수도있지만(`entities: [Board]`), 

양이 많아질수록 효율적이지 않습니다.  

따라서, apis 폴더 밑에 있는 entity 파일은 다 적용되도록 다음과 같이 바꿔줍니다. 

`entities: [__dirname + '/apis/**/*.entity.*']`

현재 파일이 있는 절대경로에서 apis 폴더 안에 끝까지 들어가서, 

파일명 중간에 **.entity.**이 들어간 파일들을 선택한다는 뜻입니다. 

`app.module.ts` 파일

```tsx
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/board/board.module';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_database', // 로컬 환경일 경우 localhost
      port: 3306,
      username: 'root',
      password: 'root', // 본인이 설정한 비밀번호
      database: 'myproject', // 변경
      entities: [__dirname + '/apis/**/*.entity.*'], // 변경
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

## Docker 설정

`docker-compose.yaml` 파일에서

**my_database**의 **environment**에  `MYSQL_DATABASE: 'myproject'`를 추가해주세요. 

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
            MYSQL_DATABASE: 'myproject'
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

이제 도커를 띄워보겠습니다.

터미널에서 해당 폴더로 이동해 `docker-compose build` 후 `docker-compose up` 해주세요.

테이블이 잘 만들어졌는지 dbeaver로 확인해보겠습니다. 

새로 DB에 연결하는 버튼을 누르고, mysql을 선택해주세요.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%201.png)

Username에 root, 비밀번호도 root라고 적고, `Driver properties`로 이동해주세요.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%202.png)

`Driver properties`에 `allowPubicKeyRetrieval`를 `true`로 바꿔준 후 완료를 눌러주세요.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%203.png)

왼쪽에 생긴 localhost를 눌러 

`엔티티 관계도`가 내가 만든 erd랑 같은지 비교해보세요! 👏

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%204.png)

<aside>
⚠️ **Access denied for user 'root'@'localhost’ 에러가 발생한다면 !
- Mac 사용자**
   터미널에서 `mysql.server stop` 과 `brew services stop mysql` 명령어를 입력하고, 다시 dbeaver로 접속을 시도해보세요.
**- Windows 사용자**
  윈도우 검색창에 ‘서비스’ 입력해 실행해주고, 
  `MySQL80`을 찾아 우클릭 > 속성 > 중지를 눌러주세요. 
  중지가 됐다면, 다시 dbeaver로 접속을 시도해보세요.

</aside>

---

# 1 : N 테이블 생성

`16-01-mysql-one-to-one` 폴더를 복사 붙여넣기 해 사본을 만든 후, 

폴더명을 `16-02-mysql-many-to-one`으로 바꿔주세요.

앞서 **product**와 **productSaleslocation** 테이블을 만들었습니다.

이번에는 `ProductCategory` 폴더 만들고 안에 `entities` 폴더 만들어 안에 새 파일을 만들어주세요.

`productCategory.entity.ts` 파일을 만들고 **ProductCategory** 클래스를 작성해줍니다.

```tsx
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
```

마찬가지로, user 폴더를 만들고, 안에 `entities` 폴더 만들어 안에 새 파일을 만들어주세요.

`user.entity.ts` 파일을 만들고, **User** 클래스를 작성해줍니다. 

```tsx
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

이렇게 만들어준 유저(**User**)와 카테고리(**ProductCategory**)를 

상품(**Product**)에 `ManyToOne`으로 연결하겠습니다.

`product.entity.ts` 파일에 추가해 보겠습니다. 

```tsx
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

// user 연결
  @ManyToOne(() => User)
  user: User;

// 카테고리 연결
  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;
}
```

컨테이너를 띄워보겠습니다. 

터미널에서 해당 폴더로 이동 해 `docker-compose build` 후, `docker-compose up` 명령어를 입력해주세요.

dbeaver에 들어가 확인해보겠습니다.

새로운 연결을 만들어줍니다.

Username에 root, 비밀번호도 root로 적고, `Driver properties`로 이동해주세요. 

`Driver properties`에 `allowPubicKeyRetrieval`를 `true`로 바꿔준 후 완료를 눌러주세요.

엔티티 관계도를 확인해봅니다.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%205.png)

---

# N:M 테이블 생성

`16-02-mysql-many-to-one` 폴더를 복사 붙여넣기 해 사본을 만들어줍니다. 

폴더 이름을 `16-03-mysql-many-to-many` 로 변경합니다. 

아래의 경로에 맞게 새 폴더를 만들어주고, `productTag.entity.ts` 파일을 만들어주세요.

src 폴더 > apis 폴더 > productTag > entities > productTag.entity.ts

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%206.png)

`productTag.entity.ts` 파일 안에 **ProductTag** 클래스를 만들어주세요.

```tsx
import { Product } from 'src/apis/product/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.productTags)
  products: Product[];
}
```

**products** 컬럼을 **ManyToMany**로 연결해주겠습니다. 

`product.entity.ts` 파일에 **ManyToMany**로 **`productTags`**를 연결해주세요. 

```tsx
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productTag/entities/productTag.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTag) => productTag.products)
  productTags: ProductTag[];
}
```

**`ManyToMany`**는 둘 중 하나에 **`JoinTable()`** 걸어줘야하기 때문에, **Product** 클래스에서 해주겠습니다. 

컨테이너를 띄우고, dbeaver로 접속해 엔티티 관계도를 확인해보겠습니다.

먼저 터미널에서 16-03 폴더 위치로 이동해, `docker-compose build` 후, `docker-compose up` 해주세요. 

dbeaver로 접속해보면, 상품과 태그가 연결되어있는 것을 확인할 수 있습니다.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%207.png)

---

# SQL 쿼리 작성하기

이번에는 직접 SQL 쿼리문을 작성해보겠습니다. 

16-03의 컨테이너는 계속 실행이 되있는 상태를 유지해주세요. 

## MySQL in Docker

도커를 통해 직접 컨테이너 안으로 들어가, mysql에 접속해보겠습니다. 

다른 터미널을 열어 16-03 폴더 위치로 이동한 후, `docker ps` 로 mysql이 실행되고 있는

컨테이너의 아이디를 복사합니다. 

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%208.png)

복사한 아이디를 가지고, `docker exec -it 컨테이너_아이디 /bin/bash` 명령어를 입력해 컨테이너 안으로 들어갑니다. 

`mysql -u root -p`  를 입력해 root 유저로 로그인하려고하면, 

비밀번호를 입력하라고 나오고, 이때 `root` 라고 적어줍니다. 

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%209.png)

`mysql>` 라고 나온다면, 잘 접속 됐습니다. 

이제 sql 쿼리문을 작성해보겠습니다.

`show databases;` 를 적고 엔터를 치면 데이터베이스의 목록이 나타나게됩니다.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2010.png)

`use myproject;` 를 하면, 그 중에서 myproject라는 데이터베이스를 선택해 이후 명령어를 수행하게 됩니다. 

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2011.png)

**myproject** 데이터베이스를 사용하겠다고 한 상태에서,

 `show tables;` 명령어를 입력하면 해당 데이터베이스가 가지고 있는 테이블의 목록을 보여줍니다. 

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2012.png)

우리가 만들었던 테이블들이 보이죠? ✨

이 중에서 product 테이블이 어떻게 구성되어 있나 보려고합니다. 

`desc product;` 명령어를 통해 알 수 있습니다.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2013.png)

---

## Script in DBeaver

방금은 도커 컨테이너 안으로 직접 들어가 명령어를 직접 쳤습니다.

이번에는 DBeaver를 이용해서 SQL문을 작성해보겠습니다. 

`DBeaver`에서 도커 컨테이너로 띄운 mysql 서버에 접속한 후 

`SQL 버튼`을 누르면 스크립트를 작성할 수 있는 창이 뜨게 됩니다. 

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2014.png)

열린 스크립트 창에 아래와 같이 SQL문을 적어줍니다.

앞서, 도커 컨테이너에서 적었던 명령어와 같은 내용입니다.

```sql
show databases;
use myproject;
show tables;
desc product;
```

 

실행하는 방법은 실행하고자하는 명령어를 한줄 드래그하고 `컨트롤 키`와 `엔터`를 동시에 누릅니다.

각각을 한줄씩 실행했을때, 아래와 같은 결과물을 볼 수 있습니다.

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2015.png)

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2016.png)

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2017.png)

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2018.png)

이번에는 **User** 테이블에 SQL문으로 데이터를 직접 넣어보겠습니다. 

스크립트 창에 아래와 같이 적고 컨트롤 키와 엔터키를 동시에 눌러 실행해주세요.

```sql
insert into user(id, email, password) values(uuid(), 'chulsoo@gmail.com', '1234');
```

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2019.png)

잘 들어갔는지, 유저 테이블 들어가서 새로고침으로 확인해보세요. ✨

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2020.png)

이번에는 쿼리문으로 조회해보겠습니다. 

```sql
select * from user;
select email from user;
```

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2021.png)

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2022.png)

잘 나오는것을 확인할 수 있습니다. 👏

상품도 추가해볼까요? 

```sql
insert into product(id, name, description, price, isSoldout) values(uuid(), '마우스', '좋은 마우스', 1000, false);
```

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2023.png)

`컨트롤 + 엔터`로 실행해주세요.

조회해봅시다.

```sql
select * from product;
```

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2024.png)

유저와 상품에 한개씩 데이터를 넣어봤는데요. 이 두개를 연결해보겠습니다. 

데이터를 업데이트해서 상품에 유저를 연결하겠습니다. 

아까 생성된 `유저의 아이디`를 복사해주세요. 

상품 데이터에 유저 아이디를 추가하도록 데이터를 업데이트할건데, 모든 상품이 바뀌면 안되겠죠.

어떤 상품을 업데이트하기 원하는지 조건을 `where`에 적어줍니다. 

```sql
update product 
	set userId = '유저_아이디_복붙'
	where name = '마우스';
```

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2025.png)

상품 데이터에 유저 아이디를 넣어줬으니, 두개의 테이블 합쳐서 한번에 조회해보겠습니다. 

```sql
select * from product, user;
```

![Untitled](BE%20Day16%20Table%2016aa5f5fe41b42508b0fc43c4d1b6bc3/Untitled%2026.png)

위와 같이 두 테이블의 정보가 모두 보이면 잘하셨습니다. 👏👏👏👏