import { Injectable } from '@nestjs/common';
import Big from 'big.js';
import { EntityManager } from 'typeorm';

import { AddressEstimatedAssetsValue } from '../initial-sync/asset-sync/asset-sync.repository';
import { AssetEntity } from '../initial-sync/asset-sync/asset.entity';
import { AddressValueDto } from '../initial-sync/trade-sync/trade-sync.repository';
import { TradeEntity } from '../initial-sync/trade-sync/trade.entity';
import { WalletEntity } from '../initial-sync/wallet-sync/wallet.entity';
import { AssetAppraisal } from '../nft-appraisal/nft-appraisal.response';

@Injectable()
export class IncrementalSyncRepository {
  public async updateAssetAppraisal(em: EntityManager, asset: AssetAppraisal): Promise<void> {
    await em
      .getRepository(AssetEntity)
      .createQueryBuilder()
      .update()
      .set({
        appraisalWei: Big(asset.appraisal.wei),
        appraisalUpdatedAt: new Date(+asset.appraisal.timestamp * 1e3),
      })
      .where('id = :id', {
        id: asset.id,
      })
      .execute();
  }

  public async updateAssetOwner(em: EntityManager, assetId: string, owner: string, syncAt: Date) {
    await em
      .getRepository(AssetEntity)
      .createQueryBuilder()
      .update()
      .set({
        owner: owner,
        ownerUpdatedAt: syncAt,
      })
      .where('id = :id', {
        id: assetId,
      })
      .execute();
  }

  public async insertNewTrades(em: EntityManager, trades: Partial<TradeEntity>[]): Promise<void> {
    await em.getRepository(TradeEntity).createQueryBuilder().insert().values(trades).execute();
  }

  public async recalculateRankFactors(em: EntityManager, affectedAddressesIds: string[], syncAt: Date) {
    const sellVolume = await this.sumAffectedSellVolume(em, affectedAddressesIds);

    await this.upsertAffectedWallets(
      em,
      sellVolume.map(wallet => ({
        address: wallet.address,
        sellVolumeWei: Big(wallet.sumWei),
        lastUpdateAt: syncAt,
      })),
    );

    const buyVolume = await this.sumAffectedBuyVolume(em, affectedAddressesIds);

    await this.upsertAffectedWallets(
      em,
      buyVolume.map(wallet => ({
        address: wallet.address,
        buyVolumeWei: Big(wallet.sumWei),
        lastUpdateAt: syncAt,
      })),
    );

    await this.recalculateAffectedAddressesValue(em, affectedAddressesIds, syncAt);

    await this.updateTotalGains(em, affectedAddressesIds);
  }

  private async sumAffectedSellVolume(em: EntityManager, addresses: string[]): Promise<AddressValueDto[]> {
    return em
      .getRepository(TradeEntity)
      .createQueryBuilder()
      .select([`"fromAddress" as address`, `SUM(wei::numeric) as "sumWei"`])
      .groupBy(`"fromAddress"`)
      .where(`"fromAddress" = ANY(:addresses)`, {
        addresses,
      })
      .getRawMany<AddressValueDto>();
  }

  private async sumAffectedBuyVolume(em: EntityManager, addresses: string[]): Promise<AddressValueDto[]> {
    return em
      .getRepository(TradeEntity)
      .createQueryBuilder()
      .select([`"toAddress" as address`, `SUM(wei::numeric) as "sumWei"`])
      .groupBy(`"toAddress"`)
      .where(`"toAddress" = ANY(:addresses)`, {
        addresses,
      })
      .getRawMany<AddressValueDto>();
  }

  private async upsertAffectedWallets(em: EntityManager, wallets: Partial<WalletEntity>[]): Promise<void> {
    await em.getRepository(WalletEntity).upsert(wallets, ['address']);
  }

  private async updateTotalGains(em: EntityManager, addresses: string[]): Promise<void> {
    em.getRepository(WalletEntity)
      .createQueryBuilder()
      .update()
      .where(`"address" = ANY(:addresses)`, {
        addresses,
      })
      .set({
        totalGainsWei: () => `100 * ("sellVolumeWei" + "assetsAppraisalWei" - "buyVolumeWei") / "buyVolumeWei"`,
      });
  }

  public async recalculateAffectedAddressesValue(em: EntityManager, addresses: string[], syncAt: Date): Promise<void> {
    const ownersEstimatedAssetsValue = await em
      .getRepository(AssetEntity)
      .createQueryBuilder()
      .select([`owner as "address"`, `SUM("appraisalWei"::numeric) as "sumWei"`, 'COUNT(*) as "count"'])
      .groupBy(`"owner"`)
      .where(`"owner" IS NOT NULL`)
      .andWhere(`"owner" = ANY(:addresses)`, {
        addresses,
      })
      .getRawMany<AddressEstimatedAssetsValue>();

    await this.upsertAffectedWallets(
      em,
      ownersEstimatedAssetsValue.map(wallet => ({
        address: wallet.address,
        assetsCount: Big(wallet.count),
        assetsAppraisalWei: Big(wallet.sumWei),
        lastUpdateAt: syncAt,
      })),
    );
  }
}
