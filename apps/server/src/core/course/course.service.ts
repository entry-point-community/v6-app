import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@v6/db';
import { GetCoursesDTO } from '@v6/dto';

import { PrismaService } from '~/lib/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getCourses(query: GetCoursesDTO) {
    const { limit = 10, page = 1, sortBy, sortOrder, slug } = query;

    const whereCondition: Prisma.CourseWhereInput = {
      slug: slug ?? undefined,
    };

    let orderCondition: Prisma.CourseOrderByWithRelationInput = {};

    if (sortBy) {
      orderCondition = {
        [sortBy]: sortOrder,
      };
    }

    const [courses, count] = await this.prismaService.$transaction([
      this.prismaService.course.findMany({
        where: whereCondition,
        include: {
          _count: {
            select: {
              units: true,
            },
          },
          author: true,
          units: true,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: orderCondition,
      }),
      this.prismaService.course.count({
        where: whereCondition,
      }),
    ]);

    return {
      data: courses,
      count,
    };
  }

  public async getCourseById(id: number) {
    const course = await this.prismaService.course.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        category: true,
        units: {
          include: {
            topics: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!course) throw new NotFoundException('course not found');

    return course;
  }
}
