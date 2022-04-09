import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductData } from '../productData/entities/productData.entity';
import { User } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductData)
        private readonly productDataRepository: Repository<ProductData>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll() {
        const result = await this.productRepository.find({
            relations: ['cart', 'productData', 'user'],
        });
        return result;
    }

    async findAllWithDelete() {
        const result = await this.productRepository.find({
            withDeleted: true,
            relations: ['cart', 'productData', 'user'],
        });
        return result;
    }

    async findOne({ productId }) {
        const product = await this.productRepository.findOne({ id: productId });
        if (!product)
            throw new ConflictException('검색하려는 상품이 존재하지 않습니다');
        const result = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['cart', 'productData', 'user'],
        });
        return result;
    }

    async create({ createProductInput }) {
        const { productData, userId, ...temp } = createProductInput;
        const result1 = await this.productDataRepository.save({
            ...productData,
        });
        const result2 = await this.userRepository.findOne({
            id: userId,
        });
        const result3 = await this.productRepository.save({
            ...temp,
            productData: result1,
            userId: result2,
        });
        return result3;
    }

    async update({ productId, updateProductInput }) {
        const temp = await this.productRepository.findOne({ id: productId });
        if (!temp)
            throw new ConflictException('수정하려는 상품이 존재하지 않습니다');
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['cart', 'productData', 'user'],
        });
        const newProduct = { ...product, ...updateProductInput };
        const result = await this.productRepository.save(newProduct);
        return result;
    }

    async delete({ productId }) {
        const product = await this.productRepository.findOne({ id: productId });
        if (!product)
            throw new ConflictException('삭제하려는 상품이 존재하지 않습니다');
        const result = await this.productRepository.softDelete({
            id: productId,
        });
        return result.affected ? true : false;
    }

    async restore({ productId }) {
        const product = await this.productRepository.findOne({ id: productId });
        if (!product)
            throw new ConflictException('복원하려는 상품이 존재하지 않습니다');
        await this.productRepository.restore({ id: productId });
        const result = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['cart', 'productData', 'user'],
        });
        return result;
    }
}
