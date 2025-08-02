'use client';

import React from 'react';
import { 
  Coins,
  Trophy,
  HandCoins,
} from 'lucide-react';

interface NavigationTabsProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeSection,
  onSectionChange
}) => {
  const navigationSections = [
    {
      id: 'becas',
      label: 'Becas',
      icon: HandCoins,
      color: 'text-stellar-gold-600',
    },
    {
      id: 'gestion-fondos',
      label: 'Gestión de Fondos',
      icon: Coins,
      color: 'text-stellar-gold-600',
    },
    {
      id: 'ranking',
      label: 'Ranking',
      icon: Trophy,
      color: 'text-stellar-gold-600',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-1 bg-stellar-white-600 rounded-2xl p-2 shadow-lg border border-stellar-black-100">
        {navigationSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 flex-1 justify-center ${
                activeSection === section.id
                  ? 'bg-stellar-gold-500 text-stellar-black-900 shadow-lg font-bold'
                  : 'text-stellar-black-600 hover:bg-stellar-gold-50 hover:text-stellar-gold-600'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="font-semibold text-sm">{section.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;