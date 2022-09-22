import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { AssetEntity } from './initial-sync/asset-sync/asset.entity';
import { TradeEntity } from './initial-sync/trade-sync/trade.entity';
import { WalletEntity } from './initial-sync/wallet-sync/wallet.entity';

const { POSTGRES_DB_HOST, POSTGRES_DB_PORT, POSTGRES_DB_USER, POSTGRES_DB_PASSWORD, POSTGRES_DB_DATABASE, DEBUG } =
  process.env;

export const DATABASE_CONFIG = {
  type: 'postgres',
  host: POSTGRES_DB_HOST,
  port: POSTGRES_DB_PORT ? +POSTGRES_DB_PORT : 5432,
  username: POSTGRES_DB_USER,
  password: POSTGRES_DB_PASSWORD,
  database: POSTGRES_DB_DATABASE,
  extra: { characterSet: 'UTF8' },
  entities: [TradeEntity, WalletEntity, AssetEntity],
  ...(DEBUG === '1' ? { logging: 'all', logger: 'advanced-console' } : {}),
} as PostgresConnectionOptions;
