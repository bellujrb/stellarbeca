'use client';

import React from 'react';
import { TrendingUp, Lock, Coins } from 'lucide-react';

const Rendimientos: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-stellar-black-900">Rendimientos</h2>
          <p className="text-sm text-stellar-black-600">Optimización de rendimientos a través de yield farming</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl p-8 border border-stellar-black-200 shadow-sm">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-stellar-gold-100 rounded-full p-6">
              <div className="relative">
                <Coins className="w-8 h-8 text-stellar-gold-600" />
                <Lock className="w-4 h-4 text-stellar-gold-700 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-stellar-black-900">
              Yield Farming Automático
            </h3>
            <p className="text-stellar-black-600 leading-relaxed">
              Los milestones con XLM bloqueado serán enviados automáticamente a protocolos DeFi 
              como <span className="font-semibold text-stellar-black-800">Hoops Finance</span> y <span className="font-semibold text-stellar-black-800">Soroswap</span> para generar rendimientos adicionales a través de yield farming, 
              maximizando el retorno de las becas mientras están en progreso.
            </p>
          </div>

          {/* Protocols */}
          <div className="flex justify-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-stellar-black-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Hoops Finance</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stellar-black-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Soroswap</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-stellar-gold-50 text-stellar-gold-700 px-4 py-2 rounded-full text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Próximamente en V2
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rendimientos;