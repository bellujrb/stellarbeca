import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantModule } from './grant/grant.module';
import { SorobanModule } from './soroban/soroban.module';
import { Grant } from './grant/entities/grant.entity';
import { User } from './grant/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Grant, User],
        synchronize: true, 
      }),
    }),
    SorobanModule,
    GrantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}