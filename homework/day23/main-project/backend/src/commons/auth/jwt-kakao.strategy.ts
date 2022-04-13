import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({
            clientID: '2a6494a60c579cc94f81e5ffddd4b23a',
            callbackURL: '/login/kakao/',
        });
    }

    validate(accessToken: string, refreshToken: string, profile: any) {
        return {
            email: profile._json.kakao_account.email,
            password: String(Math.floor(Math.random() * 10 ** 9)),
            kakao: profile._json.kakao_account.email,
            auth: 123456,
        };
    }
}
