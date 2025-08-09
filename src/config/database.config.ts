import { config } from 'dotenv';
import { Dialect } from 'sequelize';

config();

export const databaseConfig = {
  dialect: 'postgres' as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  autoLoadModels: true,
  synchronize: false // migrations vão controlar o schema
};
