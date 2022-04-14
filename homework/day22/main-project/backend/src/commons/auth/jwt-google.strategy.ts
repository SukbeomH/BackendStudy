import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID:
                '293837098273-sqem9d40adauhv6nhrsir5s3ltp8il3k.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/login/google',
            scope: ['email', 'profile'],
        });
    }

    validate(accessToken: string, refreshToken: string, profile: any) {
        // console.log(accessToken);
        // console.log(refreshToken);
        // console.log(profile);
        return {
            email: profile.emails[0].value,
            password: '0000',
            kakao: 'default',
            auth: 123445,
        };
    }
}