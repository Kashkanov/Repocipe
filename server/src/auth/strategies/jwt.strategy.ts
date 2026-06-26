import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '../../common/enums/role.enum';
import type { Request } from 'express';

interface JwtPayload {
  sub: string;
  username: string;
  role: Role;
}

interface ValidateResult {
  userId: string;
  username: string;
  role: Role;
}

const cookieExtractor = (req: Request): string | null => {
  return req?.cookies?.token as string | null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret-key',
    });
  }

  validate(payload: JwtPayload): ValidateResult {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
