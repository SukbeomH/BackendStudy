import { Query, Resolver } from '@nestjs/graphql';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  @MessagePattern({ cmd: 'bbb' })
  fetchBoards() {
    return 'fetchBoards를 요청하셨습니다!';
  }
}
