import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorState = ({ 
  message = 'Something went wrong',
  onRetry,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`text-center py-16 ${className}`}
    >
      <div className="w-24 h-24 mx-auto bg-error/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" className="w-12 h-12 text-error" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">Oops!</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary" icon="RefreshCw">
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;