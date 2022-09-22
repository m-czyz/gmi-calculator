import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssetSyncModule } from '../asset-sync/asset-sync.module';
import { TradeSyncModule } from '../trade-sync/trade-sync.module';
import { WalletSyncRepository } from './wallet-sync.repository';
import { WalletSyncService } from './wallet-sync.service';
import { WalletEntity } from './wallet.entity';

@Module({
  imports: [TradeSyncModule, AssetSyncModule, TypeOrmModule.forFeature([WalletEntity])],
  providers: [WalletSyncService, WalletSyncRepository],
  exports: [WalletSyncService],
})
export class WalletSyncModule {}
