import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from 'src/config/database.config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [] 
    }),
  ],
})
export class DatabaseModule {}
