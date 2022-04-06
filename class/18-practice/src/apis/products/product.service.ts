import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

interface IdDelete {
  productId: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    // 카테고리를 데이터베이스에 저장
    const result = await this.productRepository.save({
      //   name: createProductInput.name,
      //   price: createProductInput.price,
      //   description: createProductInput.description,
      ...createProductInput,
    });
    return result;
  }

  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const newProduct = { ...product, ...updateProductInput };

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

  async delete({ productId }: IdDelete) {
    // 완전 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 삭제여부 칼럼 추가로 소프트 딜리트
    // const product = await this.productRepository.findOne({ id: productId });
    // product.isDeleted = true;
    // const result = await this.productRepository.save(product);
    // return result.isDeleted ? true : false;
    //
    // 삭제 시점 기록으로 삭제여부 결정
    // const product = await this.productRepository.findOne({ id: productId });
    // product.deletedAt = new Date();
    // const result = await this.productRepository.save(product);
    // return result.deletedAt ? true : false;

    // TypeORM 내부 함수로 삭제등록
    const result = await this.productRepository.softRemove({ id: productId });
    return result.deletedAt ? true : false;
  }
}
// try{}catch(){}finally{}
