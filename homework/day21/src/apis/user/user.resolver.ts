import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    fetchCategories() {
        return this.userService.findAll();
    }

    @Query(() => User)
    fetchCategory(@Args('email') email: string) {
        return this.userService.findOne({ email });
    }

    @Mutation(() => User)
    async createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('kakao') kakao: string,
        @Args('auth') auth: number,
    ) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userService.create({ email, hashedPassword, kakao, auth });
    }

    @Mutation(() => User)
    async deleteUser(@Args('email') email: string) {
        return this.userService.delete({ email });
    }
}
