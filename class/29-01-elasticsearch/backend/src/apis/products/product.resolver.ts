import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // 엘라스틱 서치 사용 연습 위해서 주석처리
    // return this.productService.findAll();

    // elasticSearch
    const result = await this.elasticsearchService.search({
      index: 'product',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, ' '));
  }
  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // 엘라스틱 서치 사용 연습 위해서 주석처리
    // this.productService.create({ createProductInput });

    // elastic search practice
    this.elasticsearchService.create({
      id: 'myid1',
      index: 'myproduct',
      document: {
        ...createProductInput,
      },
    });
    // 실제로는 mySQL에 저장할 것. 엘라스틱 서치로 생성하고 그곳에 저장하진 않는다 보통
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매가 완료되었는지 확인
    await this.productService.checkSoldout({ productId });
    // 수정하기
    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    this.productService.delete({ productId });
    return '계정이 삭제되었습니다';
  }
}
