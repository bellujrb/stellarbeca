'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/admin-header';
import NavigationTabs from '@/components/admin/navigation-tabs';

export default function TradingApp() {
  const [selectedGame, setSelectedGame] = useState('');
  const [activeSection, setActiveSection] = useState('becas');

  return (
    <div className="min-h-screen bg-stellar-white-600">
      <AdminHeader
        selectedGame={selectedGame}
        onGameSelect={setSelectedGame}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavigationTabs
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>
    </div>
  );
}