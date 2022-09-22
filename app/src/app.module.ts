import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { CollectionEventFetcherModule } from './collection-event-fetcher/collection-event-fetcher.module';
import { DATABASE_CONFIG } from './database-config';
import { GmiCalculatorModule } from './gmi-calculator/gmi-calculator.module';
import { InitialSyncModule } from './initial-sync/initial-sync.module';
import { IncrementalSyncModule } from './incremental-sync/incremental-sync.module';
import { SynchronizationManagerModule } from './synchronization-manager/synchronization-manager.module';

@Module({
  imports: [
    CollectionEventFetcherModule,
    InitialSyncModule,
    GmiCalculatorModule,
    TypeOrmModule.forRoot({
      ...DATABASE_CONFIG,
    }),
    IncrementalSyncModule,
    SynchronizationManagerModule,
  ],
  providers: [AppService],
})
export class AppModule {}
