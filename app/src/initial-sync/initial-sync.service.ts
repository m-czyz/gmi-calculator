import { Injectable, Logger } from '@nestjs/common';

import { SynchronizationManagerService } from '../synchronization-manager/synchronization-manager.service';
import { AssetSyncService } from './asset-sync/asset-sync.service';
import { TradeSyncService } from './trade-sync/trade-sync.service';
import { WalletSyncService } from './wallet-sync/wallet-sync.service';

@Injectable()
export class InitialSyncService {
  private readonly logger = new Logger(WalletSyncService.name);

  public constructor(
    private readonly tradeSyncService: TradeSyncService,
    private readonly walletSyncService: WalletSyncService,
    private readonly assetSyncService: AssetSyncService,
    private readonly synchronizationManagerService: SynchronizationManagerService,
  ) {}

  public async sync(collection: string) {
    const synchronizeUntil = new Date();

    await this.synchronizationManagerService.clear();

    this.logger.log('Initial sync has been started');

    await this.assetSyncService.syncCollectionAssets(collection, synchronizeUntil);
    await this.tradeSyncService.syncCollectionTrades(collection);
    await this.walletSyncService.syncWallets(synchronizeUntil);

    this.logger.log('Initial sync has been completed');

    await this.synchronizationManagerService.storeSuccessfulSync(synchronizeUntil, new Date());
  }
}
