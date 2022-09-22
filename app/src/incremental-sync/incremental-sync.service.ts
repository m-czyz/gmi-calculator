import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Big from 'big.js';
import { randomUUID } from 'crypto';
import { EntityManager } from 'typeorm';

import { CollectionEventFetcherService } from '../collection-event-fetcher/collection-event-fetcher.service';
import { NftAppraisalService } from '../nft-appraisal/nft-appraisal.service';
import { SynchronizationManagerService } from '../synchronization-manager/synchronization-manager.service';
import { IncrementalSyncRepository } from './incremental-sync.repository';

@Injectable()
export class IncrementalSyncService implements OnModuleInit {
  private readonly logger = new Logger(IncrementalSyncService.name);

  public constructor(
    private readonly synchronizationManagerService: SynchronizationManagerService,
    private readonly incrementalSyncRepository: IncrementalSyncRepository,
    private readonly collectionEventFetcherService: CollectionEventFetcherService,
    private readonly nftAppraisalService: NftAppraisalService,
    private readonly entityManager: EntityManager,
  ) {}

  public async onModuleInit(): Promise<void> {
    await this.startIncrementalSync();
  }

  private async startIncrementalSync() {
    const lastSync = await this.synchronizationManagerService.getLatestSync();

    if (!lastSync) {
      this.logger.warn('Incremental sync mechanism is disabled because init sync is not completed');
      return;
    }

    const syncUntil = new Date();

    const { events } = await this.collectionEventFetcherService.getCollectionEventsPaginated(
      'CryptoPunks',
      ['SALE', 'TRANSFER'],
      {
        from: lastSync.synchronizedUntil,
        to: syncUntil,
      },
    );

    if (!events.length) {
      this.logger.log('Incremental sync did not detected any changes, ending');
      return;
    }

    this.logger.log(`Incremental sync will process ${events.length} events`);

    const affectedAssetsIds = [...new Set(events.map(event => event.asset_id))];

    const assets = await this.nftAppraisalService.getAssetsAppraisal(affectedAssetsIds);

    const affectedAddressesIds = [
      ...new Set([...events.map(event => event.from_address), ...events.map(event => event.to_address)]),
    ];

    const tradeEvents = events.filter(event => event.type === 'SALE');

    await this.entityManager.transaction(async em => {
      // update assets appraisal first
      for (const asset of assets) {
        await this.incrementalSyncRepository.updateAssetAppraisal(em, asset);
      }

      // track owner changes
      for (const event of events) {
        await this.incrementalSyncRepository.updateAssetOwner(em, event.asset_id, event.to_address, syncUntil);
      }

      // insert new trades
      await this.incrementalSyncRepository.insertNewTrades(
        em,
        tradeEvents.map(event => ({
          id: randomUUID(),
          transactionId: event.tx_hash,
          wei: Big(event.wei),
          tokenId: event.token_id,
          assetId: event.asset_id,
          collectionId: event.collection_id,
          fromAddress: event.from_address,
          toAddress: event.to_address,
          timestamp: new Date(event.timestamp * 1e3),
        })),
      );

      // recalculate rank factors for affected addresses
      await this.incrementalSyncRepository.recalculateRankFactors(em, affectedAddressesIds, syncUntil);
    });

    this.logger.log(`Incremental sync has been completed`);

    // @todo this also should be in the transaction. cutting corners
    await this.synchronizationManagerService.storeSuccessfulSync(syncUntil, new Date());

    setTimeout(() => {
      this.startIncrementalSync();
    }, 1000);
  }
}
