import { Module } from '@nestjs/common';

import { PrismaService } from '~/lib/prisma.service';
import { PaginationService } from '../pagination/pagination.service';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, PaginationService],
  exports: [CourseService],
})
export class CourseModule {}
