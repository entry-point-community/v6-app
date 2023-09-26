import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetCoursesDTO } from '@v6/dto';

import { PaginationService } from '../pagination/pagination.service';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly paginationService: PaginationService,
  ) {}

  @Get('/')
  public async getCourses(@Query() query: GetCoursesDTO) {
    const { count, data } = await this.courseService.getCourses(query);

    return this.paginationService.buildPaginationResponse<
      (typeof data)[number]
    >(data, {
      count,
    });
  }

  @Get('/:id')
  public async getCourseById(@Param('id') id: number) {
    const course = await this.courseService.getCourseById(id);

    return course;
  }
}
