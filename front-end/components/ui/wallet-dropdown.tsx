'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown,
  Copy,
  Check,
  LogOut,
  Coins
} from 'lucide-react';
import { useWalletActions } from '@/hooks/use-wallet-actions';
import { formatAddress, getWalletDisplayName } from '@/lib/wallet-utils';
import StellarIcon from './stellar-icon';
import StellarAvatar from './stellar-avatar';

const WalletDropdown: React.FC = () => {
  const { 
    isConnected, 
    publicKey, 
    selectedWallet, 
    connect, 
    disconnect, 
    getFormattedBalance,
    isLoading, 
    error 
  } = useWalletActions();
  
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState('0 XLM');
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load balance when wallet is connected
  useEffect(() => {
    const loadBalance = async () => {
      if (isConnected && publicKey) {
        setLoadingBalance(true);
        try {
          const formattedBalance = await getFormattedBalance();
          setBalance(formattedBalance);
        } catch (err) {
          console.error('Error loading balance:', err);
          setBalance('0 XLM');
        } finally {
          setLoadingBalance(false);
        }
      } else {
        setBalance('0 XLM');
      }
    };

    loadBalance();
  }, [isConnected, publicKey, getFormattedBalance]);

  const handleCopyAddress = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setIsOpen(false);
  };

  const handleConnect = async () => {
    await connect();
  };

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        disabled={isLoading}
        className="bg-stellar-gold-500 hover:bg-stellar-gold-600 text-stellar-black-900 border-0 font-semibold px-6 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2"
      >
        <span>{isLoading ? 'Conectando...' : 'Conectar Billetera'}</span>
      </Button>
    );
  }

  return (
    <div className="relative">
             {/* Wallet Button */}
       <Button
         onClick={() => setIsOpen(!isOpen)}
         variant="outline"
         className="bg-white hover:bg-stellar-white-100 border-stellar-black-200 text-stellar-black-900 font-medium px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-3"
       >
         {/* Stellar Avatar */}
         {publicKey ? (
           <StellarAvatar address={publicKey} size="md" />
         ) : (
           <StellarIcon size="md" />
         )} 
         
         {/* Chevron */}
         <ChevronDown className={`w-4 h-4 text-stellar-black-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
       </Button>

      {/* Dropdown Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-stellar-black-200 shadow-xl z-50 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-stellar-black-100">
              <div className="flex items-center space-x-3">
                                 {/* Stellar Avatar */}
                 {publicKey ? (
                   <StellarAvatar address={publicKey} size="lg" />
                 ) : (
                   <StellarIcon size="lg" />
                 )}
                
                {/* Wallet Info */}
                <div className="flex-1">
                                   <p className="text-sm font-medium text-stellar-black-900">
                   {publicKey ? formatAddress(publicKey) : 'Cargando...'}
                 </p>
                                     <p className="text-xs text-stellar-black-500">
                     {selectedWallet ? getWalletDisplayName(selectedWallet) : 'Billetera'}
                   </p>
                </div>
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 hover:bg-stellar-black-100"
                >
                  <span className="text-stellar-black-500">×</span>
                </Button>
              </div>
            </div>

            {/* Balance Section */}
            <div className="p-4 border-b border-stellar-black-100">
                             <div className="flex items-center space-x-2">
                 <Coins className="w-4 h-4 text-stellar-gold-600" />
                 <span className="text-sm text-stellar-black-600">Saldo en XLM</span>
               </div>
                             <p className="text-lg font-semibold text-stellar-black-900 mt-1">
                 {loadingBalance ? 'Cargando...' : balance}
               </p>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3">
              {/* Copy Address Button */}
              <Button
                onClick={handleCopyAddress}
                variant="outline"
                className="w-full justify-start border-stellar-black-200 text-stellar-black-700 hover:bg-stellar-black-50"
              >
                <div className="flex items-center space-x-3">
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                                     <span className="text-sm">
                     {copied ? '¡Dirección Copiada!' : 'Copiar Dirección'}
                   </span>
                </div>
              </Button>

              {/* Disconnect Button */}
              <Button
                onClick={handleDisconnect}
                disabled={isLoading}
                variant="outline"
                className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">
                    {isLoading ? 'Desconectando...' : 'Desconectar'}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletDropdown; 