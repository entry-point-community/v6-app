import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetTopicsDTO } from '@v6/dto';

import { PaginationService } from '../pagination/pagination.service';
import { TopicService } from './topic.service';

@Controller('topics')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly paginationService: PaginationService,
  ) {}

  @Get('/')
  public async getTopics(@Query() query: GetTopicsDTO) {
    const { count, data } = await this.topicService.getTopics(query);

    return this.paginationService.buildPaginationResponse<
      (typeof data)[number]
    >(data, {
      count,
    });
  }

  @Get('/:id')
  public async getTopicById(@Param('id') id: number) {
    const topic = await this.topicService.getTopicById(id);

    return topic;
  }
}
