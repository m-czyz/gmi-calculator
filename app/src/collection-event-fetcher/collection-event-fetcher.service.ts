import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { CollectionEventsDto, CollectionEventsRequest } from './collection-events.request';

@Injectable()
export class CollectionEventFetcherService {
  private readonly apiUrl = 'https://api.upshot.xyz/v2';

  public constructor(private readonly httpService: HttpService) {}

  public async getCollectionTradesPaginated(
    collectionIdOrSlug: string,
    range: { from?: Date; to: Date },
    offset = 0,
    limit = 500,
  ): Promise<CollectionEventsDto> {
    return await lastValueFrom(
      this.httpService
        .get<CollectionEventsRequest>(`${this.apiUrl}/collections/${collectionIdOrSlug}/events`, {
          params: {
            include_count: true,
            type: 'SALE',
            limit,
            offset,
            end: range.to.getTime(),
          },
          headers: {
            'x-api-key': process.env.UPSHOT_API_KEY,
          },
        })
        .pipe(map(res => res.data.data)),
    );
  }
}
