# BE Day19 Delete & Join

**목차**

  

---

# 기본 Delete

지난 시간까지 API에서 Create, Read, Update를 만들어봤습니다.

이제는 Delete를 해볼 차례입니다. 

먼저 `17-05-product-crud-update-with-error` 폴더를 복사 붙여넣기해 사본을 만들고, 

폴더 이름을 `18-01-product-crud-delete`로 변경해줍니다. 

**src** > **apis** > **product** > `product.resolver.ts` 에 상품을 삭제하는 API `deleteProduct`를 추가해주세요. 

```tsx
  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string,
  ) {
    return this.productService.delete({ productId });
  }
```

`productId` 를 받아서 productService에 있는 `delete` 함수에 넘겨줍니다. 

**src** > **apis** > **product** > `product.service.ts` 파일에 **interface IDelete**와 **delete** 함수를 만들어줍니다.

```tsx
interface IDelete {
  productId: string;
}  

...

async delete({ productId }: IDelete) {
  const result = await this.productRepository.delete({ id: productId });
  return result.affected ? true : false;
}
```

DB에서 product의 id가 넘겨받은 `productId`와 일치하는 데이터를 삭제해줍니다. 

## 실습

로컬 환경에서 직접 해보겠습니다. 

터미널에서 해당 폴더 위치로 이동해주세요. 

node_modules 폴더가 없다면 `yarn install`을 해줍니다.

`app.module.ts` 파일에서 mysql 연결 부분이 로컬 환경에 맞게 설정되었나 확인해주세요.

```jsx
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/board/board.module';
import { ProductModule } from './apis/product/product.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 로컬 환경
      port: 3306,
      username: 'root',
      password: 'rootroot', // mysql 설치할 때 설정한 비밀번호
      database: 'mysql',
      entities: [__dirname + '/apis/**/*.entity.*'],
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

`yarn start:dev` 로 nest 를 실행시킵니다. 

mysql이 켜져있지 않다면 따로 실행시켜주세요. 

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled.png)

[http://localhost:3000/graphql](http://localhost:3000/graphql) 에 접속해 삭제 API를 요청해보겠습니다. 

삭제를 하기 위해서 먼저 상품을 몇개 추가해주세요. 

```graphql
mutation {
  createProduct(createProductInput : {
    name : "마우스", 
    description : "좋은 마우스",
    price : 1000
  	}
  ){
    id
  }
}
```

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%201.png)

여기서 `마우스2`를 상품을 삭제해보겠습니다. 

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%202.png)

디비버에서 확인해보면 `마우스2` 상품이 아예 사라졌습니다.

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%203.png)

---

# 물리 삭제 vs 논리 삭제

위에서 해본 것처럼 삭제를 한다면, 데이터 베이스에서 완전히 사라져버립니다. (물리 삭제)

그런데 삭제를 하고보니 데이터를 잘못 삭제해서 복구하고 싶을 수도 있고, 어떤걸 삭제했는지 다시 보고 싶을 수도 있습니다.

그래서 실무에서는 아예 데이터를 날려버리는 방법 대신, 삭제 여부를 나타내는 속석을 추가해 가짜로 삭제하는 방법을 많이 사용합니다.

이런 것을 두고 `soft delete` (논리 삭제)라고 부릅니다. 

이런 방식으로 삭제를 하기 위해서 typeORM에서 제공해주는 `soft delete` 와 `soft remove` 함수가 있습니다. 하지만 그전에 먼저 직접 구현해보겠습니다. 

## isDeleted 컬럼

첫번째 방법은 `product`에 `isDeleted` 라는 속성을 추가로 만들어서, 삭제 여부를 알 수 있게 하는 것입니다. 

그리고 데이터를 조회할 때는 isDeleted가 `false`인 것만 가져오면 됩니다. 

서버를 종료합니다. 

`product.entity.ts` 파일에 **isDeleted**를 추가해줍니다. 

```tsx
@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // ...생략

  @Column({ default: false })
  @Field(() => Boolean)
  isDeleted: boolean;

}
```

`product.service.ts` 파일에서 delete 함수 실행 시 **isDeleted**를 `true`로 업데이트하도록 고쳐줍니다.

```tsx
async delete({ productId }: IDelete) {
    // 1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });

    // 2. 소프트 삭제(직접 구현) - isDeleted
    const product = await this.productRepository.findOne({ id: productId })
    product.isDeleted = true
    const result = await this.productRepository.save(product)

		return result.isDeleted ? true : false;
  }
```

dbeaver에서 product 관련 테이블을 모두 drop해줍니다.

서버를 다시 띄워줍니다.

새로 키보드 상품을 2개 추가한 상태에서 삭제를 해보겠습니다.

기본값으로는 `false`가 들어가는데 mysql에서는 0으로 보입니다. 

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%204.png)

여기서 키보드1 상품을 삭제하면 isDeleted가 0에서 1로 변경됩니다. (false → true)

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%205.png)

---

따라서 데이터를 조회할 때는 **isDeleted**가 `false`인 것만 가져오면 됩니다. 

---

## deletedAt 컬럼

데이터가 삭제되었는지와 함께 언제 삭제 됐는지도 중요하기 때문에

삭제됐는지와 삭제된 시간을 동시에 알 수 있도록 `deletedAt` 컬럼을 만들어 삭제할 때의 시간을 기록합니다. 

기본값은 따로 정하지 않았기 때문에 처음에는 null입니다. 

따라서 조회할 때는 `deletedAt`이 `null`이 아닌 것만 찾아와야합니다. 

서버를 종료하고,

`product.entity.ts` 파일에 **deletedAt**를 추가해줍니다. 

```tsx
@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // ...생략

  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
```

`product.service.ts` 파일에서 delete 함수 실행 시 **deletedAt** 을 현재 시간으로 업데이트하도록 고쳐줍니다.

```tsx
async delete({ productId }: IDelete) {
    // 1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // const product = await this.productRepository.findOne({ id: productId })
    // product.isDeleted = true
    // const result = await this.productRepository.save(product) => 찾을때는 isDeleted가 false 인 것만 찾기
    // return result.isDeleted ? true : false;

    // 3. 소프트 삭제(직접 구현) - deletedAt
    const product = await this.productRepository.findOne({ id: productId });
    product.deletedAt = new Date();
    const result = await this.productRepository.save(product);

		return result.deletedAt ? true : false;
  }
```

dbeaver에서 product 관련 테이블을 모두 drop해줍니다.

서버를 다시 띄워줍니다.

플레이그라운드에서 키보드 상품을 추가하면, deletedAt이 null인 상태로 데이터가 추가됩니다. 

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%206.png)

플레이그라운드에서 **deleteProduct**를 요청한 후에 다시 확인해보면,

삭제했을때의 시간이 저장되어있습니다.

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%207.png)

---

# softRemove

typeORM에서 제공해주는 함수 중 `softRemove`를 사용해보겠습니다. 

`product.entity.ts` 파일에 **DeleteDateColumn**을 추가해줍니다.

```tsx

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

	// ...생략

  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: boolean;

  // @Column({ type: 'timestamp', nullable: true })
  // @Field(() => Date, { nullable: true })
  // deletedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
```

**DeleteDateColumn**에서 옵션을 따로 적어주지 않으면 기본값으로 삭제된 시간을 `datetime` 타입으로 저장합니다. 

직접 구현했을때와 다르게, 데이터를 조회할때 조건을 주지 않아도 삭제 되지 않은 데이터만 조회됩니다. 

`product.service.ts` 파일에서 **softRemove**로 삭제해줍니다. 

```tsx
async delete({ productId }: IDelete) {
    // 1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });

    // 2. 소프트 삭제(직접 구현) - 1
    // const product = await this.productRepository.findOne({ id: productId })
    // product.isDeleted = true
    // const result = await this.productRepository.save(product) => 찾을때는 isDeleted가 false 인 것만 찾기
    // return result.isDeleted ? true : false;

    // 3. 소프트 삭제(직접 구현) - 2
    // const product = await this.productRepository.findOne({ id: productId });
    // product.deletedAt = new Date();
    // const result = await this.productRepository.save(product); //=> 찾을때는 deletedAt이 null 인 것만 찾기

    // 3. 소프트 삭제(TypeORM 자체 제공) - 1
    const result = await this.productRepository.softRemove({ id: productId });

    return result.deletedAt ? true : false;
  }
```

직접 API로 테스트를 해보면, 

상품을 createProduct로 추가하고, deleteProduct로 삭제하면 deletedAt에 삭제한 시간이 저장됩니다.

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%208.png)

그리고 `find`로 별다른 조건을 주지 않고 조회해도, 삭제된 상품은 나오지 않습니다. 

```tsx
async findAll() {
  const products = await this.productRepository.find();
  return products;
}
```

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%209.png)

---

# softDelete

마찬가지로 typeORM에서 지원해주는 또다른 함수 `softDelete`를 사용해보겠습니다. 

entity 부분은 그대로 둡니다.

`product.service.ts` 파일을 수정합니다. 

```tsx
async delete({ productId }: IDelete) {
    // 1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });

    // 2. 소프트 삭제(직접 구현) - 1
    // const product = await this.productRepository.findOne({ id: productId })
    // product.isDeleted = true
    // const result = await this.productRepository.save(product) => 찾을때는 isDeleted가 false 인 것만 찾기
    // return result.isDeleted ? true : false;

    // 3. 소프트 삭제(직접 구현) - 2
    // const product = await this.productRepository.findOne({ id: productId });
    // product.deletedAt = new Date();
    // const result = await this.productRepository.save(product); //=> 찾을때는 deletedAt이 null 인 것만 찾기

    // 3. 소프트 삭제(TypeORM 자체 제공) - 1
    // const result = await this.productRepository.softRemove({ id: productId });
    // id로만 삭제 가능
    // return result.deletedAt ? true : false;

    // 4. 소프트 삭제(TypeORM 자체 제공) - 2
    const result = await this.productRepository.softDelete({ id: productId }); // 모든조건 삭제 가능
    return result.affected ? true : false;
  }
```

`softDelete`는 `softRemove`와 다르게 여러 행(Row)을 삭제할 수 있습니다. 

그래서 result에 `affected` 값이 들어있는데 이는 삭제된 행의 갯수가 숫자로 담겨있습니다. 

플레이그라운드에서 테스트해보면, softRemove와 같은 결과를 얻을 수 있습니다. 

---

# JOIN API 구현

## 1 : 1 관계 create

1 : 1 관계인 하나의 테이블에 데이터가 생성되면 관계있는 다른 테이블에도 데이터가 생성되어야합니다. 

`18-02-product-crud-delete-soft` 폴더를 복사 붙여넣기해 사본을 만들고, 

`18-03-product-crud-create-one-to-one` 로 폴더 이름을 변경해주세요. 

주소와 ↔ 상품의 관계는 1:1입니다. 

즉, 상품을 create 할 때, 주소도 생성되어야합니다. 

src > apis > productSaleslocation 위치에 `dto` 폴더를 만들고, 

`productSaleslocation.input.ts` 파일을 새로 생성합니다.

그 파일 안에 `ProductSaleslocationInput` 클래스를 작성합니다. 

```tsx
import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {
  // @Field(() => String)
  // address: string;
  // ...
  // => 위처럼 모두 적어야 하지만, PickType 또는 OmitType을 활용하여 타입 재사용
}
```

src > apis > product > dto 폴더 안에 있는

`createProduct.input.ts` 파일에 **productSaleslocation**을 추가해줍니다. 

```tsx
@Field(() => ProductSaleslocationInput)
productSaleslocation: ProductSaleslocationInput;
```

클라이언트에서 createProduct API를 요청할 때,

1. 상품 주소 테이블에 데이터를 등록하고
2. 주소 등록한 것을 가지고 상품 테이블에 데이터를 등록합니다.

product에서 productSaleslocation을 사용하기 위해서

`product.module.ts` 파일에 **ProductSaleslocation**을 추가해줍니다. 

```tsx
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
```

`product.service.ts` 파일에서도 추가해줍니다. 

```tsx
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

// ProductSaleslocation 추가
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

// ...생략
```

동일한 파일에서 `create` 함수를 수정합니다. 

기존에는 product 테이블에만 데이터를 등록했지만, 이제는 다른 테이블도 연결해줍니다. 

```tsx
async create({ createProductInput }: ICreate) {
    // 1. 하나씩 나열하기
    // const product = await this.productRepository.save({
    //   name: createProductInput.name,
    //   description: createProductInput.description,
    //   price: createProductInput.price,
    // });

    // 2. 스프레드연산자 사용하기
    // const product = await this.productRepository.save({
    //   ...createProductInput,
    // });

    // 3. 다른 테이블도 연결하여 등록하기
    const { productSaleslocation, ...product } = createProductInput;
    const result1 = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });
    const result2 = await this.productRepository.save({
      ...product,
      productSaleslocation: result1,
    });
    return result2;
  }
```

서버를 띄운 후, 플레이그라운드에서 createProduct API를 요청해보면 

다음과 같이 DB에 저장되는것을 확인할 수 있습니다. 

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%2010.png)

---

## 1 : 1 관계 read

이제 추가된 데이터를 조회해보겠습니다. 

`18-03-product-crud-create-one-to-one` 폴더를 복사 붙여넣기 해 사본을 만들고,

폴더명을 `18-04-product-crud-read-one-to-one`로 변경합니다. 

`product.service.ts` 파일에서 **findAll** 함수와 **findOne** 함수를 수정합니다. 

DB에서 상품 테이블의 데이터를 조회할 때, `relations` 옵션을 추가해 주어 연관된 다른 테이블(productSaleslocation)의 데이터도 함께 찾아오도록 합니다. 

```tsx
async findAll() {
    const products = await this.productRepository.find({
      relations: ['productSaleslocation'],
    });
    return products;
  }

  async findOne({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation'],
    });
    return product;
  }
```

터미널에서 해당 폴더로 이동 후 `yarn install`을 해주고 서버를 띄워줍니다. 

플레이그라운드에서 `createProduct` 후, `fetchProducts`를 해보면 위치 정보까지 잘 가져오는것을 확인할 수 있습니다. 

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%2011.png)

---

## 1 : N 관계 read

`18-04-product-crud-read-one-to-one` 폴더의 사본을 만들어 폴더명을 `18-05-product-crud-create-read-many-to-one`로 변경합니다. 

카테고리와 상품은 1 : N 관계입니다. 

상품 데이터를 추가할때, 카테고리도 새로 추가되는것은 아닙니다. 

이미 등록되어있는 카테고리를 찾아서 상품에 넣어주기만합니다. 

src > apis > product > dto에 위치한

`createProduct.input.ts` 파일에 `productCategoryId`도 추가합니다. 

```tsx
// ...생략

@Field(() => String)
productCategoryId: string
```

`product.service.ts` 파일에 ProductCategory를 주입해줍니다.

```tsx
@InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
```

같은 파일에서 `create` 함수를 수정합니다. 

```tsx
async create({ createProductInput }: ICreate) {
    // 1. 하나씩 나열하기
    // const product = await this.productRepository.save({
    //   name: createProductInput.name,
    //   description: createProductInput.description,
    //   price: createProductInput.price,
    // });

    // 2. 스프레드연산자 사용하기
    // const product = await this.productRepository.save({
    //   ...createProductInput,
    // });

    // 3. 다른 테이블도 연결하여 등록하기
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;
    const result1 = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });
    const result2 = await this.productCategoryRepository.findOne({
      id: productCategoryId,
    });
    const result3 = await this.productRepository.save({
      ...product,
      productSaleslocation: result1,
      productCategory: result2,
    });
    return result3;
  }
```

조회할때 카테고리 데이터도 같이 조회하기 위해 `relations` 옵션에 `productCategory`를 추가해줍니다. 

```tsx
  async findAll() {
    const products = await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
    return products;
  }

  async findOne({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
    return product;
  }
```

상품 모듈(`product.module.ts`)에도 **ProductCategory**를 추가합니다. 

```tsx
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductCategory,
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
```

로컬에 서버 띄운 후, 플레이그라운드에서 카테고리를 먼저 만들겠습니다. 

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%2012.png)

만들어진 카테고리 아이디를 가지고, 상품을 생성해주세요.

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%2013.png)

`fetchProducts` API를 요청하면, 카테고리도 잘 가져오는 것을 확인할 수 있습니다. 

![Untitled](BE%20Day19%20Delete%20&%20Join%20a7bc8249c86840059548669fccbd57f5/Untitled%2014.png)

---

# 연관된 테이블에서의 삭제

서로 엮여있는 관계에서는 한 테이블에서 데이터를 삭제하면 연관된 테이블의 데이터도 같이 삭제해줘야합니다.

예를들어 상품의 카테고리를 삭제하면, 그 카테고리의 상품들이 모두 같이 삭제되어야합니다. 

`18-05-product-crud-create-read-many-to-one` 폴더의 사본을 만들고 폴더명을 `18-06-product-crud-delete-cascade` 으로 변경해주세요. 

카테고리를 삭제하는 API가 **src > apis > productCategory 폴더 안에** 있습니다. 

`**productCategory.resolver.ts**`

```tsx
	product.entity.ts

@Mutation(()=> Boolean)
  deleteProductCategory(
    @Args('productCategoryId') productCategoryId: string
  ) {
    return this.productCategoryService.delete({ productCategoryId })
  }
```

 ****

`**productCategory.service.ts**` 

```tsx
async delete({ productCategoryId }) {
    const result = await this.productCategoryRepository.delete({ id: productCategoryId })
    return result.affected ? true : false
  }
```

`product.entity.ts` 파일에서 **CASCADE** 옵션을 추가해줍니다. 

```tsx
@ManyToOne(() => ProductCategory, { onDelete: 'CASCADE' })
@Field(() => ProductCategory)
productCategory: ProductCategory;
```

이제 카테고리를 삭제하면 해당 카테고리 안에 상품들도 함께 삭제됩니다.