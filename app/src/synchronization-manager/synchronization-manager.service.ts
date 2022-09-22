import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { SynchronizationManagerRepository } from './synchronization-manager.repository';
import { SynchronizationEntity } from './synchronization.entity';

@Injectable()
export class SynchronizationManagerService {
  public constructor(private readonly synchronizationManagerRepository: SynchronizationManagerRepository) {}

  public async clear(): Promise<void> {
    await this.synchronizationManagerRepository.clear();
  }

  public getLatestSync(): Promise<SynchronizationEntity> {
    return this.synchronizationManagerRepository.getPreviousSync();
  }

  public async storeSuccessfulSync(synchronizedUntil: Date, completedAt: Date): Promise<void> {
    await this.synchronizationManagerRepository.save({
      id: randomUUID(),
      synchronizedUntil,
      completedAt,
    });
  }
}
