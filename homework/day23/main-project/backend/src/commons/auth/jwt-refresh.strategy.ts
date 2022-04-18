import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: (req) =>
                req.headers.cookie.replace('refreshToken=', ''),
            secretOrKey: '',
        });
    }

    validate(payload) {
        return {
            email: payload.email,
            id: payload.sub,
        };
    }
}
