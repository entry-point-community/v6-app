import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '~/lib/prisma.service';
import { CourseService } from '../course.service';
import { categoriesTestData, coursesTestData } from './fixtures';

describe('CourseService', () => {
  let courseService: CourseService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService, PrismaService],
    }).compile();

    courseService = module.get<CourseService>(CourseService);
    prismaService = module.get<PrismaService>(PrismaService);

    await prismaService.category.create({
      data: categoriesTestData,
    });

    await prismaService.course.createMany({
      data: coursesTestData,
    });
  });

  afterAll(async () => {
    await prismaService.cleanDatabase();
  });

  it('should be defined', () => {
    expect(courseService).toBeDefined();
  });

  describe('getCourses', () => {
    it('should return a list of courses', async () => {
      const { count, data } = await courseService.getCourses({});

      expect(data.length).toBe(3);
      expect(count).toBe(3);
    });

    describe('when given a slug', () => {
      it('should return an array containing 1 course', async () => {
        const { count, data } = await courseService.getCourses({
          slug: 'react-course',
        });

        expect(data.length).toBe(1);
        expect(count).toBe(1);
        expect(data[0]).toMatchObject({
          name: 'React Course',
          slug: 'react-course',
          categoryId: 1,
        });
      });
    });
  });

  describe('getCourseById', () => {
    it('should return a course', async () => {
      const course = await courseService.getCourseById(1);

      expect(course.id).toBe(1);
    });

    describe('given an ID that does not exist', () => {
      it('should throw a not found error', async () => {
        await expect(courseService.getCourseById(100)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});
