import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import gameService from '@/services/api/gameService';

const GameSelector = ({ selectedGame, onGameChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    setLoading(true);
    try {
      const gameList = await gameService.getPopularGames();
      setGames([{ Id: 'all', title: 'All Games', playerCount: 0 }, ...gameList]);
    } catch (error) {
      console.error('Failed to load games:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedGameData = games.find(game => game.Id === selectedGame) || games[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-ps-surface border border-ps-cyan/20 rounded-lg text-white hover:border-ps-cyan/40 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="Gamepad2" className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">
            {selectedGameData?.title || 'Select Game'}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="ChevronDown" className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-ps-surface border border-ps-cyan/20 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-400">
                <ApperIcon name="Loader2" className="w-5 h-5 animate-spin mx-auto" />
              </div>
            ) : (
              games.map((game) => (
                <motion.button
                  key={game.Id}
                  onClick={() => {
                    onGameChange(game.Id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-ps-dark transition-colors ${
                    selectedGame === game.Id ? 'bg-primary/20 text-primary' : 'text-white'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="Gamepad2" className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{game.title}</p>
                    {game.playerCount > 0 && (
                      <p className="text-sm text-gray-400">
                        {game.playerCount.toLocaleString()} players
                      </p>
                    )}
                  </div>
                  {selectedGame === game.Id && (
                    <ApperIcon name="Check" className="w-4 h-4 text-primary" />
                  )}
                </motion.button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameSelector;