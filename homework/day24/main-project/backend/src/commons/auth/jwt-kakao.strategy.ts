import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({
            clientID: '',
            callbackURL: '',
        });
    }

    validate(accessToken: string, refreshToken: string, profile: any) {
        return {
            email: profile._json.kakao_account.email,
            password: String(Math.floor(Math.random() * 10 ** 9)),
            snsId: profile.id,
            provider: 'kakao',
            auth: ,
        };
    }
}
