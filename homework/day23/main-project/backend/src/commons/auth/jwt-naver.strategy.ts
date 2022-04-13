import { Strategy } from 'passport-naver-v2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor() {
        super({
            clientID: 'OkP58f2yA27CKtVX35Bq',
            clientSecret: 'Q6pScR8mE8',
            callbackURL: '/login/naver',
        });
    }

    validate(accessToken: string, refreshToken: string, profile: any) {
        console.log(profile);
        return {
            email: profile.email,
            password: '0000',
            kakao: 'default',
            auth: 123445,
        };
    }
}
