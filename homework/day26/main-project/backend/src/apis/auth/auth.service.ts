import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    setRefreshToken({ user, res }) {
        try {
            const refreshToken = this.jwtService.sign(
                { email: user.email, sub: user.id },
                { secret: process.env.BACKEND_REFRESH_KEY, expiresIn: '2w' },
            );
            //개발환경
            res.setHeader(
                'Set-Cookie',
                `refreshToken=${refreshToken}; path=/;`,
            );
            // 배포환경
            // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
            // res.setHeader(
            //   'Set-Cookie',
            //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
            // )
        } catch (error) {
            throw error;
        }
    }

    getAccessToken({ user }) {
        try {
            return this.jwtService.sign(
                { email: user.email, sub: user.id },
                { secret: process.env.BACKEND_ACCESS_KEY, expiresIn: '5h' },
            );
        } catch (error) {
            throw error;
        }
    }

    async loginSocial({ req, res }) {
        try {
            let user = await this.userService.findOne({
                email: req.user.email,
            });
            if (!user) {
                user = await this.userService.create({
                    email: req.user.email,
                    password: req.user.password,
                    snsId: req.user.snsId,
                    provider: req.user.provider,
                    point: req.user.point,
                    auth: req.user.auth,
                });
                res.redirect(
                    'http://localhost:5500/main-project/frontend/login/index.html',
                );
            } else {
                this.setRefreshToken({ user, res });
                res.redirect(
                    'http://localhost:5500/main-project/frontend/login/index.html',
                );
            }
        } catch (error) {
            throw error;
        }
    }
}
