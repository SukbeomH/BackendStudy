import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

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
    createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('snsId') snsId: string,
        @Args('auth') auth: number,
    ) {
        return this.userService.create({ email, password, snsId, auth });
    }

    @Mutation(() => User)
    async deleteUser(@Args('email') email: string) {
        return this.userService.delete({ email });
    }
}
