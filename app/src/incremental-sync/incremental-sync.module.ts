import { Module } from '@nestjs/common';

import { CollectionEventFetcherModule } from '../collection-event-fetcher/collection-event-fetcher.module';
import { SynchronizationManagerModule } from '../synchronization-manager/synchronization-manager.module';
import { IncrementalSyncRepository } from './incremental-sync.repository';
import { IncrementalSyncService } from './incremental-sync.service';
import { NftAppraisalModule } from '../nft-appraisal/nft-appraisal.module';

@Module({
  imports: [SynchronizationManagerModule, CollectionEventFetcherModule, NftAppraisalModule],
  providers: [IncrementalSyncService, IncrementalSyncRepository],
})
export class IncrementalSyncModule {}
