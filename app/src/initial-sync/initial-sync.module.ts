import { Module } from '@nestjs/common';

import { AssetSyncModule } from './asset-sync/asset-sync.module';
import { InitialSyncCommand } from './initial-sync.command';
import { InitialSyncService } from './initial-sync.service';
import { TradeSyncModule } from './trade-sync/trade-sync.module';
import { WalletSyncModule } from './wallet-sync/wallet-sync.module';

@Module({
  imports: [TradeSyncModule, WalletSyncModule, AssetSyncModule],
  providers: [InitialSyncService, InitialSyncCommand],
})
export class InitialSyncModule {}
