import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SynchronizationManagerRepository } from './synchronization-manager.repository';
import { SynchronizationManagerService } from './synchronization-manager.service';
import { SynchronizationEntity } from './synchronization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SynchronizationEntity])],
  providers: [SynchronizationManagerService, SynchronizationManagerRepository],
  exports: [SynchronizationManagerService],
})
export class SynchronizationManagerModule {}
