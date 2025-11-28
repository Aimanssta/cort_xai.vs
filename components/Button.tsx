import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  to, 
  onClick, 
  className = '',
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-sm font-medium rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 relative overflow-hidden group";
  
  const variants = {
    primary: "border-transparent text-white bg-cort-600 hover:bg-cort-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] focus:ring-cort-500 active:transform active:scale-95",
    secondary: "border-transparent text-cort-100 bg-slate-800 hover:bg-slate-700 focus:ring-slate-500",
    outline: "border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white focus:ring-slate-500"
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  const content = (
    <>
       {/* Shine effect for primary buttons */}
       {variant === 'primary' && (
         <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
       )}
       <span className="relative z-10 flex items-center">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {content}
    </button>
  );
};

export default Button;