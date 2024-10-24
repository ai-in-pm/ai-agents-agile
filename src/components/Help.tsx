import React from 'react';
import { useLocation } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

const Help: React.FC = () => {
  const location = useLocation();

  const getHelpContent = () => {
    switch (location.pathname) {
      case '/team-builder':
        return (
          <>
            <h3 className="text-lg font-semibold mb-2">Team Builder Help</h3>
            <p>Use this tool to create and manage your Agile team:</p>
            <ul className="list-disc list-inside">
              <li>Add team members (human or AI) with their roles and skills</li>
              <li>Customize AI agent capabilities</li>
              <li>Visualize your team structure</li>
              <li>Edit or remove team members as needed</li>
            </ul>
          </>
        );
      case '/scenario-generator':
        return (
          <>
            <h3 className="text-lg font-semibold mb-2">Scenario Generator Help</h3>
            <p>Create and manage project scenarios:</p>
            <ul className="list-disc list-inside">
              <li>Define scenario name, difficulty, and industry</li>
              <li>Add constraints and unexpected events</li>
              <li>Generate complex, adjustable scenarios</li>
              <li>Save and manage multiple scenarios</li>
            </ul>
          </>
        );
      // Add more cases for other routes...
      default:
        return (
          <>
            <h3 className="text-lg font-semibold mb-2">A-Teams Dashboard Help</h3>
            <p>Welcome to the A-Teams Dashboard! Use the sidebar to navigate between different tools and features.</p>
            <p>Each tool provides specific functionality to enhance your Agile team management and project planning.</p>
          </>
        );
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className="relative group">
        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
          <HelpCircle size={24} />
        </button>
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white dark:bg-gray-800 p-4 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          {getHelpContent()}
        </div>
      </div>
    </div>
  );
};

export default Help;