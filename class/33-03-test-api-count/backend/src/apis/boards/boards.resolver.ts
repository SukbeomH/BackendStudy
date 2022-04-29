import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    @Args('writer') writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    // console.log(writer);
    // console.log(title);
    // console.log(contents);
    // console.log(createBoardInput);
    // redis 쓸거임 주석.
    // return this.boardService.create();
    // example
    // this.cacheManager.set("key","value")
    // this.cacheManager.get("key")
    // 객체 자체로도 저장 가능하다
    await this.cacheManager.set('key', createBoardInput, { ttl: 10 });
    const myCache = await this.cacheManager.get('key');
    console.log(myCache);
    return 'cache testing';
  }
}
