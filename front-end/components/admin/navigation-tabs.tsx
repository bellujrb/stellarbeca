'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Coins,
  Trophy,
  HandCoins,
  ChevronDown,
} from 'lucide-react';

interface NavigationTabsProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeSection,
  onSectionChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const activeSectionData = navigationSections.find(section => section.id === activeSection);

  return (
    <div className="mb-4 sm:mb-6 lg:mb-8">
      {/* Versão desktop/tablet - tabs horizontais */}
      <div className="hidden md:block">
        <div className="flex items-center space-x-1 bg-stellar-white-600 rounded-2xl p-2 shadow-lg border border-stellar-black-100">
          {navigationSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 flex-1 ${
                  activeSection === section.id
                    ? 'bg-stellar-gold-500 text-stellar-black-900 shadow-lg font-bold'
                    : 'text-stellar-black-600 hover:bg-stellar-gold-50 hover:text-stellar-gold-600'
                }`}
                title={section.label}
                aria-label={section.label}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-semibold text-sm">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Versão mobile compacta - apenas ícones */}
      <div className="hidden sm:block md:hidden">
        <div className="flex items-center space-x-1 bg-stellar-white-600 rounded-xl p-2 shadow-lg border border-stellar-black-100">
          {navigationSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 flex-1 ${
                  activeSection === section.id
                    ? 'bg-stellar-gold-500 text-stellar-black-900 shadow-lg font-bold'
                    : 'text-stellar-black-600 hover:bg-stellar-gold-50 hover:text-stellar-gold-600'
                }`}
                title={section.label}
                aria-label={section.label}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-semibold text-xs">
                  {section.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Versão mobile muito pequeno - dropdown */}
      <div className="block sm:hidden" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-stellar-white-600 rounded-xl p-3 shadow-lg border border-stellar-black-100 text-left"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <div className="flex items-center space-x-2">
              {activeSectionData && (
                <>
                  <activeSectionData.icon className="w-5 h-5 text-stellar-gold-600" />
                  <span className="font-semibold text-sm">{activeSectionData.label}</span>
                </>
              )}
            </div>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {isDropdownOpen && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 bg-stellar-white-600 rounded-xl shadow-lg border border-stellar-black-100 z-10"
              role="menu"
            >
              {navigationSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      onSectionChange(section.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                      activeSection === section.id
                        ? 'bg-stellar-gold-500 text-stellar-black-900 font-bold'
                        : 'text-stellar-black-600 hover:bg-stellar-gold-50 hover:text-stellar-gold-600'
                    }`}
                    role="menuitem"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-semibold text-sm">{section.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;