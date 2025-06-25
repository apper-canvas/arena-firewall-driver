import Home from '@/components/pages/Home';
import Leaderboard from '@/components/pages/Leaderboard';
import Player from '@/components/pages/Player';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  leaderboard: {
    id: 'leaderboard',
    label: 'Leaderboard',
    path: '/leaderboard',
    icon: 'Trophy',
    component: Leaderboard
  },
  player: {
    id: 'player',
    label: 'Player',
    path: '/player/:id',
    icon: 'User',
    component: Player
  }
};

export const routeArray = Object.values(routes);
export default routes;