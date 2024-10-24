import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Feedback: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="fixed bottom-20 left-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={24} />
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Provide Feedback</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="w-full h-32 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Your feedback..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                >
                  Submit Feedback
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Feedback;