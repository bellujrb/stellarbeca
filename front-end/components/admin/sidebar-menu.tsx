'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Gift,
  BarChart3,
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LogOut,
  X,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarMenuProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  activeSection,
  onSectionChange,
  isMobileOpen = false,
  onMobileClose
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems = [
    {
      id: 'becas',
      label: 'Becas',
      icon: Gift,
      badge: '',
      badgeColor: 'bg-red-500'
    },
    {
      id: 'clasificacion',
      label: 'Clasificación',
      icon: BarChart3,
      badge: '',
      badgeColor: 'bg-stellar-lilac-400'
    },
  ];

  const secondaryNavItems = [
    {
      id: 'transactions',
      label: 'Transacciones',
      icon: CreditCard,
    },
    {
      id: 'rendimientos',
      label: 'Rendimientos',
      icon: TrendingUp,
    },
  ];

  const supportItem = {
    id: 'support',
    label: 'Documentación',
    icon: HelpCircle,
    href: 'https://stellarbecca.github.io/documentation/',
    external: true
  };

  const NavItem = ({ item, isActive, onClick }: any) => {
    const IconComponent = item.icon;

    return (
      <button
        onClick={() => onClick(item.id)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
          isActive
            ? "bg-stellar-gold-500 text-stellar-black-900 shadow-lg"
            : "text-stellar-black-600 hover:bg-stellar-gold-50 hover:text-stellar-gold-600"
        )}
      >
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
          isActive
            ? "bg-stellar-black-900/10"
            : "bg-stellar-black-100 group-hover:bg-stellar-gold-100"
        )}>
          <IconComponent className={cn(
            "w-4 h-4 transition-colors duration-200",
            isActive
              ? "text-stellar-black-900"
              : "text-stellar-black-600 group-hover:text-stellar-gold-600"
          )} />
        </div>

        {!isCollapsed && (
          <>
            <span className="font-medium text-sm flex-1 text-left">
              {item.label}
            </span>

            {item.badge && (
              <div className={cn(
                "px-2 py-0.5 rounded-full text-xs font-bold text-white",
                item.badgeColor
              )}>
                {item.badge}
              </div>
            )}
          </>
        )}

        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-stellar-black-900 rounded-r-full" />
        )}
      </button>
    );
  };

  const ExternalNavItem = ({ item }: any) => {
    const IconComponent = item.icon;

    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative text-stellar-black-600 hover:bg-stellar-gold-50 hover:text-stellar-gold-600"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 bg-stellar-black-100 group-hover:bg-stellar-gold-100">
          <IconComponent className="w-4 h-4 transition-colors duration-200 text-stellar-black-600 group-hover:text-stellar-gold-600" />
        </div>

        {!isCollapsed && (
          <>
            <span className="font-medium text-sm flex-1 text-left">
              {item.label}
            </span>
            <ExternalLink className="w-4 h-4 text-stellar-black-400 group-hover:text-stellar-gold-600" />
          </>
        )}
      </a>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-stellar-black-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-stellar-black-100">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="font-black text-stellar-black-900">Stellarbeca</h1>
              <p className="text-xs text-stellar-black-500">Powered By Stellar</p>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex w-8 h-8 p-0 hover:bg-stellar-gold-50"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-stellar-black-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-stellar-black-600" />
          )}
        </Button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stellar-black-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-stellar-black-50 border border-stellar-black-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stellar-gold-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-2 space-y-6">
        {/* Primary Actions */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-stellar-black-400 uppercase tracking-wider mb-3">
              Gestión
            </h3>
          )}
          {mainNavItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={onSectionChange}
            />
          ))}
        </div>

        {/* Secondary Actions */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-stellar-black-400 uppercase tracking-wider mb-3">
              Gestión
            </h3>
          )}
          {secondaryNavItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={onSectionChange}
            />
          ))}
        </div>

        {/* Support */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-stellar-black-400 uppercase tracking-wider mb-3">
              Apoyo
            </h3>
          )}
          <ExternalNavItem item={supportItem} />
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-stellar-black-100">
        <button 
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
          onClick={() => {
            window.localStorage.removeItem('walletConnected');
            window.location.href = '/';
          }}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 transition-all duration-200">
            <LogOut className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <span className="font-medium text-sm">Cerrar sesión</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72"
      )}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stellar-black-900/50 backdrop-blur-sm"
            onClick={onMobileClose}
          />

          {/* Sidebar */}
          <div className="relative w-72 h-full">
            <SidebarContent />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileClose}
              className="absolute top-4 right-4 w-8 h-8 p-0 hover:bg-stellar-gold-50"
            >
              <X className="w-4 h-4 text-stellar-black-600" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarMenu;