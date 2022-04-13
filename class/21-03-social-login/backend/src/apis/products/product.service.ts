import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    // // 카테고리를 데이터베이스에 저장
    // const result = await this.productRepository.save({
    //   //   name: createProductInput.name,
    //   //   price: createProductInput.price,
    //   //   description: createProductInput.description,
    //   ...createProductInput,
    // });

    // // 2. 상품과 거래위치를 동시에 등록하려는 경우
    // const { productSaleslocation, productCategoryId, ...product } =
    //   createProductInput;

    // const temp = await this.productSaleslocationRepository.save({
    //   ...createProductInput.ProductSaleslocation,
    // });
    // const result = await this.productRepository.save({
    //   ...product,
    //   // productSaleslocation: { id: temp.id }, 이 경우 프론트단에서 쿼리요청을 하더라도, id 외에는 받을수가 없다.
    //   productSaleslocation: temp,
    // });
    // return result;

    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;
    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    // product tags
    const result2 = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      // 이미 등록된 태그인지 확인
      const prevTag = await this.productTagRepository.findOne({
        name: tagname,
      });
      // 기존에 이미 등록된 태그라면
      if (prevTag) {
        result2.push(prevTag);

        // 없던 새로운 태그라면
      } else {
        const newTag = await this.productTagRepository.save({
          name: tagname,
        });
        result2.push(newTag);
      }
    }
    // await가 for문 안에서 돌면 시간이 오래걸리므로, forEach를 이용하면 동시에 활용 가능
    // Promise.all 개념을 통해 통째로 기다리는 방법이 있다.

    return await this.productRepository.save({
      ...product,
      productSaleslocation: result,
      productCategory: {
        id: productCategoryId,
      },
      productTags: result2,
    });
  }

  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const newProduct = {
      ...product,
      ...updateProductInput,
    };

    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매가 완료된 상품');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매가 완료된 상품',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // // 1. 실제로 데이터를 삭제. 되돌릴 수 없다.
    // const result = await this.productRepository.delete({ id: productId });
    // result.affected ? true : false;

    // // 2. 삭제한 데이터인지 여부를 표기함
    // this.productRepository.update({ id: productId }, { deleteAt: true });

    // // 3. 삭제한 시점을 기록해서 구분함
    // this.productRepository.update({ id: productId }, { deleteAt: new Date() });

    // // 4. TypeORM 내장 기능 - softRemove
    // this.productRepository.softRemove({ id: productId }); // id로만 삭제가능

    // 5. TypeORM 내장 기능 - softDelete
    const result = await this.productRepository.softDelete({
      id: productId,
    }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
