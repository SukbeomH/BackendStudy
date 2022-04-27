import { Controller, Get } from '@nestjs/common';
import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Query(() => String)
  aaa() {
    return '아무거나';
  }

  @Mutation(() => String)
  login() {
    return 'login을 요청하셨습니다.';
  }
}
