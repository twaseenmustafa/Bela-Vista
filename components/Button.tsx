import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-8 py-3 rounded-full font-sans font-medium transition-all duration-300 text-sm tracking-wide uppercase";
  
  const variants = {
    primary: "bg-gold text-white hover:bg-goldhover shadow-lg hover:shadow-xl",
    outline: "border border-gold text-gold hover:bg-gold hover:text-white",
    white: "bg-white text-navy hover:bg-gray-100 shadow-md",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;