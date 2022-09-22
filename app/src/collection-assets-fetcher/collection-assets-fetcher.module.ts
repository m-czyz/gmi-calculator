import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CollectionAssetsFetcherService } from './collection-assets-fetcher.service';

@Module({
  imports: [HttpModule],
  providers: [CollectionAssetsFetcherService],
  exports: [CollectionAssetsFetcherService],
})
export class CollectionAssetsFetcherModule {}
