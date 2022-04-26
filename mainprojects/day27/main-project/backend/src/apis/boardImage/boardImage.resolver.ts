import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardImageService } from './boardImage.service';
import { CreateBoardImageInput } from './dto/createBoardImage.input';
import { BoardImage } from './entities/boardImage.entity';

@Resolver()
export class BoardImageResolver {
    constructor(private readonly boardImageService: BoardImageService) {}

    @Query(() => [BoardImage])
    fetchBoardImages() {
        return this.boardImageService.findAll();
    }

    @Query(() => BoardImage)
    fetchBoardImage(@Args('boardImageId') boardImageId: string) {
        return this.boardImageService.findOne({ boardImageId });
    }

    @Mutation(() => BoardImage)
    createBoardImage(
        @Args('createBoardImageInput')
        createBoardImageInput: CreateBoardImageInput,
    ) {
        return this.boardImageService.create({ createBoardImageInput });
    }

    @Mutation(() => BoardImage)
    async deleteBoardImage(@Args('boardImageId') boardImageId: string) {
        return this.boardImageService.delete({ boardImageId });
    }
}
