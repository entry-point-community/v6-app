import { Prisma } from '@prisma/client';

export const topicsTestData: Prisma.TopicCreateManyArgs['data'] = [
  {
    title: 'React Tutorial 1',
  },
  {
    title: 'React Tutorial 2',
  },
  {
    title: 'React Tutorial 3',
  },
];
