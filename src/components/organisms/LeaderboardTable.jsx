import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import PlayerCard from '@/components/molecules/PlayerCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';
import leaderboardService from '@/services/api/leaderboardService';
import playerService from '@/services/api/playerService';

const LeaderboardTable = ({ selectedGame, searchQuery }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, [selectedGame]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      loadLeaderboard();
    }
  }, [searchQuery]);

  const loadLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const playerList = await playerService.getTopPlayers(100);
      setPlayers(playerList);
    } catch (err) {
      setError(err.message || 'Failed to load leaderboard');
      toast.error('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const searchResults = await playerService.search(searchQuery);
      setPlayers(searchResults);
    } catch (err) {
      setError(err.message || 'Failed to search players');
      toast.error('Failed to search players');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader count={10} type="card" />;
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={loadLeaderboard}
      />
    );
  }

  if (players.length === 0) {
    const emptyTitle = searchQuery ? 'No players found' : 'No players available';
    const emptyDescription = searchQuery 
      ? `No players found matching "${searchQuery}". Try a different search term.`
      : 'The leaderboard is empty. Check back later for rankings.';
    
    return (
      <EmptyState 
        title={emptyTitle}
        description={emptyDescription}
        icon={searchQuery ? 'Search' : 'Trophy'}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Top 3 Players - Special Layout */}
      {!searchQuery && players.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="order-2 md:order-1"
          >
            <PlayerCard 
              player={players[1]} 
              rank={2}
              className="transform md:-translate-y-4"
            />
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <PlayerCard 
              player={players[0]} 
              rank={1}
              className="transform md:-translate-y-8 ring-2 ring-primary/30"
            />
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="order-3"
          >
            <PlayerCard 
              player={players[2]} 
              rank={3}
              className="transform md:-translate-y-2"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Rest of the players */}
      <AnimatePresence>
        {players.slice(searchQuery ? 0 : 3).map((player, index) => (
          <motion.div
            key={player.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: (index + (searchQuery ? 0 : 3)) * 0.05 }}
          >
            <PlayerCard 
              player={player} 
              rank={player.rank}
              showRankChange={true}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LeaderboardTable;