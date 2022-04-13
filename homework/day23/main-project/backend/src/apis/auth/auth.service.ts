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
        const refreshToken = this.jwtService.sign(
            { email: user.email, sub: user.id },
            { secret: 'projectRefreshKey', expiresIn: '2w' },
        );
        //개발환경
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
        // 배포환경
        // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
        // res.setHeader(
        //   'Set-Cookie',
        //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
        // )
    }

    getAccessToken({ user }) {
        return this.jwtService.sign(
            { email: user.email, sub: user.id },
            { secret: 'projectAccessKey', expiresIn: '1h' },
        );
    }

    async loginSocial({ req, res }) {
        let user = await this.userService.findOne({ email: req.user.email });
        if (!user) {
            user = await this.userService.create({
                email: req.user.email,
                password: req.user.password,
                kakao: req.user.kakao,
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
    }
}
