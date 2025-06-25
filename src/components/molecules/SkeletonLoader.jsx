import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  const cardSkeleton = (
    <div className="glass-card p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2"></div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-700 rounded-full animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const tableSkeleton = (
    <div className="glass-card p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-1/3"></div>
            <div className="h-3 bg-gray-800 rounded animate-pulse w-1/4"></div>
          </div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-20"></div>
          <div className="h-3 bg-gray-800 rounded animate-pulse w-16"></div>
        </div>
        <div className="w-6 h-6 bg-gray-700 rounded animate-pulse ml-4"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {type === 'card' ? cardSkeleton : tableSkeleton}
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;