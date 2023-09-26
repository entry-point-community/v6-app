import { Prisma } from '@prisma/client';

export const categoriesTestData: Prisma.CategoryCreateInput = {
  name: 'Front End',
};

export const coursesTestData: Prisma.CourseCreateManyArgs['data'] = [
  {
    name: 'React Course',
    slug: 'react-course',
    categoryId: 1,
  },
  {
    name: 'Vue Course',
    slug: 'vue-course',
    categoryId: 1,
  },
  {
    name: 'Svelte Course',
    slug: 'svelte-course',
    categoryId: 1,
  },
];
