import { Mutation, Resolver } from '@nestjs/graphql';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation(() => String)
  @MessagePattern({ cmd: 'aaa' })
  login() {
    return 'login을 요청하셨습니다!';
  }
}
