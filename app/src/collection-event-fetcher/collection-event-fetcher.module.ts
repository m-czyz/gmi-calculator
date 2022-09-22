import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CollectionEventFetcherService } from './collection-event-fetcher.service';

@Module({
  imports: [HttpModule],
  providers: [CollectionEventFetcherService],
  exports: [CollectionEventFetcherService],
})
export class CollectionEventFetcherModule {}
