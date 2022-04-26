import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
    user: Pick<User, 'email' | 'password' | 'kakao' | 'auth'>;
}

@Controller('/')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}
    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
        const user = await this.userService.create({
            email: req.user.email,
            hashedPassword: req.user.password,
            kakao: req.user.kakao,
            auth: req.user.auth,
        });

        // 가입된 유저로 로그인
        this.authService.setRefreshToken({ user, res });
        // 지정한 주소로 리다이렉트
        res.redirect(
            'http://localhost:5501/day22/main-project/frontend/login/index.html',
        );
    }
}
