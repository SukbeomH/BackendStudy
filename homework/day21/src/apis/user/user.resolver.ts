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

    @Query(() => [User])
    fetchUsers() {
        return this.userService.findAll();
    }

    @UseGuards(GqlAuthEmailGuard)
    @Query(() => User)
    fetchUser(@ContextUser() contextUser: any) {
        const email = contextUser.email;
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

    @UseGuards(GqlAuthEmailGuard)
    @Mutation(() => User)
    async updateUserPassword(
        @ContextUser() contextUser: any,
        @Args('newPassword') newPassword: string,
    ) {
        const email = contextUser.email;
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await this.userService.updatePassword({
            email,
            newHashedPassword,
        });
        return result;
    }

    @UseGuards(GqlAuthEmailGuard)
    @Mutation(() => Boolean)
    async deleteUser(@ContextUser() contextUser: any) {
        const email = contextUser.email;
        const result = await this.userService.delete({ email });
        return result;
    }
}
