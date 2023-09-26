import { Module } from '@nestjs/common';

import { PrismaService } from '~/lib/prisma.service';
import { PaginationService } from '../pagination/pagination.service';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, PrismaService, PaginationService],
  exports: [TopicService],
})
export class TopicModule {}
