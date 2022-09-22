import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WalletEntity } from './wallet.entity';

@Injectable()
export class WalletSyncRepository {
  public constructor(
    @InjectRepository(WalletEntity)
    private walletEntityRepository: Repository<WalletEntity>,
  ) {}

  public async clearCollection(): Promise<void> {
    await this.walletEntityRepository.clear();
  }

  public async upsert(wallets: Partial<WalletEntity>[]): Promise<void> {
    await this.walletEntityRepository.upsert(wallets, ['address']);
  }

  public async updateTotalGains(): Promise<void> {
    await this.walletEntityRepository
      .createQueryBuilder()
      .update()
      .set({
        totalGainsWei: () =>
          // 100 * (sell_eth(w) + portfolio_value(w) - volume(w)) / volume(w)
          `100 * ("sellVolumeWei" + "assetsAppraisalWei" - "buyVolumeWei") / "buyVolumeWei"`,
      });
  }
}
