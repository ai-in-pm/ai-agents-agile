import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, X } from 'lucide-react';

interface DemoStep {
  path: string;
  content: string;
}

const demoSteps: DemoStep[] = [
  { path: '/', content: "Welcome to the A-Teams Dashboard! This is your central hub for managing Agile teams and projects. Let's explore the key features." },
  { path: '/team-builder', content: "The Team Builder allows you to create and manage your Agile teams. You can add both human team members and AI agents, specifying their roles and skills." },
  { path: '/scenario-generator', content: "Use the Scenario Generator to create complex project scenarios. You can adjust difficulty levels, add constraints, and unexpected events to test your team's adaptability." },
  { path: '/performance-dashboard', content: "The Performance Dashboard gives you a real-time view of your team's productivity, quality, and collaboration metrics. Use this data to make informed decisions and improvements." },
  { path: '/ai-team-optimizer', content: "The AI Team Optimizer analyzes your team composition and project requirements to suggest optimal team configurations and improvements." },
  { path: '/experiment-lab', content: "In the Experiment Lab, you can run simulations to test different team compositions and project variables. Use this to fine-tune your Agile processes." },
  { path: '/adaptive-learning', content: "The Adaptive Learning System tracks your team's performance over time and suggests improvements based on historical data and AI-driven insights." },
  { path: '/scenario-management', content: "Manage your project scenarios here. You can create, edit, and organize various project scenarios for different industries and complexity levels." },
  { path: '/human-ai-collaboration', content: "This interface facilitates seamless collaboration between human team members and AI agents. Use it for real-time communication and problem-solving." },
  { path: '/results-analyzer', content: "The Results Analyzer provides in-depth analysis of your team's performance across different projects and scenarios. Use these insights to continuously improve your Agile processes." },
  { path: '/agile-methodology', content: "This section helps you implement and track Agile methodologies. Manage sprints, backlogs, and track progress in real-time." },
  { path: '/kanban-board', content: "The Kanban Board offers a visual representation of your project workflow. Manage tasks, track progress, and optimize your team's workload." },
];

const DemoAgent: React.FC<{ isActive: boolean; onClose: () => void }> = ({ isActive, onClose }) => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<DemoStep | null>(null);

  useEffect(() => {
    if (isActive) {
      const step = demoSteps.find(step => step.path === location.pathname);
      setCurrentStep(step || null);
    }
  }, [isActive, location.pathname]);

  if (!isActive || !currentStep) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Bot className="mr-2 text-blue-500" size={24} />
          <h3 className="text-lg font-semibold">Demo Agent</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{currentStep.content}</p>
    </div>
  );
};

export default DemoAgent;