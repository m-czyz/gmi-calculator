import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollectionEventFetcherModule } from '../../collection-event-fetcher/collection-event-fetcher.module';
import { TradeSyncRepository } from './trade-sync.repository';
import { TradeSyncService } from './trade-sync.service';
import { TradeEntity } from './trade.entity';

@Module({
  imports: [CollectionEventFetcherModule, TypeOrmModule.forFeature([TradeEntity])],
  providers: [TradeSyncService, TradeSyncRepository],
  exports: [TradeSyncService, TradeSyncRepository],
})
export class TradeSyncModule {}
