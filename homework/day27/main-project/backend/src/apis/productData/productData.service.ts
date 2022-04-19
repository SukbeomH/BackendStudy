import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { ProductData } from './entities/productData.entity';

@Injectable()
export class ProductDataService {
    constructor(
        @InjectRepository(ProductData)
        private readonly productDataRepository: Repository<ProductData>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly connection: Connection,
    ) {}

    // 상품데이터 생성
    async create({ productId, images }) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 상품데이터 생성
            const productData = this.productDataRepository.create({
                product: productId,
                image: images,
            });
            await queryRunner.manager.save(productData);
            // 데이터 변경을 확정하고 생성 결과를 프론트에 반환
            await queryRunner.commitTransaction();
            return productData;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
        } finally {
            await queryRunner.release();
        }
    }

    // 상품 데이터 업데이트
    async update({ productId, images }) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 기존 상품데이터 찾기
            const oldData = await queryRunner.manager.findOne(ProductData, {
                product: productId,
            });
            // 덮어쓰기
            const newData = await this.productDataRepository.create({
                ...oldData,
                image: images,
            });
            await queryRunner.commitTransaction();
            return newData;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
        } finally {
            await queryRunner.release();
        }
    }
}
