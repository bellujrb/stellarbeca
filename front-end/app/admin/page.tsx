'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/admin-header';
import SidebarMenu from '@/components/admin/sidebar-menu';
import ListBecas from '@/components/admin/list-becas';
import { useWallet } from '@/contexts/wallet-context';
import { WalletRequiredMessage } from '@/components/admin/wallet-require-message';
import TransactionsSection from '@/components/admin/transactions';
import RankingResearchers from '@/components/admin/ranking-researchers';
import RendimientosSection from '@/components/admin/rendimientos';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('becas');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected } = useWallet();

  const renderContent = () => {
    if (!isConnected) {
      return <WalletRequiredMessage />;
    }

    switch (activeSection) {
      case 'becas':
        return <ListBecas />;
      case 'clasificacion':
        return <RankingResearchers/>;
      case 'transactions':
        return <TransactionsSection/>;
      case 'rendimientos':
        return <RendimientosSection/>;
      default:
        return <div className="p-6 bg-white rounded-xl shadow-sm">404</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stellar-white-50 to-stellar-white-100 flex">
      <SidebarMenu
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader
          onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        />
        
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}