import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthEmailGuard } from 'src/commons/auth/graphql-auth.guard';
import { ContextUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ email, hashedPassword, name, age });
  }

  @UseGuards(GqlAuthEmailGuard)
  @Query(() => String)
  fetchUser(@ContextUser() contextUser: any) {
    console.log('fetchUser executed ~~!!');
    console.log(contextUser);
  }
}
