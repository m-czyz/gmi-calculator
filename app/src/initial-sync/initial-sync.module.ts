import { Module } from '@nestjs/common';

import { SynchronizationManagerModule } from '../synchronization-manager/synchronization-manager.module';
import { AssetSyncModule } from './asset-sync/asset-sync.module';
import { InitialSyncCommand } from './initial-sync.command';
import { InitialSyncService } from './initial-sync.service';
import { TradeSyncModule } from './trade-sync/trade-sync.module';
import { WalletSyncModule } from './wallet-sync/wallet-sync.module';

@Module({
  imports: [TradeSyncModule, WalletSyncModule, AssetSyncModule, SynchronizationManagerModule],
  providers: [InitialSyncService, InitialSyncCommand],
})
export class InitialSyncModule {}
