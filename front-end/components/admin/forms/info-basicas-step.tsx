import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ProgressBar from './progress-bar';
import { useFormContext } from '@/contexts/form-context';

interface InfoBasicasStepProps {
  onNext: () => void;
  onBack: () => void;
}

const InfoBasicasStep: React.FC<InfoBasicasStepProps> = ({ onNext, onBack }) => {
  const { formData, updateInfoBasicas } = useFormContext();
  const { infoBasicas } = formData;

  const handleInputChange = (field: string, value: string) => {
    updateInfoBasicas({ [field]: value });
  };

  const isFormValid = infoBasicas.nombre_beca && infoBasicas.institucion && infoBasicas.details_beca && infoBasicas.valor_total;

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
              <p className="text-sm text-stellar-black-600">Paso 1 de 5: Información Básica</p>
            </div>
          </div>
        </div>

        {/* Progress bar reutilizável */}
        <ProgressBar currentStep={1} />
      </div>

      {/* Formulário Simplificado - Stellar Design System */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nombre de la Beca */}
          <div>
            <label className="block text-sm font-medium text-stellar-black-700 mb-2">
              Nombre de la Beca *
            </label>
            <input
              type="text"
              value={infoBasicas.nombre_beca}
              onChange={(e) => handleInputChange('nombre_beca', e.target.value)}
              placeholder="Ej: FONDECYT Investigación Avanzada"
              className="w-full px-4 py-3 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 focus:border-stellar-gold-400 transition-colors"
            />
          </div>

          {/* Institución */}
          <div>
            <label className="block text-sm font-medium text-stellar-black-700 mb-2">
              Institución *
            </label>
            <input
              type="text"
              value={infoBasicas.institucion}
              onChange={(e) => handleInputChange('institucion', e.target.value)}
              placeholder="Ej: Pontificia Universidad Católica de Chile"
              className="w-full px-4 py-3 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 focus:border-stellar-gold-400 transition-colors"
            />
          </div>

          {/* Valor Total */}
          <div>
            <label className="block text-sm font-medium text-stellar-black-700 mb-2">
              Valor Total (XLM) *
            </label>
            <input
              type="number"
              value={infoBasicas.valor_total}
              onChange={(e) => handleInputChange('valor_total', e.target.value)}
              placeholder="30000"
              className="w-full px-4 py-3 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 focus:border-stellar-gold-400 transition-colors"
            />
          </div>

          {/* Details Beca */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-stellar-black-700 mb-2">
              Detalles de la Beca *
            </label>
            <textarea
              value={infoBasicas.details_beca}
              onChange={(e) => handleInputChange('details_beca', e.target.value)}
              placeholder="Describe los objetivos, alcance y beneficiarios de esta beca..."
              rows={4}
              className="w-full px-4 py-3 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 focus:border-stellar-gold-400 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Botones de acción - Stellar Design */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="px-6 py-3 border-stellar-black-300 text-stellar-black-700 hover:bg-stellar-black-50 transition-colors"
          >
            Cancelar
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

export default InfoBasicasStep;