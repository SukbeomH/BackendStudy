import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductData } from '../productData/entities/productData.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductData)
        private readonly productDataRepository: Repository<ProductData>,
    ) {}

    async findAll() {
        const result = await this.productRepository.find({});
        return result;
    }

    async findAllWithDelete() {
        const result = await this.productRepository.find({
            withDeleted: true,
        });
        return result;
    }

    async findOne({ productId }) {
        const result = await this.productRepository.findOne({
            where: { id: productId },
        });
        return result;
    }

    async create({ createProductInput }) {
        const { productData, ...product } = createProductInput;
        const result1 = await this.productDataRepository.save({
            ...productData,
        });
        const result2 = await this.productRepository.save({
            ...product,
            productData: result1,
        });
        return result2;
    }

    async update({ productId, updateProductInput }) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        const newProduct = { ...product, ...updateProductInput };
        const result = await this.productRepository.save(newProduct);
        return result;
    }

    async delete({ productId }) {
        const result = await this.productRepository.softDelete({
            id: productId,
        });
        return result.affected ? true : false;
    }

    async restore({ productId }) {
        await this.productRepository.restore({ id: productId });
        const result = await this.productRepository.findOne({ id: productId });
        return result;
    }
}
