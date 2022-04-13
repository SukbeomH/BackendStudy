import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    // 가입확인
    let user = await this.userService.findOne({ email: req.user.email });
    // 없으면 회원가입 ( DB에 저장 )
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,
        name: req.user.name,
        age: req.user.name,
      });
    }
    // 가입된 유저로 로그인
    await this.authService.setRefreshToken({ user, res });
    // 지정한 주소로 리다이렉트
    res.redirect(
      'http://localhost:5500/21-03-social-login/frontend/socialLogin.html',
    );
  }
}
