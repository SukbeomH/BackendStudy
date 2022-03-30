import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';

@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query()
    fetchBoards() {
        this.boardService.findAll();
    }

    @Mutation(() => String)
    createBoard() {
        this.boardService.create();
    }
}
