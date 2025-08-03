'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu
} from 'lucide-react';
import WalletDropdown from '@/components/ui/wallet-dropdown';

interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  onMobileMenuToggle
}) => {
  return (
    <div className="bg-stellar-white-600 border-b border-stellar-black-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuToggle}
              className="md:hidden p-2 text-stellar-black-600 hover:bg-stellar-gold-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-xs text-stellar-black-500 font-medium bg-stellar-gold-50 px-2 py-1 rounded-lg border border-stellar-gold-200">DApp</div>
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