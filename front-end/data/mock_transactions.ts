import { Transaction } from "@/types/transactions";

export const mockTransactions: Transaction[] = [
  {
    hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
    type: 'create_scholarship',
    status: 'confirmed',
    timestamp: Date.now() - 3600000, // 1 hour ago
    blockNumber: 15234567,
    from: '0x0000000000000000000000000000000000000000',
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b5Da5e', // Stellarbeca contract
    value: '0',
    token: 'XLM',
    gasUsed: '65432',
    gasPrice: '0.00001',
  },
];