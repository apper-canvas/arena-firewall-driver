import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  animate = false,
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full';
  
  const variants = {
    default: 'bg-ps-surface text-gray-300 border border-ps-cyan/20',
    primary: 'bg-gradient-to-r from-primary to-accent text-white',
    success: 'bg-success text-black',
    warning: 'bg-warning text-black',
    error: 'bg-error text-white',
    rank: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (animate) {
    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={badgeClasses}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;