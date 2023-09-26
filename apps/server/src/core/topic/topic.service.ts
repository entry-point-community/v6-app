import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetTopicsDTO } from '@v6/dto';

import { PrismaService } from '~/lib/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getTopics(query: GetTopicsDTO) {
    const { limit = 10, page = 1, sortBy, sortOrder } = query;

    let orderCondition: Prisma.TopicOrderByWithRelationInput = {};

    if (sortBy) {
      orderCondition = {
        [sortBy]: sortOrder,
      };
    }

    const [topics, count] = await this.prismaService.$transaction([
      this.prismaService.topic.findMany({
        include: {
          unit: {
            include: {
              course: true,
            },
          },
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: orderCondition,
      }),
      this.prismaService.topic.count(),
    ]);

    return { data: topics, count };
  }

  public async getTopicById(id: number) {
    const topic = await this.prismaService.topic.findUnique({
      where: {
        id,
      },
      include: {
        unit: true,
      },
    });

    if (!topic) throw new NotFoundException('topic not found');

    return topic;
  }
}
