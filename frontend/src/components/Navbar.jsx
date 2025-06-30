import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  BarChart3, 
  Plus,
  Wallet
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Add Expense', href: '/add', icon: Plus },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Glass morphism navbar */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-xl shadow-indigo-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo Section */}
            <div className="flex items-center">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-3 group transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative p-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 bg-clip-text text-transparent">
                    FinanceTracker
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                      isActive(item.href)
                        ? 'text-indigo-700 bg-indigo-50/80 shadow-md shadow-indigo-100/50'
                        : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/50'
                    }`}
                  >
                    {isActive(item.href) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 shadow-inner"></div>
                    )}
                    <Icon className={`h-4 w-4 relative z-10 transition-transform duration-300 ${
                      isActive(item.href) ? 'text-indigo-600' : 'group-hover:scale-110'
                    }`} />
                    <span className="relative z-10 text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop User Section */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-slate-50/50 border border-slate-200/50">
                <div className="relative">
                  <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
                  <p className="text-xs text-slate-500">Online</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium group"
              >
                <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 max-h-96' 
            : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden'
        }`}>
          <div className="px-4 pb-4 space-y-2 bg-white/80 backdrop-blur-xl border-t border-white/20">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-indigo-700 bg-indigo-50/80 shadow-md shadow-indigo-100/50 border border-indigo-100'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <Icon className={`h-5 w-5 ${
                    isActive(item.href) ? 'text-indigo-600' : ''
                  }`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile User Section */}
            <div className="pt-3 border-t border-slate-200/50 space-y-3">
              <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50/50 rounded-xl">
                <div className="relative">
                  <div className="h-10 w-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
                  <p className="text-xs text-slate-500">Online</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 w-full font-medium"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;