import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from '../file/file.service';
import { ProductData } from './entities/productData.entity';
import { ProductDataService } from './productData.service';

@Resolver()
export class ProductDataResolver {
    constructor(
        private readonly productDataService: ProductDataService,
        private readonly fileService: FileService,
    ) {}

    //이미지 데이터 추가
    @Mutation(() => ProductData)
    createProductData(
        @Args('productId') productId: string,
        @Args('images') images: string[],
    ) {
        return this.productDataService.create({ productId, images });
    }
    //이미지 데이터 업데이트
    @Mutation(() => ProductData)
    updateProductData(
        @Args('productId') productId: string,
        @Args('images') images: string[],
    ) {
        return this.productDataService.update({ productId, images });
    }
}
