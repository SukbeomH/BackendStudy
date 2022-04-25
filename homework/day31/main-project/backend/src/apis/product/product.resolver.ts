import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ProductResolver {
    constructor(
        private readonly productService: ProductService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly elasticsearchService: ElasticsearchService,
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
    async fetchProducts(@Args('search') search: string) {
        // front search for the 'search' argument
        // search;
        // is redis has search result?
        const productCache = await this.cacheManager.get(search);
        if (productCache) return productCache;
        // else search by Elastic Search
        const result = await this.elasticsearchService.search({
            index: 'product',
            query: {
                match: { description: search },
            },
        });
        console.log('🚩2', result['hits']['hits'][1]);
        // save the search data from elastic to redis
        await this.cacheManager.set(
            `${search}`,
            JSON.stringify(result, null, ' '),
        );
        // return the value that found to client
        const result2 = [];
        for (let i = 0; i < result['hits']['hits'].length; i++) {
            result2.push(result['hits']['hits'][i]['_source']);
        }
        return result2;
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
