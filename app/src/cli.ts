import { CommandFactory } from 'nest-commander';

import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await CommandFactory.run(AppModule);
  // await app.get(InitialSyncService).sync('CryptoPunks');
}
bootstrap();
