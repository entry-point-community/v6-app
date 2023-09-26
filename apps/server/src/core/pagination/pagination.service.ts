import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  public async buildPaginationResponse<T>(
    data: T[],
    meta: {
      count: number;
    },
  ) {
    const { count } = meta;

    return {
      records: data,
      _meta: {
        count,
      },
    };
  }
}
