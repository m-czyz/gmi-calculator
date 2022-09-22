import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WalletEntity } from '../initial-sync/wallet-sync/wallet.entity';

interface WalletWithRankInterface {
  address: string;
  totalGainsWei: string;
  sellVolumeWei: string;
  buyVolumeWei: string;
  assetsCount: string;
  assetsAppraisalWei: string;
  rank: number;
}

@Injectable()
export class GmiCalculatorRepository {
  public constructor(
    @InjectRepository(WalletEntity)
    private walletEntityRepository: Repository<WalletEntity>,
  ) {}

  public countWallets(): Promise<number> {
    return this.walletEntityRepository.count();
  }

  public findWalletWithRank(address: string): Promise<WalletWithRankInterface> {
    return this.walletEntityRepository.manager
      .createQueryBuilder()
      .select('w.*')
      .from(
        subQuery =>
          subQuery
            .select([
              `"address"`,
              `"totalGainsWei"`,
              `"sellVolumeWei"`,
              `"buyVolumeWei"`,
              `"assetsCount"`,
              `"assetsAppraisalWei"`,
              `RANK() OVER (ORDER BY "assetsCount" * "totalGainsWei" + "sellVolumeWei" DESC) as rank`,
            ])
            .from(WalletEntity, 'wallet_rank'),
        'w',
      )
      .where(`"address" = :address`, { address })
      .getRawOne<WalletWithRankInterface>();
  }
}
