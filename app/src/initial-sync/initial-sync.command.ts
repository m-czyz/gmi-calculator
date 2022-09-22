import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'initial sync',
  description: 'Sync system from historical collection trade events',
})
export class InitialSyncCommand extends CommandRunner {
  public async run(passedParam: string[], options?: Record<string, any>): Promise<void> {}
}
