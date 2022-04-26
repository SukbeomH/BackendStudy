import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID:
                '',
            clientSecret: '',
            callbackURL: '',
            scope: ['email', 'profile'],
        });
    }

    validate(accessToken: string, refreshToken: string, profile: any) {
        return {
            email: profile.emails[0].value,
            password: String(Math.floor(Math.random() * 10 ** 9)),
            snsId: profile.id,
            provider: 'google',
            auth: ,
        };
    }
}
