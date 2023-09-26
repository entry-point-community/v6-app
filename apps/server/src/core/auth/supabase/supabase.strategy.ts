import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthUser } from '@supabase/supabase-js';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { config } from '~/config';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.supabaseJwtKey,
    });
  }

  async validate(user: AuthUser) {
    return user;
  }
}
