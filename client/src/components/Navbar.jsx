import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth.js';

const MotionNav = motion.nav;

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MotionNav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center justify-between py-4 sm:py-6"
    >
      <Link 
        to="/" 
        className="text-xl sm:text-2xl font-semibold font-display text-white hover:text-hb-primary transition"
      >
        Heimage <span className="text-hb-primary">Bot</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-xs sm:text-sm text-gray-300 hidden sm:block max-w-[120px] md:max-w-none truncate">
              Welcome, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-hb-primary rounded-full shadow hover:bg-hb-secondary transition active:scale-95"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Out</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-hb-primary rounded-full shadow hover:bg-hb-secondary transition active:scale-95"
            >
              <span className="hidden sm:inline">Sign up</span>
              <span className="sm:hidden">Sign up</span>
            </Link>
          </>
        )}
      </div>
    </MotionNav>
  );
};

export default Navbar;

