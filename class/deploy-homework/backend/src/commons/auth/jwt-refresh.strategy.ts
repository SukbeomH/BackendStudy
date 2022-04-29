import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => req.header.cookie.replace('refreshToken=', ''),
      secretOrKey: process.env.REFRESH_SECRET_KEY,
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
