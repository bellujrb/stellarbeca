import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grant } from './entities/grant.entity';
import { User } from './entities/user.entity';
import { GrantService } from './grant.service';
import { GrantController } from './grant.controller';
import { SorobanModule } from '../soroban/soroban.module';

@Module({
  imports: [TypeOrmModule.forFeature([Grant, User]), SorobanModule],
  providers: [GrantService],
  controllers: [GrantController],
})
export class GrantModule {}