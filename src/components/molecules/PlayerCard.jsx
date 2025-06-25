import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import { formatScore, getTimeAgo, getRankBadgeColor } from '@/utils/helpers';

const PlayerCard = ({ player, rank, showRankChange = true, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/player/${player.Id}`);
  };

  const getRankChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getRankChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-gray-400';
  };

  const rankChange = player.rank - player.previousRank;

  return (
    <motion.div
      onClick={handleClick}
      className={`glass-card p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 ${className}`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4">
        {/* Rank Badge */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankBadgeColor(player.rank)} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold text-lg">#{player.rank}</span>
        </div>

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={player.avatar}
            alt={player.username}
            className="w-12 h-12 rounded-full border-2 border-ps-cyan/30"
          />
          <div 
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-ps-surface ${
              player.lastActive ? 'bg-success' : 'bg-gray-500'
            }`}
          />
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-white truncate">{player.username}</h3>
            <Badge variant="default" size="sm">
              LVL {player.level}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-sm text-gray-400">
              {formatScore(player.totalScore)} pts
            </p>
            <p className="text-sm text-gray-500">
              {getTimeAgo(player.lastActive)}
            </p>
          </div>

          {/* Trophies */}
          <div className="flex items-center space-x-3 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              <span className="text-xs text-gray-400">{player.trophies.platinum}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
              <span className="text-xs text-gray-400">{player.trophies.gold}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-400">{player.trophies.silver}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              <span className="text-xs text-gray-400">{player.trophies.bronze}</span>
            </div>
          </div>
        </div>

        {/* Rank Change */}
        {showRankChange && (
          <div className="flex items-center space-x-2 flex-shrink-0">
            <motion.div
              className={`flex items-center space-x-1 ${getRankChangeColor(rankChange)}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ApperIcon 
                name={getRankChangeIcon(rankChange)} 
                className="w-4 h-4" 
              />
              <span className="text-sm font-medium">
                {Math.abs(rankChange) > 0 ? Math.abs(rankChange) : '-'}
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerCard;