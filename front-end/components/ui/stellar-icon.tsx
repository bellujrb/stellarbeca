import React from 'react';

interface StellarIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StellarIcon: React.FC<StellarIconProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-stellar-gold-400 via-stellar-gold-500 to-stellar-gold-600 rounded-full flex items-center justify-center shadow-sm ${className}`}>
      <span className={`${textSizes[size]} font-bold text-stellar-black-900`}>
        ★
      </span>
    </div>
  );
};

export default StellarIcon; 