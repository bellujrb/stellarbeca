// src/soroban/soroban.module.ts
// ESTE CÓDIGO ESTÁ CORRETO E NÃO PRECISA DE MUDANÇAS

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Contract, SorobanRpc } from '@stellar/stellar-sdk';
import { SorobanService } from './soroban.service';

@Module({
  imports: [ConfigModule],
  providers: [
    SorobanService,
    {
      provide: 'SOROBAN_RPC',
      useFactory: (configService: ConfigService) => {
        const rpcUrl = configService.get<string>('SOROBAN_RPC_URL');
        return new SorobanRpc.Server(rpcUrl, { allowHttp: true });
      },
      inject: [ConfigService],
    },
    {
      provide: 'SOROBAN_CONTRACT',
      useFactory: (configService: ConfigService) => {
        const contractId = configService.get<string>('SOROBAN_CONTRACT_ID');
        return new Contract(contractId);
      },
      inject: [ConfigService],
    },
  ],
  exports: [SorobanService],
})
export class SorobanModule {}
