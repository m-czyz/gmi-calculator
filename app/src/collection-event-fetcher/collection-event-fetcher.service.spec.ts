import { Test, TestingModule } from '@nestjs/testing';

import { CollectionEventFetcherService } from './collection-event-fetcher.service';

describe('CollectionEventFetcherService', () => {
  let service: CollectionEventFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionEventFetcherService],
    }).compile();

    service = module.get<CollectionEventFetcherService>(CollectionEventFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
