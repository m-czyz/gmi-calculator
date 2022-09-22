import { Injectable, Logger } from '@nestjs/common';
import Big from 'big.js';

import { CollectionAssetsFetcherService } from '../../collection-assets-fetcher/collection-assets-fetcher.service';
import { Asset } from '../../collection-assets-fetcher/collection-assets.response';
import { AssetSyncRepository } from './asset-sync.repository';

@Injectable()
export class AssetSyncService {
  private readonly logger = new Logger(AssetSyncService.name);

  public constructor(
    private readonly repository: AssetSyncRepository,
    private readonly collectionAssetsFetcherService: CollectionAssetsFetcherService,
  ) {}

  public async syncCollectionAssets(collection: string, now: Date) {
    this.logger.log(`assets sync limited to timestamp ${now.getTime()}`);

    await this.repository.clearCollection();

    this.logger.warn('assets has been purged');

    let page = 0;
    let pages = 0;
    const limit = 500;

    do {
      page++;
      const response = await this.collectionAssetsFetcherService.getCollectionAssetsPaginated(
        collection,
        (page - 1) * limit,
        limit,
      );

      if (!pages) {
        pages = Math.ceil(response.count / limit);
        this.logger.log(`assets pages ${pages} to sync`);
      }

      await this.saveBatch(response.assets, now);

      this.logger.log(`assets batch page ${page} completed`);
    } while (pages > page);

    this.logger.log(`assets sync completed`);
  }

  private saveBatch(assets: Asset[], now: Date) {
    return this.repository.saveBatch(
      assets.map(asset => ({
        id: asset.id,
        tokenId: asset.token_id,
        collectionId: asset.collection.id,
        appraisalWei: asset?.appraisal?.wei ? new Big(asset.appraisal.wei) : null,
        owner: asset.owner,
        ownerUpdatedAt: now,
        appraisalUpdatedAt: asset?.appraisal?.timestamp ? new Date(+asset.appraisal.timestamp * 1e3) : null,
        name: asset.name,
        createdAt: now,
      })),
    );
  }
}
