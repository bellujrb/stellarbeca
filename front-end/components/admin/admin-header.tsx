'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Wallet,
  LogOut,
  Copy,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { useWalletActions } from '@/hooks/use-wallet-actions';
import { formatAddress, getWalletDisplayName } from '@/lib/wallet-utils';
import { useState } from 'react';

interface AdminHeaderProps {
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  selectedGame,
  onGameSelect
}) => {
  const { 
    isConnected, 
    publicKey, 
    selectedWallet, 
    connect, 
    disconnect, 
    isLoading, 
    error 
  } = useWalletActions();
  
  const [copied, setCopied] = useState(false);

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

  const handleConnect = async () => {
    await connect();
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <div className="bg-stellar-white-600 border-b border-stellar-black-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-stellar-black-600 hover:text-stellar-black-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div className="h-6 w-px bg-stellar-black-200"></div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-black text-stellar-black-900">Stellarbeca</span>
              <div className="text-xs text-stellar-black-500 font-medium bg-stellar-gold-50 px-2 py-1 rounded-lg border border-stellar-gold-200">App</div>
            </div>
          </div>

          {/* Right Side - Wallet Connection */}
          <div className="flex items-center space-x-4">
            {error && (
              <div className="text-red-500 text-sm bg-red-50 px-3 py-1 rounded-lg">
                {error}
              </div>
            )}
            
            {isConnected ? (
              <div className="flex items-center space-x-3">
                {/* Wallet Info */}
                <div className="flex items-center space-x-2 bg-stellar-gold-50 px-3 py-2 rounded-lg border border-stellar-gold-200">
                  <Wallet className="w-4 h-4 text-stellar-gold-600" />
                  <span className="text-sm font-medium text-stellar-black-700">
                    {selectedWallet ? getWalletDisplayName(selectedWallet) : 'Wallet'}
                  </span>
                </div>
                
                {/* Address Display */}
                <div className="flex items-center space-x-2 bg-stellar-white-500 px-3 py-2 rounded-lg border border-stellar-black-200">
                  <span className="text-sm text-stellar-black-600 font-mono">
                    {publicKey ? formatAddress(publicKey) : 'Loading...'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="h-6 w-6 p-0 hover:bg-stellar-black-100"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-stellar-black-400" />
                    )}
                  </Button>
                </div>
                
                {/* Disconnect Button */}
                <Button
                  onClick={handleDisconnect}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoading ? 'Desconectando...' : 'Desconectar'}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleConnect}
                disabled={isLoading}
                className="bg-stellar-gold-500 hover:bg-stellar-gold-600 text-stellar-black-900 border-0 font-semibold px-6 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>{isLoading ? 'Conectando...' : 'Conectar Wallet'}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;