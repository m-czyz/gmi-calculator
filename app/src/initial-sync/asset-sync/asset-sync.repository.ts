import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssetEntity } from './asset.entity';

export interface AddressEstimatedAssetsValue {
  address: string;
  sumWei: string;
  count: number;
}

@Injectable()
export class AssetSyncRepository {
  public constructor(
    @InjectRepository(AssetEntity)
    private repository: Repository<AssetEntity>,
  ) {}

  public async clearCollection(): Promise<void> {
    await this.repository.clear();
  }

  public async saveBatch(batch: AssetEntity[]): Promise<void> {
    await this.repository.createQueryBuilder().insert().values(batch).execute();
  }

  public async ownersEstimatedAssetsValue(): Promise<AddressEstimatedAssetsValue[]> {
    return this.repository
      .createQueryBuilder()
      .select([`owner as "address"`, `SUM("appraisalWei"::numeric) as "sumWei"`, 'COUNT(*) as "count"'])
      .groupBy(`"owner"`)
      .where(`"owner" IS NOT NULL`)
      .getRawMany<AddressEstimatedAssetsValue>();
  }
}
