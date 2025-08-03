import React from "react";
import { AlertTriangle, Wallet } from "lucide-react";

export const WalletRequiredMessage: React.FC = () => {

  return (
    <div className="flex items-center justify-center py-12">
      <div className="max-w-md w-full">
        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-xl border border-stellar-black-100 overflow-hidden">

          {/* Conteúdo */}
          <div className="px-6 py-8">
            {/* Ícone de alerta */}
            <div className="flex justify-center mb-6">
              <div className="bg-amber-50 rounded-full p-3">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
            </div>

            {/* Mensagem */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-stellar-black-900 mb-3">
                Billetera no conectada
              </h2>
              <p className="text-stellar-black-600 leading-relaxed mb-4">
                Para acceder al panel administrativo, necesitas conectar tu billetera de Stellar.
              </p>
              <div className="bg-stellar-gold-50 border border-stellar-gold-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Wallet className="w-5 h-5 text-stellar-gold-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-stellar-gold-800 mb-1">
                      Billetera Stellar Requerida
                    </p>
                    <p className="text-xs text-stellar-gold-700">
                      Conecte su billetera Freighter o otra billetera compatible con Stellar para continuar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};