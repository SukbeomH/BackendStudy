# BE Day20 N : M

**목차**

  

---

# N:M등록

N:M의 테이블에 데이터를 등록해보겠습니다.

class 폴더 안에 `19-01-product-crud-create-many-to-many` 폴더를 만들어 주세요.

18-06-product-crud-delete-cascade 폴더의 내용을 19-01-product-crud-create-many-to-many 폴더에 모두 붙여 넣어 주세요.

`node_modules` 파일을 삭제해 주시고  `yarn install` 을 입력해 필요한 모듈을 모두 설치해 주세요.

![스크린샷 2022-01-11 오후 3.33.31.png](BE%20day17%20GQL%204da58380d74d450d8944c6c692129240/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.33.31.png)

`yarn start:dev` 를 입력해 서버를 실행시켜 주세요.

서버를 실행시키고 **DBeaver를 실행해서 생성된 테이블을 한번 확인해 보겠습니다.**

![ㅇㄴㄹㅇㄹㅇㄴ.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E3%85%87%E3%84%B4%E3%84%B9%E3%85%87%E3%84%B9%E3%85%87%E3%84%B4.png)

`product_product_tags_product_tag` 테이블이 생성된걸 확인할 수 있습니다.

엔티티를 작성하지 않았는데 테이블이 생성되었습니다. 

![31221312312.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/31221312312.png)

N:M 관계를 설정하기 위해서 만들기 위해 다음과 같이 연결해 해두었던 거 기억나시나요?

따라서 `product` 와 `product_tag`의 N:M 관계를 설정해 놓았기 때문에 NestJS는 자동으로 1:N & 1:M의 중간 테이블을 생성해 주었습니다.

엔티티의 관계도는 다음과 같습니다. 

![스크린샷 2022-01-13 오후 2.12.38.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_2.12.38.png)

이제 product 테이블에 데이터를 생성하면서 다른 테이블도 연결하여 등록해 보겠습니다.

다음과 같이 `createProduct.input.ts` 를 수정해주세요. 

```tsx
//createProduct.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';
import { ProductSaleslocationInput } from 'src/apis/productSaleslocation/dto/productSaleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;

  @Field(() => [String])
  productTags: string[];
}
```

product 테이블이 생성되면서 연결되어 있는 테이블도 생성이 가능합니다.

product.service.ts 파일의 `create`를 다음과 같이 수정해 주세요.

```tsx
//product.service.ts

interface ICreate {
  createProductInput: CreateProductInput;
}

export class ProductService{
	async create({ createProductInput }: ICreate) {
		
	    // 다른 테이블도 연결하여 등록하기

			//1. 스프레드 연산자 사용
	    const { productSaleslocation, productCategoryId, productTags, ...product } =
	      createProductInput;
	
			//2. productSaleslocation에 저장
	    const result1 = await this.productSaleslocationRepository.save({
	      ...productSaleslocation,
	    });

			//3. 상품카테고리 읽어오기
	    const result2 = await this.productCategoryRepository.findOne({
	      id: productCategoryId,
	    });

			//4. 이미 존재하는 태그이면 저장을 하지 않고 이미 존재하지 않으면 태그 데이터 저장
	    const result3 = [];
	    if (productTags.length) {

	      // 추후 for문을 forEach와 Promise.all로 최적화 예정
	      for (let i = 0; i < productTags.length; i = i + 1) {
	        const tagname = productTags[i].replace('#', '');
	        const prevTag = await this.productTagRepository.findOne(
	          { name: tagname },
	          { relations: ['products'] },
	        );
	        if (prevTag) {
	          result3.push(prevTag);
	        } else {
	          const newTag = await this.productTagRepository.save({
	            name: tagname,
	          });
	          result3.push(newTag);
	        }
	      }
	    }
	
	    //5. product 등록 <-- 방금 등록/조회한 productTag 포함시켜서 product 등록
	    const result4 = await this.productRepository.save({
	      ...product,
	      productSaleslocation: result1,
	      productCategory: result2,
	      productTags: result3,
	    });
	    return result4;
	  }
}
```

로직을 순서대로 설명 드리겠습니다.

1. `createProductInput` 을 스프레드 연사자를 사용했습니다.
2. `productSaleslocation`에 데이터를 저장했고 result1 에 데이터를 할당했습니다.
3. `productCategory`에 데이터 베이스에 요청된 데이터를 조회합니다.
4. `result3` 빈 배열을 생성해서 태그 앞에 존재하는 ‘#’을 제거하고 **데이터베이스 해당하는 태그를 조회해서 이미 존재하면 `result3`에 추가하고 존재하지 않으면 데이터를 저장하고 `result3`에 추가합니다.**
5. **방금 등록/조회한 productTag 포함시켜서 product를 등록합니다.**

![스크린샷 2022-01-11 오후 3.33.31.png](BE%20day17%20GQL%204da58380d74d450d8944c6c692129240/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.33.31.png)

`$yarn start:dev` 를 입력해 서버를 실행시켜 주세요.

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

![Untitled](BE%20day17%20GQL%204da58380d74d450d8944c6c692129240/Untitled.png)

먼저 상품 카테고리 테이블에 데이터를 생성하기 위해서 `createProductCategoey` 에 요청을 보내겠습니다.

생성된 상품 카테고리 ID를 복사해 주세요

![스크린샷 2022-01-13 오후 4.39.48.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.39.48.png)

다음과 같이 `createProduct` 에 요청을 보내 상품을 등록했습니다.

![스크린샷 2022-01-13 오후 4.46.20.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.46.20.png)

`dbeaver`를 실행해서 상품이 잘 등록되었는데 확인해 보세요.

![스크린샷 2022-01-13 오후 4.46.01.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.46.01.png)

상품 태그의 테이블에 데이터가 잘 등록되었는지도 확인해 보세요.

![스크린샷 2022-01-13 오후 4.47.19.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.47.19.png)

**상품과 상품 태그의 중간 테이블에 데이터가 잘 생성되었는지도 확인해 보세요.**

---

# N:M조회

class 폴더 안에 19-02-product-crud-read-many-to-many 폴더를 만들어 주세요.

19-02-product-crud-read-many-to-many폴더 안에  19-01-product-crud-create-many-to-many  파일을 모두 붙여 넣어 주세요.

`node_modules` 파일을 삭제해 주시고  `yarn install` 을 입력해 필요한 모듈을 모두 설치해 주세요.

이번에는 `product` 테이블을 조회하면서 다른 연결되어 있는 다른 테이블의 데이터도 조회하겠습니다.

다음과 같이 **product.service.ts**에 `findAll()`, `find()`를 수정해 주세요.

```tsx
//product.service.ts

interface ICreate {
  createProductInput: CreateProductInput;
}

export class ProductService{
async findAll() {
    const products = await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
    return products;
  }

  async findOne({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
    return product;
  }
}
```

`findAll()` 은 상품 목록의 모든 데이터를 조회하며, **relations 옵션에 ['productSaleslocation', 'productCategory', 'productTags'] 배열 안에 넣어서 설정**해 주면 관련되어 있는 테이블의 데이터까지 조회가 가능합니다. 

`find()`는 productId에 해당하는 상품만 조회하며, **where 옵션에 { id: productId }로 조건을 달아줘서 해당하는 상품을 찾고** **relations 옵션에 ['productSaleslocation', 'productCategory', 'productTags'] 배열 안에 넣어서 설정**해 주면 조건에 해당하는 상품과 관련되어 있는 테이블의 데이터까지 모두 조회가 가능합니다.

`$yarn start:dev` 를 입력해 서버를 실행시켜 주세요.

![스크린샷 2022-01-11 오후 3.33.31.png](BE%20day17%20GQL%204da58380d74d450d8944c6c692129240/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.33.31.png)

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

다음과 같이 상품 테이블을 조회할 때 연관되어 있는 테이블의 데이터까지 조회된다면 성공입니다.

![스크린샷 2022-01-13 오후 5.58.36.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.58.36.png)

![스크린샷 2022-01-13 오후 5.59.31.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.59.31.png)

---

# 회원가입 API

이제는 로그인을 하기전에 회원가입을 하는 API를 만들어보겠습니다.

class 폴더 안에 `19-03-signup` 폴더를 만들어 주세요.

19-03-signup 폴더 안에 19-02-product-crud-read-many-to-many 폴더의 파일을 모두 붙여 넣어 주세요.

User Entity를 다음과 같이 수정해 주세요. 

password는 외부에 노출되면 안 되기 때문에 다음과 같이 주석 처리했습니다.

```tsx
// user.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) 비밀번호 노출 금지
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;
}
```

`./src/apis/user/user.service.ts` 에 `user.service.ts` 파일을 만들어주세요.

```tsx
//user.service.ts 

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async craete({ email, password, name, age }) {
    return await this.userRepository.save({ email, password, name, age });
  }
}
```

DB에 유저정보를 저장하는 비즈니스 로직은 다음과 같습니다.

`./src/apis/user/user.resolver.ts` 에 `user.resolver.ts` 파일을 만들어 주세요.

```tsx
//user.resolver.ts

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

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
    return this.userService.craete({ email, password, name, age });
  }
}
```

`user.resolver.ts` 파일에 다음과 같이 추가해주세요.

`./src/apis/user/user.module.ts` 에 `user.module.ts`파일을 만들어주세요.

```tsx
//user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserResolver, //
    UserService,
  ],
})
export class UserModule {}
```

`user.module.ts`파일을 다음과 같이 추가해주세요.

![스크린샷 2022-01-11 오후 3.33.31.png](BE%20day17%20GQL%204da58380d74d450d8944c6c692129240/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.33.31.png)

`$yarn start:dev` 를 입력해 서버를 실행시켜 주세요.

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해서 플레이그라운드에서 api 요청해보세요.

![스크린샷 2022-01-17 오후 4.13.29.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.13.29.png)

![스크린샷 2022-01-17 오후 4.13.05.png](BE%20Day20%20N%20M%206d26a26c9ebf42bbaa7bc8f5dc018183/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-01-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.13.05.png)

`DBeaver`를 실행시켰을 때 다음과 같이 데이터가 잘 생성되었다면 회원가입이 성공된 것입니다!