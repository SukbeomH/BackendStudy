import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtEmailStrategy extends PassportStrategy(Strategy, 'email') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '',
        });
    }

    validate(payload) {
        console.log(payload);
        // context 의 .req 의 .user 로 리턴된다
        return {
            email: payload.email,
            id: payload.sub,
        };
    }
}
