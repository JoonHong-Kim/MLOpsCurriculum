import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigModule } from './config/database/config.module';
import { PostgresConfigService } from './config/database/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
