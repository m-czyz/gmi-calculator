import { DataSource } from 'typeorm';

import { DATABASE_CONFIG } from './database-config';

const datasource = new DataSource({
  ...DATABASE_CONFIG,
  migrations: ['migrations/*.ts'],
  synchronize: false,
});

datasource.initialize().then();

export default datasource;
