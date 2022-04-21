import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';

@Resolver()
export class ProductResolver {
    constructor(
        private readonly productService: ProductService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}

    @Query(() => Product)
    async fetchProduct(@Args('productId') productId: string) {
        // using redis, is data exist?
        const productCache = await this.cacheManager.get(
            `product:${productId}`,
        );
        // if data is exist at redis cache, return the cached data
        if (productCache) return productCache;

        // if cache doesn't exist, search the DB && keep the result to redis cache
        const product = await this.productService.findOne({ productId });
        await this.cacheManager.set(`product:${productId}`, product, {
            ttl: 0,
        });
        console.log(product);
        return product;
    }

    @Query(() => [Product])
    fetchProducts() {
        return this.productService.findAll();
    }

    @Query(() => [Product])
    fetchProductsWithDelete() {
        return this.productService.findAllWithDelete();
    }

    @Mutation(() => Product)
    createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ) {
        return this.productService.create({ createProductInput });
    }

    @Mutation(() => Product)
    async updateProduct(
        @Args('productId') productId: string,
        @Args('updateProductInput') updateProductInput: UpdateProductInput,
    ) {
        return await this.productService.update({
            productId,
            updateProductInput,
        });
    }

    @Mutation(() => Product)
    async deleteProduct(@Args('productId') productId: string) {
        return this.productService.delete({ productId });
    }

    @Mutation(() => Product)
    async restoreDeletedProduct(@Args('productId') productId: string) {
        return this.productService.restore({ productId });
    }
}
