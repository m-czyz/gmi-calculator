import { Command, CommandRunner } from 'nest-commander';

import { InitialSyncService } from './initial-sync.service';

@Command({
  name: 'initial-sync',
  description: 'Sync system from historical collection trade events',
})
export class InitialSyncCommand extends CommandRunner {
  public constructor(private readonly initialSyncService: InitialSyncService) {
    super();
  }

  public async run(passedParam: string[], options?: Record<string, any>): Promise<void> {
    await this.initialSyncService.sync('CryptoPunks');
  }
}
