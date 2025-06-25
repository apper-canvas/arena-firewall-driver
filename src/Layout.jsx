import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ps-black text-white">
      {/* Header */}
      <header className="bg-ps-surface border-b border-ps-cyan/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Gamepad2" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold neon-text">PS6 ARENA</h1>
              <p className="text-xs text-gray-400">Gaming Leaderboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30 glow-effect'
                    : 'text-gray-300 hover:text-white hover:bg-ps-dark'
                }`
              }
            >
              <ApperIcon name="Home" className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30 glow-effect'
                    : 'text-gray-300 hover:text-white hover:bg-ps-dark'
                }`
              }
            >
              <ApperIcon name="Trophy" className="w-4 h-4" />
              <span>Leaderboard</span>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg bg-ps-dark hover:bg-ps-surface transition-colors">
            <ApperIcon name="Menu" className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;