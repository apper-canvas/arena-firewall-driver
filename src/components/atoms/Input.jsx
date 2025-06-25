import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label, 
  error, 
  icon, 
  iconPosition = 'left',
  className = '',
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 bg-ps-surface border border-ps-cyan/20 rounded-lg 
    text-white placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    transition-all duration-200
    ${icon && iconPosition === 'left' ? 'pl-11' : ''}
    ${icon && iconPosition === 'right' ? 'pr-11' : ''}
    ${error ? 'border-error focus:ring-error' : ''}
    ${className}
  `;

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;