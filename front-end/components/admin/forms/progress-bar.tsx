import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps = 5 }) => {
  const steps = [
    { number: 1, label: 'Info Básicas' },
    { number: 2, label: 'Responsables' },
    { number: 3, label: 'Hitos' },
    { number: 4, label: 'Resumen' },
    { number: 5, label: 'Éxito' }
  ];

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return 'completed';
    } else if (stepNumber === currentStep) {
      return 'current';
    } else {
      return 'pending';
    }
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'w-8 h-8 bg-stellar-gold-500 rounded-full flex items-center justify-center text-stellar-black-900 text-sm font-medium shadow-sm',
          label: 'ml-2 text-sm font-medium text-stellar-gold-600',
          connector: 'flex-1 h-0.5 bg-stellar-gold-300 mx-4'
        };
      case 'current':
        return {
          circle: 'w-8 h-8 bg-stellar-gold-500 rounded-full flex items-center justify-center text-stellar-black-900 text-sm font-medium shadow-sm',
          label: 'ml-2 text-sm font-medium text-stellar-gold-600',
          connector: 'flex-1 h-0.5 bg-stellar-black-200 mx-4'
        };
      default:
        return {
          circle: 'w-8 h-8 bg-stellar-black-200 rounded-full flex items-center justify-center text-stellar-black-500 text-sm',
          label: 'ml-2 text-sm text-stellar-black-500',
          connector: 'flex-1 h-0.5 bg-stellar-black-200 mx-4'
        };
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-8">
      {steps.map((step, index) => {
        const status = getStepStatus(step.number);
        const styles = getStepStyles(status);
        const isLast = index === steps.length - 1;
        
        return (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <div className={styles.circle}>
                {status === 'completed' ? '✓' : 
                 status === 'current' && step.number === 5 ? '✓' : 
                 step.number}
              </div>
              <span className={styles.label}>{step.label}</span>
            </div>
            {!isLast && <div className={styles.connector}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;