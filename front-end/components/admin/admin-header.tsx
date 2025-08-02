'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import WalletDropdown from '@/components/ui/wallet-dropdown';

interface AdminHeaderProps {
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  selectedGame,
  onGameSelect
}) => {
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

          {/* Right Side - Wallet Dropdown */}
          <div className="flex items-center space-x-4">
            <WalletDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;