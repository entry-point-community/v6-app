import { Module } from '@nestjs/common';

import { PrismaService } from '~/lib/prisma.service';
import { SupabaseService } from '~/lib/supabase.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, SupabaseService],
})
export class PostModule {}
