import { Injectable, Logger } from '@nestjs/common';
import Big from 'big.js';
import { randomUUID } from 'crypto';

import { CollectionEventFetcherService } from '../../collection-event-fetcher/collection-event-fetcher.service';
import { CollectionEvent } from '../../collection-event-fetcher/collection-events.request';
import { TradeSyncRepository } from './trade-sync.repository';

@Injectable()
export class TradeSyncService {
  private readonly logger = new Logger(TradeSyncService.name);

  public constructor(
    private readonly collectionEventFetcherService: CollectionEventFetcherService,
    private readonly tradeSyncRepository: TradeSyncRepository,
  ) {}

  public async syncCollectionTrades(collection: string) {
    const now = new Date();

    this.logger.log(`trades sync has been started at ${now.toUTCString()}`);

    await this.tradeSyncRepository.clearCollection();

    this.logger.warn('trades has been purged');

    let page = 0;
    let pages = 0;
    const limit = 500;

    do {
      page++;
      const response = await this.collectionEventFetcherService.getCollectionTradesPaginated(
        collection,
        { to: now },
        (page - 1) * limit,
        limit,
      );

      if (!pages) {
        pages = Math.ceil(response.count / limit);
        this.logger.log(`trades pages ${pages} to sync`);
      }

      await this.saveBatch(response.events);

      this.logger.log(`batch page ${page} completed`);
    } while (pages > page);

    this.logger.log(`trade sync completed`);
  }

  private saveBatch(events: CollectionEvent[]) {
    return this.tradeSyncRepository.saveBatch(
      events.map(event => ({
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
  }
}
