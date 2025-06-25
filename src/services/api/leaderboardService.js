import { delay } from '@/utils/helpers';
import leaderboardData from '@/services/mockData/leaderboard.json';

let leaderboardEntries = [...leaderboardData];

export const leaderboardService = {
  async getAll() {
    await delay(300);
    return [...leaderboardEntries];
  },

  async getByGame(gameId) {
    await delay(300);
    if (!gameId || gameId === 'all') {
      return [...leaderboardEntries];
    }
    
    return leaderboardEntries.filter(entry => 
      entry.gameId === parseInt(gameId, 10)
    );
  },

  async getByPlayer(playerId) {
    await delay(250);
    return leaderboardEntries.filter(entry => 
      entry.playerId === parseInt(playerId, 10)
    );
  },

  async getTopEntries(gameId = null, limit = 100) {
    await delay(300);
    let entries = [...leaderboardEntries];
    
    if (gameId && gameId !== 'all') {
      entries = entries.filter(entry => entry.gameId === parseInt(gameId, 10));
    }
    
    return entries
      .sort((a, b) => a.rank - b.rank)
      .slice(0, limit);
  }
};

export default leaderboardService;