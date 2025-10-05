// data-source.ts
import { config } from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';

config();

export const dataSourceOpts: DataSourceOptions = {
  type: 'postgres',
  logging: true,
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};
export const dataSource = new DataSource(dataSourceOpts);
