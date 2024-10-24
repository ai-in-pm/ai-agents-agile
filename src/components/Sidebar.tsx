import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, Users, Zap, BarChart2, Brain, Beaker, RefreshCw, FolderKanban, MessageSquare, PieChart, Lightbulb } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, text: 'Onboarding Tutorial', path: '/' },
    { icon: Info, text: 'Introduction', path: '/introduction' },
    { icon: Users, text: 'Team Builder', path: '/team-builder' },
    { icon: Zap, text: 'Scenario Generator', path: '/scenario-generator' },
    { icon: BarChart2, text: 'Performance Dashboard', path: '/performance-dashboard' },
    { icon: Brain, text: 'AI Team Optimizer', path: '/ai-team-optimizer' },
    { icon: Beaker, text: 'Experiment Lab', path: '/experiment-lab' },
    { icon: RefreshCw, text: 'Adaptive Learning', path: '/adaptive-learning' },
    { icon: FolderKanban, text: 'Scenario Management', path: '/scenario-management' },
    { icon: MessageSquare, text: 'Human-AI Collaboration', path: '/human-ai-collaboration' },
    { icon: PieChart, text: 'Results Analyzer', path: '/results-analyzer' },
    { icon: Lightbulb, text: 'Agile Mindset', path: '/agile-mindset' },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link to={item.path} className="flex items-center p-2 rounded hover:bg-gray-700">
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;