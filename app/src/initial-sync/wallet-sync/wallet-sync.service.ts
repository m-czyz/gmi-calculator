import { Injectable, Logger } from '@nestjs/common';
import Big from 'big.js';

import { AssetSyncRepository } from '../asset-sync/asset-sync.repository';
import { TradeSyncRepository } from '../trade-sync/trade-sync.repository';
import { WalletSyncRepository } from './wallet-sync.repository';

@Injectable()
export class WalletSyncService {
  private readonly logger = new Logger(WalletSyncService.name);

  public constructor(
    private readonly tradeSyncRepository: TradeSyncRepository,
    private readonly assetSyncRepository: AssetSyncRepository,
    private readonly walletSyncRepository: WalletSyncRepository,
  ) {}

  public async syncWallets(now: Date) {
    this.logger.log('Wallet sync has been started');
    await this.walletSyncRepository.clearCollection();

    await this.syncWalletsFromTrades(now);
    this.logger.log('Wallet sync from trades has been completed');

    await this.syncWalletsFromAssets(now);
    this.logger.log('Wallet sync from assets has been completed');

    await this.walletSyncRepository.updateTotalGains();
    this.logger.log('Wallet sync has been completed');
  }

  public async syncWalletsFromTrades(now: Date) {
    const sumSellVolume = await this.tradeSyncRepository.sumSellVolume();

    await this.walletSyncRepository.upsert(
      sumSellVolume.map(wallet => ({
        address: wallet.address,
        sellVolumeWei: Big(wallet.sumWei),
        lastUpdateAt: now,
      })),
    );

    sumSellVolume.length = 0;

    const sumBuyVolume = await this.tradeSyncRepository.sumBuyVolume();

    await this.walletSyncRepository.upsert(
      sumBuyVolume.map(wallet => ({
        address: wallet.address,
        buyVolumeWei: Big(wallet.sumWei),
        lastUpdateAt: now,
      })),
    );
  }

  public async syncWalletsFromAssets(now: Date) {
    const ownersEstimatedAssetsValue = await this.assetSyncRepository.ownersEstimatedAssetsValue();

    await this.walletSyncRepository.upsert(
      ownersEstimatedAssetsValue.map(wallet => ({
        address: wallet.address,
        assetsCount: Big(wallet.count),
        assetsAppraisalWei: Big(wallet.sumWei),
        lastUpdateAt: now,
      })),
    );
  }
}
