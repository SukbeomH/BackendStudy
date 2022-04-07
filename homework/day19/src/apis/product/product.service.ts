import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll() {
        const result = await this.productRepository.find({
            relations: ['user'],
        });
        return result;
    }

    async findAllWithDelete() {
        const result = await this.productRepository.find({
            withDeleted: true,
            relations: ['user'],
        });
        return result;
    }

    async findOne({ productId }) {
        const result = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['user'],
        });
        return result;
    }

    async create({ createProductInput }) {
        const { userId, ...temp } = createProductInput;
        const result1 = await this.userRepository.save({
            ...userId,
        });
        const result2 = await this.productRepository.save({
            ...temp,
            user: result1,
        });
        return result2;
    }

    async update({ productId, updateProductInput }) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['user'],
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
        const result = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['user'],
        });
        return result;
    }
}
