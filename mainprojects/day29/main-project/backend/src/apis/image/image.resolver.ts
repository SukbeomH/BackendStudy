import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Image } from './entities/image.entity';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
    constructor(private readonly imageService: ImageService) {}

    // 상품이미지 추가
    @Mutation(() => [Image])
    createProductImage(
        @Args('productId') productId: string,
        @Args({ name: 'images', type: () => [String] }) images: string[],
    ) {
        return this.imageService.create({ productId, images });
    }
    // 상품이미지 업데이트
    @Mutation(() => [Image])
    updateProductImage(
        @Args('productId') productId: string,
        @Args({ name: 'images', type: () => [String] }) images: string[],
    ) {
        return this.imageService.update({ productId, images });
    }
}
