import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, Users, Target, Building2, DollarSign } from 'lucide-react';
import ProgressBar from './progress-bar';
import { useFormContext } from '@/contexts/form-context';

interface ResumoStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ResumoStep: React.FC<ResumoStepProps> = ({ onNext, onBack }) => {
  const { formData } = useFormContext();
  const { infoBasicas, responsables, milestones } = formData;

  const carteirasPublicas = [
    { tipo: "Investigador", nome: responsables.investigador.nombre_completo, wallet: responsables.investigador.wallet_publica },
    { tipo: "Tutor", nome: responsables.tutor.nombre_completo, wallet: responsables.tutor.wallet_publica },
    { tipo: "Gestor", nome: responsables.gestor.nombre_completo, wallet: responsables.gestor.wallet_publica }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header com progresso - Stellar Design */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="p-2 hover:bg-stellar-black-50 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-stellar-black-700" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-stellar-black-900">Crear Nueva Beca</h2>
              <p className="text-sm text-stellar-black-600">Paso 4 de 5: Resumen y Confirmación</p>
            </div>
          </div>
        </div>

        {/* Progress bar reutilizável */}
        <ProgressBar currentStep={4} />
      </div>

      {/* Resumo da Beca - Stellar Design System */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-stellar-black-900 mb-2">Resumen de la Beca</h3>
            <p className="text-sm text-stellar-black-600">
              Revisa toda la información antes de finalizar la creación de la beca.
            </p>
          </div>

          {/* Grid de informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nome da Bolsa */}
            <div className="bg-stellar-black-25 rounded-xl p-4 border border-stellar-black-100">
              <div className="flex items-center space-x-3 mb-2">
                <Target className="h-5 w-5 text-stellar-gold-600" />
                <h4 className="font-semibold text-stellar-black-900">Nombre de la Beca</h4>
              </div>
              <p className="text-stellar-black-700 font-medium">{infoBasicas.nombre_beca}</p>
            </div>

            {/* Faculdade */}
            <div className="bg-stellar-black-25 rounded-xl p-4 border border-stellar-black-100">
              <div className="flex items-center space-x-3 mb-2">
                <Building2 className="h-5 w-5 text-stellar-gold-600" />
                <h4 className="font-semibold text-stellar-black-900">Institución</h4>
              </div>
              <p className="text-stellar-black-700 font-medium">{infoBasicas.institucion}</p>
            </div>

            {/* Valor Total */}
            <div className="bg-stellar-black-25 rounded-xl p-4 border border-stellar-black-100">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign className="h-5 w-5 text-stellar-gold-600" />
                <h4 className="font-semibold text-stellar-black-900">Valor Total</h4>
              </div>
              <p className="text-stellar-black-700 font-medium">{infoBasicas.valor_total} XLM</p>
            </div>
          </div>

          {/* Detalhes da Beca */}
          <div className="bg-stellar-black-25 rounded-xl p-4 border border-stellar-black-100">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="h-5 w-5 text-stellar-gold-600" />
              <h4 className="font-semibold text-stellar-black-900">Detalles de la Beca</h4>
            </div>
            <p className="text-stellar-black-700">{infoBasicas.details_beca}</p>
          </div>

          {/* Quantidade de Milestones */}
          <div className="bg-stellar-black-25 rounded-xl p-4 border border-stellar-black-100">
            <div className="flex items-center space-x-3 mb-3">
              <Target className="h-5 w-5 text-stellar-gold-600" />
              <h4 className="font-semibold text-stellar-black-900">Hitos ({milestones.length})</h4>
            </div>
            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-stellar-black-100">
                  <p className="font-medium text-stellar-black-800">{index + 1}. {milestone.nome}</p>
                  <p className="text-sm text-stellar-black-600 mt-1">{milestone.descripcion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Carteiras Públicas Cadastradas */}
          <div className="bg-stellar-black-25 rounded-xl p-4 border border-stellar-black-100">
            <div className="flex items-center space-x-3 mb-3">
              <Wallet className="h-5 w-5 text-stellar-gold-600" />
              <h4 className="font-semibold text-stellar-black-900">Carteras Públicas Registradas</h4>
            </div>
            <div className="space-y-3">
              {carteirasPublicas.map((carteira, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-stellar-black-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-stellar-gold-600" />
                      <span className="font-medium text-stellar-black-800">{carteira.tipo}</span>
                      {carteira.tipo === 'Investigador' && (
                        <span className="bg-stellar-gold-100 text-stellar-gold-800 px-2 py-1 rounded-full text-xs font-medium">
                          💰 Receptor
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-stellar-black-700 mb-1">{carteira.nome}</p>
                  <p className="text-xs text-stellar-black-500 font-mono bg-stellar-black-50 p-2 rounded border">
                    {carteira.wallet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botões de ação - Stellar Design */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="px-6 py-3 border-stellar-black-300 text-stellar-black-700 hover:bg-stellar-black-50 transition-colors"
          >
            Atrás
          </Button>
          <Button 
            onClick={onNext}
            className="bg-black hover:bg-gray-900 text-white font-medium py-3 rounded-full shadow-lg transition-all duration-200 whitespace-nowrap flex items-center"
          >
            <span className="flex-1">Crear Beca</span>
            <div className="bg-yellow-400 rounded-full p-1.5 ml-4">
              <Wallet className="h-4 w-4 text-black" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumoStep;