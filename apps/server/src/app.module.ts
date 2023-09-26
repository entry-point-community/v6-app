import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SupabaseModule } from './core/auth/supabase/supabase.module';

@Module({
  imports: [PassportModule, SupabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
