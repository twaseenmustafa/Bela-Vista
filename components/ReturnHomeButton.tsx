import React from 'react';

interface ReturnHomeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const ReturnHomeButton: React.FC<ReturnHomeButtonProps> = ({ 
  onClick, 
  className = '', 
  label = "Back to home",
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white w-52 h-14 rounded-2xl relative font-semibold group shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden ${className}`}
      type="button"
      {...props}
    >
      {/* 
        Background Filament (Yellow Box)
        - Anchored top-1 left-1 for perfect padding within the h-14 button
        - Fixed initial width (w-12) to form a perfect circle with h-12
        - Hover width calculated to be 100% minus 8px (4px padding on each side)
        - Icon anchored to start (left) to prevent sliding through text during expansion
      */}
      <div
        className="bg-gold rounded-xl h-12 w-12 flex items-center justify-start pl-[14px] absolute left-1 top-1 group-hover:w-[calc(100%-8px)] z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="20px"
          width="20px"
          className="fill-navy shrink-0"
        >
          <path
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
          ></path>
          <path
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
          ></path>
        </svg>
      </div>
      
      {/* 
        Label
        - Pushed right (ml-8) to avoid overlap with the initial icon state
        - Z-index ensures it stays on top of the yellow expansion
      */}
      <span className="text-sm font-semibold text-navy relative z-20 transition-colors duration-500 ml-8 pointer-events-none">
        {label}
      </span>
    </button>
  );
};

export default ReturnHomeButton;