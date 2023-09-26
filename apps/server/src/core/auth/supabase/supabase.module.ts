import { Module } from '@nestjs/common';

import { SupabaseService } from '~/lib/supabase.service';
import { SupabaseStrategy } from './supabase.strategy';

@Module({
  providers: [SupabaseService, SupabaseStrategy],
  exports: [SupabaseService],
})
export class SupabaseModule {}
