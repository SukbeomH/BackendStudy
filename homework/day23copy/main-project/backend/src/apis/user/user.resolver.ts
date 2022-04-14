import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthEmailGuard } from 'src/commons/auth/graphql-auth.guard';
import { ContextUser, IContextUser } from 'src/commons/auth/gql-user.param';

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
        @Args('snsId') snsId: string,
        @Args('auth') auth: number,
    ) {
        return this.userService.create({ email, password, snsId, auth });
    }

    @UseGuards(GqlAuthEmailGuard)
    @Mutation(() => User)
    async updateUserPassword(
        @ContextUser() contextUser: IContextUser,
        @Args('newPassword') newPassword: string,
    ) {
        const email = contextUser.email;
        const result = await this.userService.updatePassword({
            email,
            newPassword,
        });
        return result;
    }

    @UseGuards(GqlAuthEmailGuard)
    @Mutation(() => Boolean)
    async deleteUser(@ContextUser() contextUser: IContextUser) {
        const email = contextUser.email;
        const result = await this.userService.delete({ email });
        return result;
    }
}
