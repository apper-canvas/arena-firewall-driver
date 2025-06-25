import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import GameSelector from '@/components/molecules/GameSelector';
import LeaderboardTable from '@/components/organisms/LeaderboardTable';
import ApperIcon from '@/components/ApperIcon';

const Leaderboard = () => {
  const [selectedGame, setSelectedGame] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleGameChange = (gameId) => {
    setSelectedGame(gameId);
    setSearchQuery(''); // Clear search when changing games
  };

  return (
    <div className="min-h-screen bg-ps-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Trophy" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">Global Leaderboard</h1>
              <p className="text-gray-400">Compete with the best PS6 players worldwide</p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <GameSelector
            selectedGame={selectedGame}
            onGameChange={handleGameChange}
          />
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search players by username..."
          />
        </motion.div>

        {/* Current Filters */}
        {(selectedGame !== 'all' || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-sm text-gray-400">Active filters:</span>
            {selectedGame !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                Game Filter
                <button
                  onClick={() => setSelectedGame('all')}
                  className="ml-2 hover:text-white transition-colors"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                Search: {searchQuery}
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 hover:text-white transition-colors"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </span>
            )}
          </motion.div>
        )}

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LeaderboardTable
            selectedGame={selectedGame}
            searchQuery={searchQuery}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;