import { Strategy } from 'passport-naver-v2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor() {
        super({
            clientID: 
            clientSecret: 
            callbackURL: 
        });
    }

    validate(accessToken: string, refreshToken: string, profile: any) {
        console.log(profile);
        return {
            email: profile.email,
            password: '',
            snsId: profile.id,
            provider: 'naver',
            auth: ,
        };
    }
}
