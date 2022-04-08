import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('kakao') kakao: string,
        @Args('auth') auth: number,
    ) {
        return this.userService.create({ email, password, kakao, auth });
    }
}
