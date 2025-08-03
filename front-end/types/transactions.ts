export type TransactionType = 
  | 'create_scholarship' 
  | 'fund_scholarship' 
  | 'define_milestone' 
  | 'milestone_claim' 
  | 'yield_deposit' 
  | 'yield_withdraw' 
  | 'multisig_approve' 
  | 'scholarship_complete';

export type TransactionStatus = 
  | 'confirmed' 
  | 'pending' 
  | 'failed' 
  | 'awaiting_signatures';

export interface TransactionDetails {
  scholarshipId?: string;
  scholarshipTitle?: string;
  student?: string;
  tutor?: string;
  coordinator?: string;
  milestoneNumber?: number;
  totalMilestones?: number;
  yieldAmount?: string;
  signaturesRequired?: number;
  signaturesReceived?: number;
  university?: string;
  researchArea?: string;
}

export interface Transaction {
  hash: string;
  type: TransactionType;
  status: TransactionStatus;
  timestamp: number;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  token: string;
  gasUsed: string;
  gasPrice: string;
}

export interface Transaction {
  hash: string;
  type: 'create_scholarship' | 'fund_scholarship' | 'define_milestone' | 'milestone_claim' | 'yield_deposit' | 'yield_withdraw' | 'multisig_approve' | 'scholarship_complete';
  status: 'confirmed' | 'pending' | 'failed' | 'awaiting_signatures';
  timestamp: number;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  token: string;
  gasUsed: string;
  gasPrice: string;
}