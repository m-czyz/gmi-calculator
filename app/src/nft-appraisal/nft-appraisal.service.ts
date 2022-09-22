import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { Asset, WalletItemsResponse } from './wallet-items-response';

@Injectable()
export class NftAppraisalService {
  private readonly apiUrl = 'https://api.upshot.xyz/v2';

  public constructor(private readonly httpService: HttpService) {}

  public async getWalletCollection(wallet: string): Promise<Asset[]> {
    return await lastValueFrom(
      this.httpService
        .get<WalletItemsResponse>(`${this.apiUrl}/wallets/${wallet}/assets/owned`, {
          headers: {
            'x-api-key': process.env.UPSHOT_API_KEY,
          },
        })
        .pipe(map(res => res.data.data.assets)),
    );
  }
}
