import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  inverted = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const optikSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-xs tracking-[0.3em]',
    lg: 'text-sm tracking-[0.35em]',
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group select-none">
      {/* Eye Emblem SVG based on MataCare flyer */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 70"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Eyebrow / Upper curve */}
          <path
            d="M 5 45 C 28 8, 72 8, 95 45"
            stroke={inverted ? '#ffffff' : '#0B2545'}
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Lower curve with cyan flair */}
          <path
            d="M 12 43 C 32 66, 68 66, 88 43"
            stroke="#00a3e0"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Pupil outer circle */}
          <circle
            cx="50"
            cy="36"
            r="16"
            fill="#00a3e0"
          />
          {/* Pupil dark center */}
          <circle
            cx="50"
            cy="36"
            r="9"
            fill={inverted ? '#0B2545' : '#081422'}
          />
          {/* Light reflection */}
          <circle
            cx="46"
            cy="32"
            r="3.5"
            fill="#ffffff"
          />
          {/* Golden dynamic accent arc */}
          <path
            d="M 68 20 C 76 25, 80 32, 80 40"
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline">
          <span className={`font-black tracking-tight ${titleSizes[size]} ${inverted ? 'text-white' : 'text-matanavy-900'}`}>
            Mata<span className="text-matablue-500">Care</span>
          </span>
          <span className={`ml-1.5 font-bold uppercase ${optikSizes[size]} ${inverted ? 'text-matablue-300' : 'text-matanavy-700'}`}>
            OPTIK
          </span>
        </div>
        {showTagline && (
          <span className={`italic font-serif font-medium ${taglineSizes[size]} ${inverted ? 'text-blue-100/80' : 'text-matablue-700'}`}>
            Jelas melihat, hidup lebih baik
          </span>
        )}
      </div>
    </div>
  );
};
