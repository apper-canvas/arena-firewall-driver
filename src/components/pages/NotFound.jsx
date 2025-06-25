import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ps-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        {/* 404 Animation */}
        <motion.div
          className="relative mb-8"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
            <ApperIcon name="AlertTriangle" className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <motion.h1
          className="text-6xl font-display font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl font-semibold text-gray-300 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          The page you're looking for doesn't exist in the PS6 Arena. Let's get you back to the action!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            icon="Home"
          >
            Go Home
          </Button>
          <Button
            onClick={() => navigate('/leaderboard')}
            variant="secondary"
            icon="Trophy"
          >
            View Leaderboard
          </Button>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;