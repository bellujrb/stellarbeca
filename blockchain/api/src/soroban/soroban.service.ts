import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Account,
  Address,
  Contract,
  SorobanRpc,
  TransactionBuilder,
  scValToNative,
  xdr,
} from '@stellar/stellar-sdk';

@Injectable()
export class SorobanService {
  private readonly networkPassphrase: string;
  private readonly contractId: string;

  constructor(
    @Inject('SOROBAN_RPC') private readonly server: SorobanRpc.Server,
    @Inject('SOROBAN_CONTRACT') private readonly contract: Contract,
    private readonly configService: ConfigService,
  ) {
    this.networkPassphrase = this.configService.get<string>(
      'SOROBAN_NETWORK_PASSPHRASE',
    );
    this.contractId = this.configService.get<string>('SOROBAN_CONTRACT_ID');
  }

  public async getGrantDetails(grantId: bigint): Promise<any> {
    const op = this.contract.call(
      'get_grant',
      xdr.ScVal.scvU64(new xdr.Uint64(grantId)),
    );
    const tx = new TransactionBuilder(new Account(this.contractId, '0'), {
      fee: '0',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(op)
      .setTimeout(30)
      .build();
    const result = await this.server.simulateTransaction(tx);
    if (SorobanRpc.Api.isSimulationSuccess(result)) {
      return scValToNative(result.result!.retval);
    }
    throw new Error('Grant not found or simulation failed.');
  }

  public async getMilestoneDetails(
    grantId: bigint,
    milestoneId: number,
  ): Promise<any> {
    const op = this.contract.call(
      'get_milestone',
      xdr.ScVal.scvU64(new xdr.Uint64(grantId)),
      xdr.ScVal.scvU32(milestoneId),
    );
    const tx = new TransactionBuilder(new Account(this.contractId, '0'), {
      fee: '0',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(op)
      .setTimeout(30)
      .build();
    const result = await this.server.simulateTransaction(tx);
    if (SorobanRpc.Api.isSimulationSuccess(result)) {
      return scValToNative(result.result!.retval);
    }
    throw new Error('Milestone not found or simulation failed.');
  }

  private async buildTransaction(
    sourceAddress: string,
    operation: xdr.Operation,
  ): Promise<string> {
    const sourceAccount = await this.server.getAccount(sourceAddress);
    const tx = new TransactionBuilder(sourceAccount, {
      fee: '1000000',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(operation)
      .setTimeout(30)
      .build();
    return tx.toXDR();
  }

  public async buildCreateGrantTransaction(data: any): Promise<string> {
    const {
      funder,
      manager,
      supervisor,
      researcher,
      name,
      total_amount,
      total_milestones,
    } = data;
    const op = this.contract.call(
      'create_grant',
      new Address(funder).toScVal(),
      new Address(manager).toScVal(),
      new Address(supervisor).toScVal(),
      new Address(researcher).toScVal(),
      xdr.ScVal.scvString(name),
      xdr.ScVal.scvI128(
        new xdr.Int128Parts({
          hi: new xdr.Int64(BigInt(0)),
          lo: new xdr.Uint64(BigInt(total_amount)),
        }),
      ),
      xdr.ScVal.scvU32(total_milestones),
    );
    return this.buildTransaction(funder, op);
  }

  public async buildRegisterMilestoneTransaction(data: any): Promise<string> {
    const { manager, grant_id, name, description } = data;
    const op = this.contract.call(
      'register_milestone',
      new Address(manager).toScVal(),
      xdr.ScVal.scvU64(new xdr.Uint64(BigInt(grant_id))),
      xdr.ScVal.scvString(name),
      xdr.ScVal.scvString(description),
    );
    return this.buildTransaction(manager, op);
  }

  public async buildApproveMilestoneTransaction(data: any): Promise<string> {
    const { signer, grant_id, milestone_id } = data;
    const op = this.contract.call(
      'approve_milestone',
      new Address(signer).toScVal(),
      xdr.ScVal.scvU64(new xdr.Uint64(BigInt(grant_id))),
      xdr.ScVal.scvU32(milestone_id),
    );
    return this.buildTransaction(signer, op);
  }

  public async buildClaimPaymentTransaction(data: any): Promise<string> {
    const { claimer, grant_id, milestone_id } = data;
    const op = this.contract.call(
      'claim_payment',
      new Address(claimer).toScVal(),
      xdr.ScVal.scvU64(new xdr.Uint64(BigInt(grant_id))),
      xdr.ScVal.scvU32(milestone_id),
    );
    return this.buildTransaction(claimer, op);
  }
}