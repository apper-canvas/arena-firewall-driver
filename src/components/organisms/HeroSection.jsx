import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ps-black via-ps-surface to-ps-black py-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Gaming Icon */}
          <motion.div
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(0, 112, 243, 0.3)',
                '0 0 40px rgba(0, 212, 255, 0.5)',
                '0 0 20px rgba(0, 112, 243, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ApperIcon name="Trophy" className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 neon-text">
            PS6 ARENA
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            The ultimate gaming leaderboard for PlayStation 6 players
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Track your rankings, compare achievements, and climb to the top of the global leaderboard across all your favorite PS6 titles.
          </p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="glass-card p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">2.8M+</div>
              <div className="text-gray-300">Active Players</div>
            </div>
            <div className="glass-card p-6 rounded-lg">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-gray-300">Supported Games</div>
            </div>
            <div className="glass-card p-6 rounded-lg">
              <div className="text-3xl font-bold text-success mb-2">24/7</div>
              <div className="text-gray-300">Live Updates</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              onClick={() => navigate('/leaderboard')}
              variant="primary"
              size="lg"
              icon="Trophy"
              className="text-lg px-8 py-4"
            >
              View Leaderboard
            </Button>
            
            <Button
              onClick={() => navigate('/leaderboard')}
              variant="secondary"
              size="lg"
              icon="Search"
              className="text-lg px-8 py-4"
            >
              Find Players
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;