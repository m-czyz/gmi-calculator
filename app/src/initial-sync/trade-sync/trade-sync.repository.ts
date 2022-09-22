import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TradeEntity } from './trade.entity';

export interface AddressValueDto {
  address: string;
  sumWei: string;
}

@Injectable()
export class TradeSyncRepository {
  public constructor(
    @InjectRepository(TradeEntity)
    private tradeEntityRepository: Repository<TradeEntity>,
  ) {}

  public async clearCollection(): Promise<void> {
    await this.tradeEntityRepository.clear();
  }

  public async saveBatch(batch: TradeEntity[]): Promise<void> {
    await this.tradeEntityRepository.createQueryBuilder().insert().values(batch).execute();
  }

  public async sumBuyVolume(): Promise<AddressValueDto[]> {
    return this.tradeEntityRepository
      .createQueryBuilder()
      .select([`"toAddress" as address`, `SUM(wei::numeric) as "sumWei"`])
      .groupBy(`"toAddress"`)
      .getRawMany<AddressValueDto>();
  }

  public async sumSellVolume(): Promise<AddressValueDto[]> {
    return this.tradeEntityRepository
      .createQueryBuilder()
      .select([`"fromAddress" as address`, `SUM(wei::numeric) as "sumWei"`])
      .groupBy(`"fromAddress"`)
      .getRawMany<AddressValueDto>();
  }
}
