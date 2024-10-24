import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const searchableItems = [
  { name: 'Team Builder', path: '/team-builder' },
  { name: 'Scenario Generator', path: '/scenario-generator' },
  { name: 'Performance Dashboard', path: '/performance-dashboard' },
  { name: 'AI Team Optimizer', path: '/ai-team-optimizer' },
  { name: 'Experiment Lab', path: '/experiment-lab' },
  { name: 'Adaptive Learning System', path: '/adaptive-learning' },
  { name: 'Scenario Management', path: '/scenario-management' },
  { name: 'Human-AI Collaboration', path: '/human-ai-collaboration' },
  { name: 'Results Analyzer', path: '/results-analyzer' },
  { name: 'Agile Methodology', path: '/agile-methodology' },
];

const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = searchableItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        className="fixed bottom-4 left-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon size={24} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center mb-4">
                <SearchIcon size={24} className="text-gray-500 dark:text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search features..."
                  className="flex-grow bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <ul className="space-y-2">
                {filteredItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Search;