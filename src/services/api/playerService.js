import { delay } from '@/utils/helpers';
import playersData from '@/services/mockData/players.json';

let players = [...playersData];

export const playerService = {
  async getAll() {
    await delay(300);
    return [...players];
  },

  async getById(id) {
    await delay(200);
    const player = players.find(p => p.Id === parseInt(id, 10));
    if (!player) {
      throw new Error('Player not found');
    }
    return { ...player };
  },

  async search(query) {
    await delay(250);
    if (!query || query.trim() === '') {
      return [...players];
    }
    
    const searchTerm = query.toLowerCase();
    return players.filter(player =>
      player.username.toLowerCase().includes(searchTerm) ||
      player.Id.toString().includes(searchTerm)
    );
  },

  async getTopPlayers(limit = 100) {
    await delay(300);
    return [...players]
      .sort((a, b) => a.rank - b.rank)
      .slice(0, limit);
  },

  async getPlayersByGame(gameId) {
    await delay(300);
    // In a real app, this would filter by game-specific rankings
    return [...players].sort((a, b) => a.rank - b.rank);
  }
};

export default playerService;