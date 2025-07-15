import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const datasourceConfig: DataSourceOptions & SeederOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  synchronize: true,
  entities: ['dist/modules/**/*.{entity,entities}.{js,ts}'],
  seeds: ['dist/modules/database/seeders/seeds/*.seed.{js,ts}'],
};

export const AppDatasource = new DataSource(datasourceConfig);
