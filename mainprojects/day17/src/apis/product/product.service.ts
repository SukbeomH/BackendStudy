import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

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
        return await this.productRepository.findOne({
            where: { id: productId },
        });
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
}
