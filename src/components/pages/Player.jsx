import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlayerProfile from '@/components/organisms/PlayerProfile';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ps-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            icon="ArrowLeft"
            className="text-gray-300 hover:text-white"
          >
            Back to Leaderboard
          </Button>
        </motion.div>

        {/* Player Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PlayerProfile playerId={id} />
        </motion.div>
      </div>
    </div>
  );
};

export default Player;