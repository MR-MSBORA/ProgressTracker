import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Progressly" 
              className="h-8 w-auto"
            />
            <span className="hidden sm:block font-bold text-xl">
              Progressly
            </span>
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUser className="w-5 h-5 text-blue-600" />
            </div>
            <span className="hidden md:block font-medium text-sm">
              {user?.name || 'User'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;