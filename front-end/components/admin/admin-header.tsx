'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { setAllowed, isAllowed, getPublicKey } from '@stellar/freighter-api';

interface AdminHeaderProps {
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const connect = () => {
    setAllowed()
      .then(() => isAllowed())
      .then((allowed) => {
        if (allowed) {
          return getPublicKey();
        }
        throw new Error('Permissão negada');
      })
      .then((pk) => {
        setPublicKey(pk);
        setIsConnected(true);
      })
      .catch((error) => {
        console.error('Erro ao conectar:', error);
      });
  };

  // Check connection on mount
  useEffect(() => {
    const checkConnection = () => {
      isAllowed()
        .then((allowed) => {
          if (allowed) {
            return getPublicKey();
          }
          return null;
        })
        .then((pk) => {
          if (pk) {
            setPublicKey(pk);
            setIsConnected(true);
          }
        })
        .catch((error) => {
          console.error('Erro ao verificar conexão:', error);
        });
    };

    checkConnection();
  }, []);

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
            {isConnected ? (
              <div className="flex items-center space-x-3">
                {/* Wallet Address Display */}
                <div className="flex items-center space-x-2 bg-stellar-gold-50 px-3 py-2 rounded-xl border border-stellar-gold-200">
                  <Wallet className="w-4 h-4 text-stellar-gold-600" />
                  <div className="text-sm">
                    <span className="font-semibold text-stellar-gold-600">
                      {publicKey ? formatAddress(publicKey) : 'Conectado'}
                    </span>
                  </div>
                </div>
                
              </div>
            ) : (
              <Button
                onClick={connect}
                className="bg-stellar-gold-500 hover:bg-stellar-gold-600 text-stellar-black-900 border-0 font-semibold px-6 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Conectar Wallet</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;