import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CD3WICRNUIPSLRX2RWV5ZTFTKZGRMEZVTKX25EQKFNT7QRTF3KPKVX7M",
  }
} as const

export type MilestoneStatus = {tag: "Pending", values: void} | {tag: "Approved", values: void} | {tag: "Rejected", values: void};


export interface Milestone {
  approvers: Array<string>;
  description: string;
  name: string;
  paid: boolean;
  status: MilestoneStatus;
}


export interface Grant {
  claimed_amount: i128;
  creation_timestamp: u64;
  funder: string;
  manager: string;
  name: string;
  registered_milestones: u32;
  researcher: string;
  supervisor: string;
  total_amount: i128;
  total_milestones: u32;
}

export type StorageKey = {tag: "TokenAddress", values: void} | {tag: "NextGrantId", values: void} | {tag: "Grants", values: void} | {tag: "Milestones", values: void};

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({token_address}: {token_address: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_grant transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_grant: ({funder, manager, supervisor, researcher, name, total_amount, total_milestones}: {funder: string, manager: string, supervisor: string, researcher: string, name: string, total_amount: i128, total_milestones: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u64>>

  /**
   * Construct and simulate a register_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  register_milestone: ({manager, grant_id, name, description}: {manager: string, grant_id: u64, name: string, description: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a approve_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  approve_milestone: ({signer, grant_id, milestone_id}: {signer: string, grant_id: u64, milestone_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a claim_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  claim_payment: ({claimer, grant_id, milestone_id}: {claimer: string, grant_id: u64, milestone_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_grant transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_grant: ({id}: {id: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Grant>>

  /**
   * Construct and simulate a get_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_milestone: ({grant_id, milestone_id}: {grant_id: u64, milestone_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Milestone>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAD01pbGVzdG9uZVN0YXR1cwAAAAADAAAAAAAAAAAAAAAHUGVuZGluZwAAAAAAAAAAAAAAAAhBcHByb3ZlZAAAAAAAAAAAAAAACFJlamVjdGVk",
        "AAAAAQAAAAAAAAAAAAAACU1pbGVzdG9uZQAAAAAAAAUAAAAAAAAACWFwcHJvdmVycwAAAAAAA+oAAAATAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAEcGFpZAAAAAEAAAAAAAAABnN0YXR1cwAAAAAH0AAAAA9NaWxlc3RvbmVTdGF0dXMA",
        "AAAAAQAAAAAAAAAAAAAABUdyYW50AAAAAAAACgAAAAAAAAAOY2xhaW1lZF9hbW91bnQAAAAAAAsAAAAAAAAAEmNyZWF0aW9uX3RpbWVzdGFtcAAAAAAABgAAAAAAAAAGZnVuZGVyAAAAAAATAAAAAAAAAAdtYW5hZ2VyAAAAABMAAAAAAAAABG5hbWUAAAAQAAAAAAAAABVyZWdpc3RlcmVkX21pbGVzdG9uZXMAAAAAAAAEAAAAAAAAAApyZXNlYXJjaGVyAAAAAAATAAAAAAAAAApzdXBlcnZpc29yAAAAAAATAAAAAAAAAAx0b3RhbF9hbW91bnQAAAALAAAAAAAAABB0b3RhbF9taWxlc3RvbmVzAAAABA==",
        "AAAAAgAAAAAAAAAAAAAAClN0b3JhZ2VLZXkAAAAAAAQAAAAAAAAAAAAAAAxUb2tlbkFkZHJlc3MAAAAAAAAAAAAAAAtOZXh0R3JhbnRJZAAAAAAAAAAAAAAAAAZHcmFudHMAAAAAAAAAAAAAAAAACk1pbGVzdG9uZXMAAA==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAANdG9rZW5fYWRkcmVzcwAAAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAMY3JlYXRlX2dyYW50AAAABwAAAAAAAAAGZnVuZGVyAAAAAAATAAAAAAAAAAdtYW5hZ2VyAAAAABMAAAAAAAAACnN1cGVydmlzb3IAAAAAABMAAAAAAAAACnJlc2VhcmNoZXIAAAAAABMAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAx0b3RhbF9hbW91bnQAAAALAAAAAAAAABB0b3RhbF9taWxlc3RvbmVzAAAABAAAAAEAAAAG",
        "AAAAAAAAAAAAAAAScmVnaXN0ZXJfbWlsZXN0b25lAAAAAAAEAAAAAAAAAAdtYW5hZ2VyAAAAABMAAAAAAAAACGdyYW50X2lkAAAABgAAAAAAAAAEbmFtZQAAABAAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAABAAAABA==",
        "AAAAAAAAAAAAAAARYXBwcm92ZV9taWxlc3RvbmUAAAAAAAADAAAAAAAAAAZzaWduZXIAAAAAABMAAAAAAAAACGdyYW50X2lkAAAABgAAAAAAAAAMbWlsZXN0b25lX2lkAAAABAAAAAA=",
        "AAAAAAAAAAAAAAANY2xhaW1fcGF5bWVudAAAAAAAAAMAAAAAAAAAB2NsYWltZXIAAAAAEwAAAAAAAAAIZ3JhbnRfaWQAAAAGAAAAAAAAAAxtaWxlc3RvbmVfaWQAAAAEAAAAAA==",
        "AAAAAAAAAAAAAAAJZ2V0X2dyYW50AAAAAAAAAQAAAAAAAAACaWQAAAAAAAYAAAABAAAH0AAAAAVHcmFudAAAAA==",
        "AAAAAAAAAAAAAAANZ2V0X21pbGVzdG9uZQAAAAAAAAIAAAAAAAAACGdyYW50X2lkAAAABgAAAAAAAAAMbWlsZXN0b25lX2lkAAAABAAAAAEAAAfQAAAACU1pbGVzdG9uZQAAAA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        create_grant: this.txFromJSON<u64>,
        register_milestone: this.txFromJSON<u32>,
        approve_milestone: this.txFromJSON<null>,
        claim_payment: this.txFromJSON<null>,
        get_grant: this.txFromJSON<Grant>,
        get_milestone: this.txFromJSON<Milestone>
  }
}