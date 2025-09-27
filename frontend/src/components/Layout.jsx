// FILE: frontend/src/components/Layout.jsx
import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, MessageCircle, Users, User, Settings, Info, LogOut } from 'lucide-react';
import { UserDataContext } from '../context/UserContext';
import yuvaLogo from '../assets/yuvaLogo.png';
const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useContext(UserDataContext);

  const navigation = [
    { name: 'Home', href: '/', icon: MapPin },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Support', href: '/support', icon: MessageCircle },
    { name: 'Profile', href: '/dashboard', icon: User },
    { name: 'About', href: '/about', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-gray-900">
  <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-15 h-15 rounded-lg flex items-center justify-center">
              <img src={yuvaLogo} alt="Yuva Logo" />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-orange-500 bg-gray-700'
                    : 'text-gray-300 hover:text-orange-500 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <Link
            to="/report"
            className="bg-orange-500 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Report Issue
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Welcome, {user?.firstName || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-300 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Login
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                to="/signup"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-orange-500 p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Navigation */}
    {isMenuOpen && (
      <div className="md:hidden bg-gray-800 border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-orange-500 bg-gray-700'
                    : 'text-gray-300 hover:text-orange-500 hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <Link
            to="/report"
            className="block w-full text-left bg-orange-500 text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Report Issue
          </Link>
          
          {isAuthenticated ? (
            <div className="px-3 py-2">
              <div className="text-sm text-gray-300 mb-2">
                Welcome, {user?.firstName || 'User'}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-500 text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="px-3 py-2 space-y-2">
              <Link
                to="/login"
                className="block text-gray-300 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-gray-300 hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    )}
  </nav>

  <main className="flex-1">
    {children}
  </main>

  <footer className="bg-gray-800 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold">CivicConnect</span>
          </div>
          <p className="text-gray-400">
            Connecting communities to create positive change, one report at a time.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
            <li><Link to="/community" className="hover:text-orange-500 transition-colors">Community</Link></li>
            <li><Link to="/support" className="hover:text-orange-500 transition-colors">Support</Link></li>
            <li><Link to="/about" className="hover:text-orange-500 transition-colors">About</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Newsletter</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Social Media</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Community Forum</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 CivicConnect. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>
  );
};

export default Layout;