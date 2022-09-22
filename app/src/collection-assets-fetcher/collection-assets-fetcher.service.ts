import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { CollectionAssetsDto, CollectionAssetsResponse } from './collection-assets.response';

@Injectable()
export class CollectionAssetsFetcherService {
  private readonly apiUrl = 'https://api.upshot.xyz/v2';

  public constructor(private readonly httpService: HttpService) {}

  public async getCollectionAssetsPaginated(
    collectionIdOrSlug: string,
    offset = 0,
    limit = 500,
  ): Promise<CollectionAssetsDto> {
    return await lastValueFrom(
      this.httpService
        .get<CollectionAssetsResponse>(`${this.apiUrl}/collections/${collectionIdOrSlug}/assets`, {
          params: {
            include_count: true,
            limit,
            offset,
          },
          headers: {
            'x-api-key': process.env.UPSHOT_API_KEY,
          },
        })
        .pipe(map(res => res.data.data)),
    );
  }
}
