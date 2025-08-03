import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Plus, Trash2 } from 'lucide-react';
import ProgressBar from './progress-bar';
import { useFormContext } from '@/contexts/form-context';

interface MilestonesStepProps {
  onNext: () => void;
  onBack: () => void;
}

interface Milestone {
  id: string;
  nome: string;
  descripcion: string;
}

const MilestonesStep: React.FC<MilestonesStepProps> = ({ onNext, onBack }) => {
  const { formData, updateMilestones } = useFormContext();
  const milestones = formData.milestones.length > 0 ? formData.milestones : [
    {
      id: '1',
      nome: '',
      descripcion: ''
    }
  ];

  const handleInputChange = (id: string, field: keyof Milestone, value: string) => {
    const updatedMilestones = milestones.map(milestone => 
      milestone.id === id ? { ...milestone, [field]: value } : milestone
    );
    updateMilestones(updatedMilestones);
  };

  const addMilestone = () => {
    const newId = (milestones.length + 1).toString();
    const updatedMilestones = [...milestones, {
      id: newId,
      nome: '',
      descripcion: ''
    }];
    updateMilestones(updatedMilestones);
  };

  const removeMilestone = (id: string) => {
    if (milestones.length > 1) {
      const updatedMilestones = milestones.filter(milestone => milestone.id !== id);
      updateMilestones(updatedMilestones);
    }
  };

  const isFormValid = milestones.every(milestone => milestone.nome && milestone.descripcion);

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
              <p className="text-sm text-stellar-black-600">Paso 3 de 5: Milestones</p>
            </div>
          </div>
        </div>

        {/* Progress bar reutilizável */}
        <ProgressBar currentStep={3} />
      </div>

      {/* Formulário de Milestones - Stellar Design System */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-stellar-black-900 mb-2">Hitos de la Beca</h3>
            <p className="text-sm text-stellar-black-600">
              Define los hitos y objetivos que deben alcanzarse durante el desarrollo de la beca.
            </p>
          </div>

          {/* Lista de Milestones */}
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="bg-stellar-black-25 rounded-xl p-6 border border-stellar-black-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-stellar-black-900">
                    Hito {index + 1}
                  </h4>
                  {milestones.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMilestone(milestone.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Nome da Milestone */}
                  <div>
                    <label className="block text-sm font-medium text-stellar-black-700 mb-2">
                      Nombre del Hito *
                    </label>
                    <input
                      type="text"
                      value={milestone.nome}
                      onChange={(e) => handleInputChange(milestone.id, 'nome', e.target.value)}
                      placeholder="Ej: Revisión Bibliográfica Completa"
                      className="w-full px-4 py-3 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 focus:border-stellar-gold-400 transition-colors bg-white"
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-medium text-stellar-black-700 mb-2">
                      Descripción *
                    </label>
                    <textarea
                      value={milestone.descripcion}
                      onChange={(e) => handleInputChange(milestone.id, 'descripcion', e.target.value)}
                      placeholder="Describe los objetivos y entregables de este hito..."
                      rows={3}
                      className="w-full px-4 py-3 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 focus:border-stellar-gold-400 transition-colors bg-white resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão para adicionar nova milestone */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={addMilestone}
              className="border-stellar-gold-300 text-stellar-gold-700 hover:bg-stellar-gold-50 transition-colors px-6 py-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Nuevo Hito
            </Button>
          </div>
        </div>

        {/* Botões de acção - Stellar Design */}
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

export default MilestonesStep;