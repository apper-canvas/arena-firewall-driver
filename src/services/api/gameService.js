import { delay } from '@/utils/helpers';
import gamesData from '@/services/mockData/games.json';

let games = [...gamesData];

export const gameService = {
  async getAll() {
    await delay(200);
    return [...games];
  },

  async getById(id) {
    await delay(200);
    const game = games.find(g => g.Id === parseInt(id, 10));
    if (!game) {
      throw new Error('Game not found');
    }
    return { ...game };
  },

  async getPopularGames(limit = 10) {
    await delay(200);
    return [...games]
      .sort((a, b) => b.playerCount - a.playerCount)
      .slice(0, limit);
  }
};

export default gameService;