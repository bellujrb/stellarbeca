import React from 'react';

interface StellarAvatarProps {
  address: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StellarAvatar: React.FC<StellarAvatarProps> = ({ 
  address, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  // Use DiceBear avatars with a unique seed based on the address
  // Using 'pixel-art' style for a more crypto/gaming feel with Stellar colors
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(address)}&backgroundColor=ffdb24,ffed4e,fddb24,eab308,a16207&radius=50&scale=80`;

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-stellar-gold-200 shadow-sm ${className}`}>
      <img 
        src={avatarUrl} 
        alt={`Avatar for ${address}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to a simple Stellar icon if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.innerHTML = `
            <div class="w-full h-full bg-gradient-to-br from-stellar-gold-400 to-stellar-gold-600 flex items-center justify-center">
              <span class="text-stellar-black-900 font-bold ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-lg'}">★</span>
            </div>
          `;
        }}
      />
    </div>
  );
};

export default StellarAvatar; 