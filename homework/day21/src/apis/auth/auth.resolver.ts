import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Mutation(() => String)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ) {
        // login => email && password 가 일치하는 유저 찾기
        const user = await this.userService.findOne({ email });
        // 일치하는 유저가 없으면 [ 에러 ]
        if (!user)
            throw new UnprocessableEntityException(
                '존재하지 않는 이메일 입니다',
            );
        // 일치하는 유저가 있지만 암호가 틀렸다면 [ 에러 ]
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new UnprocessableEntityException('잘못된 비밀번호 입니다');
        // 일치하는 유저가 있으면 [ JWT ] + 프론트로 전달
        const result = this.authService.getAccessToken({ user });
        return result;
    }
}
