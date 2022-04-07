import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Query(() => [Product])
    fetchProducts() {
        return this.productService.findAll();
    }

    @Query(() => [Product])
    fetchProductsWithDelete() {
        return this.productService.findAllWithDelete();
    }

    @Query(() => Product)
    fetchProduct(@Args('productId') productId: string) {
        return this.productService.findOne({ productId });
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
