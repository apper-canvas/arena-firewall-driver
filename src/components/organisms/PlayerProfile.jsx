import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import playerService from '@/services/api/playerService';
import { formatScore, getTimeAgo } from '@/utils/helpers';

const PlayerProfile = ({ playerId }) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (playerId) {
      loadPlayer();
    }
  }, [playerId]);

  const loadPlayer = async () => {
    setLoading(true);
    setError(null);
    try {
      const playerData = await playerService.getById(playerId);
      setPlayer(playerData);
    } catch (err) {
      setError(err.message || 'Failed to load player');
      toast.error('Failed to load player profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <SkeletonLoader count={1} type="card" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ErrorState 
          message={error}
          onRetry={loadPlayer}
        />
      </div>
    );
  }

  if (!player) {
    return null;
  }

  const rankChange = player.rank - player.previousRank;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-xl"
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
          <div className="relative">
            <img
              src={player.avatar}
              alt={player.username}
              className="w-32 h-32 rounded-full border-4 border-primary/30"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-ps-surface"></div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              {player.username}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
              <Badge variant="primary" size="lg">
                Rank #{player.rank}
              </Badge>
              <Badge variant="default" size="lg">
                Level {player.level}
              </Badge>
              {rankChange !== 0 && (
                <Badge 
                  variant={rankChange > 0 ? 'success' : 'error'} 
                  size="md"
                  animate={true}
                >
                  {rankChange > 0 ? '+' : ''}{rankChange}
                </Badge>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 text-gray-300">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <ApperIcon name="Trophy" className="w-5 h-5 text-primary" />
                <span>{formatScore(player.totalScore)} points</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <ApperIcon name="Clock" className="w-5 h-5 text-accent" />
                <span>Last active {getTimeAgo(player.lastActive)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trophy Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="text-center p-4 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg border border-yellow-400/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Award" className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-white">{player.trophies.platinum}</div>
            <div className="text-sm text-gray-300">Platinum</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Medal" className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-white">{player.trophies.gold}</div>
            <div className="text-sm text-gray-300">Gold</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gradient-to-br from-gray-300/20 to-gray-500/20 rounded-lg border border-gray-300/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Shield" className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-white">{player.trophies.silver}</div>
            <div className="text-sm text-gray-300">Silver</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-lg border border-orange-400/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Star" className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-white">{player.trophies.bronze}</div>
            <div className="text-sm text-gray-300">Bronze</div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-ps-dark rounded-lg">
                <span className="text-gray-300">Global Rank</span>
                <span className="text-primary font-bold">#{player.rank}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-ps-dark rounded-lg">
                <span className="text-gray-300">Total Score</span>
                <span className="text-white font-bold">{formatScore(player.totalScore)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-ps-dark rounded-lg">
                <span className="text-gray-300">Player Level</span>
                <span className="text-accent font-bold">{player.level}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Trophy Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-ps-dark rounded-lg">
                <span className="text-gray-300">Total Trophies</span>
                <span className="text-white font-bold">
                  {player.trophies.platinum + player.trophies.gold + player.trophies.silver + player.trophies.bronze}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-ps-dark rounded-lg">
                <span className="text-gray-300">Completion Rate</span>
                <span className="text-success font-bold">
                  {Math.round((player.trophies.platinum / (player.trophies.platinum + player.trophies.gold + player.trophies.silver + player.trophies.bronze)) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-ps-dark rounded-lg">
                <span className="text-gray-300">Last Active</span>
                <span className="text-gray-400">{getTimeAgo(player.lastActive)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerProfile;