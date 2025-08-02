import { useCallback } from 'react';
import { useWallet } from '@/contexts/wallet-context';
import { WalletNetwork } from '@creit.tech/stellar-wallets-kit';

export const useWalletActions = () => {
  const { 
    kit, 
    isConnected, 
    publicKey, 
    selectedWallet, 
    connect, 
    disconnect, 
    signTransaction,
    isLoading, 
    error 
  } = useWallet();

  const safeConnect = useCallback(async () => {
    try {
      await connect();
    } catch (err) {
      console.error('Connection failed:', err);
      throw new Error('Failed to connect wallet. Please try again.');
    }
  }, [connect]);

  const safeDisconnect = useCallback(async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error('Disconnection failed:', err);
      throw new Error('Failed to disconnect wallet. Please try again.');
    }
  }, [disconnect]);

  const safeSignTransaction = useCallback(async (
    transactionXdr: string,
    network: WalletNetwork = WalletNetwork.TESTNET
  ) => {
    if (!isConnected) {
      throw new Error('Wallet not connected. Please connect your wallet first.');
    }

    if (!kit) {
      throw new Error('Wallet kit not initialized.');
    }

    try {
      const signedTx = await signTransaction(transactionXdr);
      if (!signedTx) {
        throw new Error('Transaction signing failed.');
      }
      return signedTx;
    } catch (err) {
      console.error('Transaction signing failed:', err);
      throw new Error('Failed to sign transaction. Please try again.');
    }
  }, [isConnected, kit, signTransaction]);

  const getWalletInfo = useCallback(() => {
    return {
      isConnected,
      publicKey,
      selectedWallet,
      isLoading,
      error
    };
  }, [isConnected, publicKey, selectedWallet, isLoading, error]);

  return {
    // Actions
    connect: safeConnect,
    disconnect: safeDisconnect,
    signTransaction: safeSignTransaction,
    
    // State
    getWalletInfo,
    isConnected,
    publicKey,
    selectedWallet,
    isLoading,
    error,
    
    // Raw kit for advanced usage
    kit
  };
}; 