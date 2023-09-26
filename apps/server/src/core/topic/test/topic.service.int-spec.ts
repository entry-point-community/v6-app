import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '~/lib/prisma.service';
import { TopicService } from '../topic.service';
import { topicsTestData } from './fixtures';

describe('TopicService', () => {
  let topicService: TopicService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService, PrismaService],
    }).compile();

    topicService = module.get<TopicService>(TopicService);
    prismaService = module.get<PrismaService>(PrismaService);

    await prismaService.topic.createMany({
      data: topicsTestData,
    });
  });

  afterAll(async () => {
    await prismaService.cleanDatabase();
  });

  it('should be defined', () => {
    expect(topicService).toBeDefined();
  });

  describe('getTopics', () => {
    it('should return a list of topics', async () => {
      const { count, data } = await topicService.getTopics({});

      expect(data.length).toBe(3);
      expect(count).toBe(3);
    });
  });

  describe('getTopicById', () => {
    it('should return 1 topic', async () => {
      const topic = await topicService.getTopicById(1);

      expect(topic).toMatchObject({ id: 1 });
    });

    describe('given an ID that does not exist', () => {
      it('should throw a not found error', async () => {
        await expect(topicService.getTopicById(100)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});
