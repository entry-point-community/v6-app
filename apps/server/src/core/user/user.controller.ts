import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUser } from '@supabase/supabase-js';

import { SupabaseGuard } from '../auth/supabase/supabase.guard';
import { User } from './user.decorator';

@Controller('users')
export class UserController {
  @UseGuards(SupabaseGuard)
  @Get('/test')
  testUsers(@User() user: AuthUser) {
    console.log(user);

    return user;
  }
}
