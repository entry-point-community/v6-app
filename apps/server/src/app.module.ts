import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SupabaseModule } from './core/auth/supabase/supabase.module';
import { PostModule } from './core/post/post.module';

@Module({
  imports: [PassportModule, SupabaseModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
