import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import ProgressBar from './progress-bar';
import { useFormContext } from '@/contexts/form-context';

interface ResponsablesStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface ResponsableData {
  nombre_completo: string;
  wallet_publica: string;
  correo_electronico: string;
}

const ResponsablesStep: React.FC<ResponsablesStepProps> = ({ onNext, onBack }) => {
  const { formData, updateResponsables } = useFormContext();
  const { responsables } = formData;

  const handleInputChange = (role: 'investigador' | 'tutor' | 'gestor', field: keyof ResponsableData, value: string) => {
    updateResponsables({
      [role]: {
        ...responsables[role],
        [field]: value
      }
    });
  };

  // Validação de endereço público Stellar
  const validateStellarAddress = (address: string): boolean => {
    // Deve começar com G
    if (!address.startsWith('G')) {
      return false;
    }
    
    // Deve ter exatamente 56 caracteres
    if (address.length !== 56) {
      return false;
    }
    
    // Deve ser codificado em Base32 (A-Z e dígitos 2-7)
    const base32Regex = /^[A-Z2-7]+$/;
    if (!base32Regex.test(address)) {
      return false;
    }
    
    return true;
  };

  const getWalletValidationMessage = (address: string): string | null => {
    if (!address) return null;
    
    if (!address.startsWith('G')) {
      return 'La dirección debe comenzar con "G"';
    }
    
    if (address.length !== 56) {
      return `La dirección debe tener exactamente 56 caracteres (actual: ${address.length})`;
    }
    
    const base32Regex = /^[A-Z2-7]+$/;
    if (!base32Regex.test(address)) {
      return 'La dirección debe contener solo letras A-Z y dígitos 2-7';
    }
    
    return null;
  };

  const isRoleValid = (role: ResponsableData) => {
    return role.nombre_completo && 
           role.wallet_publica && 
           validateStellarAddress(role.wallet_publica) && 
           role.correo_electronico;
  };

  const isFormValid = isRoleValid(responsables.investigador) && isRoleValid(responsables.tutor) && isRoleValid(responsables.gestor);

  // Função renderWalletInput definida ANTES de ser usada
  const renderWalletInput = (role: 'investigador' | 'tutor' | 'gestor', data: ResponsableData, isInvestigador = false) => {
    const validationMessage = getWalletValidationMessage(data.wallet_publica);
    const isValid = data.wallet_publica ? validateStellarAddress(data.wallet_publica) : null;
    
    return (
      <div>
        <label className="block text-sm font-medium text-stellar-black-700 mb-2">
          Cartera Pública (Wallet) * {isInvestigador && '💰'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.wallet_publica}
            onChange={(e) => handleInputChange(role, 'wallet_publica', e.target.value.toUpperCase())}
            placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white font-mono text-sm ${
              validationMessage 
                ? 'border-red-300 focus:ring-red-300 focus:border-red-400' 
                : isInvestigador 
                  ? 'border-stellar-gold-300 focus:ring-stellar-gold-400 focus:border-stellar-gold-500'
                  : 'border-stellar-black-200 focus:ring-stellar-gold-300 focus:border-stellar-gold-400'
            }`}
          />
          {data.wallet_publica && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        {validationMessage && (
          <p className="text-xs text-red-600 mt-1 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {validationMessage}
          </p>
        )}
        {isInvestigador && !validationMessage && data.wallet_publica && (
          <p className="text-xs text-stellar-gold-600 mt-1">
            ✓ Esta cartera recibirá los fondos de la beca
          </p>
        )}
      </div>
    );
  };

  const renderResponsableSection = (title: string, role: 'investigador' | 'tutor' | 'gestor', data: ResponsableData) => (
    <div className="bg-stellar-black-25 rounded-xl p-6 border border-stellar-black-100">
      <h3 className="text-lg font-semibold text-stellar-black-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Nombre Completo */}
        <div>
          <label className="block text-sm font-medium text-stellar-black-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            value={data.nombre_completo}
            onChange={(e) => handleInputChange(role, 'nombre_completo', e.target.value)}
            placeholder="Ej: Dr. María González Pérez"
            className="w-full px-4 py-3 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 focus:border-stellar-gold-400 transition-colors bg-white"
          />
        </div>

        {/* Cartera Pública (Wallet) com validação */}
        {renderWalletInput(role, data, role === 'investigador')}

        {/* Correo Electrónico / ID Institucional */}
        <div>
          <label className="block text-sm font-medium text-stellar-black-700 mb-2">
            Correo Electrónico / ID Institucional *
          </label>
          <input
            type="email"
            value={data.correo_electronico}
            onChange={(e) => handleInputChange(role, 'correo_electronico', e.target.value)}
            placeholder="maria.gonzalez@universidad.cl"
            className="w-full px-4 py-3 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 focus:border-stellar-gold-400 transition-colors bg-white"
          />
        </div>
      </div>
    </div>
  );

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
              <p className="text-sm text-stellar-black-600">Paso 2 de 5: Responsables</p>
            </div>
          </div>
        </div>

        {/* Progress bar reutilizável */}
        <ProgressBar currentStep={2} />
      </div>

      {/* Formulário de Responsáveis - Stellar Design System */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-stellar-black-900 mb-2">Responsables de la Beca</h3>
            <p className="text-sm text-stellar-black-600">
              Registra la información de los responsables que participarán en la gestión de la beca.
            </p>
          </div>

          {/* Investigador Principal */}
          {renderResponsableSection('👨‍🔬 Investigador Principal', 'investigador', responsables.investigador)}

          {/* Tutor */}
          {renderResponsableSection('👨‍🏫 Tutor', 'tutor', responsables.tutor)}

          {/* Gestor */}
          {renderResponsableSection('👨‍💼 Gestor', 'gestor', responsables.gestor)}
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
            disabled={!isFormValid}
            className="bg-stellar-black-900 hover:bg-stellar-black-800 text-white px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            Continuar
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResponsablesStep;