import React, { useState } from 'react';
import { Menu, Bell, User, Sun, Moon, LogIn, LogOut, Play } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onDemoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDemoClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      setShowLoginForm(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-4">A-Teams Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onDemoClick}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200 flex items-center"
            >
              <Play className="mr-2" size={16} />
              Demo
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none transition-colors duration-200"
              aria-label="Show notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 top-16">
                <p className="text-gray-700 dark:text-gray-300">No new notifications</p>
              </div>
            )}
            {user ? (
              <div className="flex items-center">
                <User size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 mr-2">{user.name}</span>
                <button
                  onClick={signOut}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none transition-colors duration-200"
                  aria-label="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowLoginForm(!showLoginForm)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none transition-colors duration-200"
                  aria-label="Sign in"
                >
                  <LogIn size={20} />
                </button>
                {showLoginForm && (
                  <form
                    onSubmit={handleSignIn}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4 z-50"
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 mb-2 border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 mb-2 border rounded dark:bg-gray-600 dark:text-white dark:border-gray-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                      Sign In
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;