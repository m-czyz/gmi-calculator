import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollectionAssetsFetcherModule } from '../../collection-assets-fetcher/collection-assets-fetcher.module';
import { AssetSyncRepository } from './asset-sync.repository';
import { AssetSyncService } from './asset-sync.service';
import { AssetEntity } from './asset.entity';

@Module({
  imports: [CollectionAssetsFetcherModule, TypeOrmModule.forFeature([AssetEntity])],
  providers: [AssetSyncService, AssetSyncRepository],
  exports: [AssetSyncService, AssetSyncRepository],
})
export class AssetSyncModule {}
