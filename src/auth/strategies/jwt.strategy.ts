import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // false = หมดอายุแล้วห้ามใช้
      secretOrKey: 'secretKey', // ใช้ key เดียวกับตอน sign token
    });
  }

  async validate(payload: any) {
    // payload = { sub: user.id, username: user.username }
    return { sub: payload.sub, username: payload.username };
  }
}
