import { Injectable } from '@nestjs/common';

import { AssetSyncService } from './asset-sync/asset-sync.service';
import { TradeSyncService } from './trade-sync/trade-sync.service';
import { WalletSyncService } from './wallet-sync/wallet-sync.service';

@Injectable()
export class InitialSyncService {
  public constructor(
    private readonly tradeSyncService: TradeSyncService,
    private readonly walletSyncService: WalletSyncService,
    private readonly assetSyncService: AssetSyncService,
  ) {}

  public async sync(collection: string) {
    const now = new Date();

    await this.assetSyncService.syncCollectionAssets(collection, now);
    await this.tradeSyncService.syncCollectionTrades(collection);

    await this.walletSyncService.syncWallets(now);
  }
}
