import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ResponsableData {
  nombre_completo: string;
  wallet_publica: string;
  correo_electronico: string;
}

interface MilestoneData {
  id: string;
  nome: string;
  descripcion: string;
}

interface InfoBasicasData {
  nombre_beca: string;
  institucion: string;
  details_beca: string;
  valor_total: string;
}

interface ResponsablesData {
  investigador: ResponsableData;
  tutor: ResponsableData;
  gestor: ResponsableData;
}

interface FormData {
  infoBasicas: InfoBasicasData;
  responsables: ResponsablesData;
  milestones: MilestoneData[];
}

interface FormContextType {
  formData: FormData;
  updateInfoBasicas: (data: Partial<InfoBasicasData>) => void;
  updateResponsables: (data: Partial<ResponsablesData>) => void;
  updateMilestones: (milestones: MilestoneData[]) => void;
  resetForm: () => void;
  isFormValid: () => boolean;
}

const initialFormData: FormData = {
  infoBasicas: {
    nombre_beca: '',
    institucion: '',
    details_beca: '',
    valor_total: ''
  },
  responsables: {
    investigador: {
      nombre_completo: '',
      wallet_publica: '',
      correo_electronico: ''
    },
    tutor: {
      nombre_completo: '',
      wallet_publica: '',
      correo_electronico: ''
    },
    gestor: {
      nombre_completo: '',
      wallet_publica: '',
      correo_electronico: ''
    }
  },
  milestones: []
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext deve ser usado dentro de um FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateInfoBasicas = (data: Partial<InfoBasicasData>) => {
    setFormData(prev => ({
      ...prev,
      infoBasicas: { ...prev.infoBasicas, ...data }
    }));
  };

  const updateResponsables = (data: Partial<ResponsablesData>) => {
    setFormData(prev => ({
      ...prev,
      responsables: { ...prev.responsables, ...data }
    }));
  };

  const updateMilestones = (milestones: MilestoneData[]) => {
    setFormData(prev => ({
      ...prev,
      milestones
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  // Validação de endereço Stellar
  const validateStellarAddress = (address: string): boolean => {
    return address.startsWith('G') && 
           address.length === 56 && 
           /^[A-Z2-7]+$/.test(address);
  };

  const isResponsableValid = (responsable: ResponsableData): boolean => {
    return responsable.nombre_completo.trim() !== '' &&
           responsable.correo_electronico.trim() !== '' &&
           validateStellarAddress(responsable.wallet_publica);
  };

  const isFormValid = (): boolean => {
    const { infoBasicas, responsables, milestones } = formData;
    
    // Validar informações básicas
    const infoBasicasValid = 
      infoBasicas.nombre_beca.trim() !== '' &&
      infoBasicas.institucion.trim() !== '' &&
      infoBasicas.details_beca.trim() !== '' &&
      infoBasicas.valor_total.trim() !== '';
    
    // Validar responsáveis
    const responsablesValid = 
      isResponsableValid(responsables.investigador) &&
      isResponsableValid(responsables.tutor) &&
      isResponsableValid(responsables.gestor);
    
    // Validar milestones
    const milestonesValid = 
      milestones.length > 0 &&
      milestones.every(milestone => 
        milestone.nome.trim() !== '' && 
        milestone.descripcion.trim() !== ''
      );
    
    return infoBasicasValid && responsablesValid && milestonesValid;
  };

  const value: FormContextType = {
    formData,
    updateInfoBasicas,
    updateResponsables,
    updateMilestones,
    resetForm,
    isFormValid
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};