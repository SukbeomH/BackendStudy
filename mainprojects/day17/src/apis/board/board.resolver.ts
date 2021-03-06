import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBoardInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board } from './entities/board.entity';
import { BoardService } from './board.service';

@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => [Board])
    fetchBoards() {
        return this.boardService.findAll();
    }
    @Query(() => Board)
    fetchBoard(@Args('boardId') boardId: string) {
        return this.boardService.findOne({ boardId });
    }

    @Mutation(() => Board)
    createBoard(@Args('createBoardInput') createBoardInput: CreateBoardInput) {
        return this.boardService.create({ createBoardInput });
    }

    @Mutation(() => Board)
    async updateBoard(
        @Args('boardId') boardId: string,
        @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    ) {
        return await this.boardService.update({
            boardId,
            updateBoardInput,
        });
    }
}
