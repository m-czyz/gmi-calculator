import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { AssetAppraisal, NFTAppraisalResponse } from './nft-appraisal.response';

@Injectable()
export class NftAppraisalService {
  private readonly apiUrl = 'https://api.upshot.xyz/v2';

  public constructor(private readonly httpService: HttpService) {}

  public async getAssetsAppraisal(assets: string[]): Promise<AssetAppraisal[]> {
    return await lastValueFrom(
      this.httpService
        .get<NFTAppraisalResponse>(`${this.apiUrl}/assets`, {
          params: {
            include_asset_stats: true,
            asset_id: assets,
          },
          headers: {
            'x-api-key': process.env.UPSHOT_API_KEY,
          },
        })
        .pipe(map(res => res.data.data)),
    );
  }
}
