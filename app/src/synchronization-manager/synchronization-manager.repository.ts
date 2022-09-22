import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SynchronizationEntity } from './synchronization.entity';

@Injectable()
export class SynchronizationManagerRepository {
  public constructor(
    @InjectRepository(SynchronizationEntity)
    private repository: Repository<SynchronizationEntity>,
  ) {}

  public async save(sync: Partial<SynchronizationEntity>): Promise<void> {
    await this.repository.save(sync);
  }

  public getPreviousSync(): Promise<SynchronizationEntity> {
    return this.repository.createQueryBuilder().orderBy(`"synchronizedUntil"`, 'DESC').limit(1).getOne();
  }

  public async clear(): Promise<void> {
    await this.repository.clear();
  }
}
