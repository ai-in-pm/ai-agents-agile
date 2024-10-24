import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Users, Zap, BarChart2, Brain, Beaker, RefreshCw, MessageSquare, PieChart, Lightbulb, Info } from 'lucide-react';

const OnboardingTutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to A-Teams Dashboard',
      icon: Info,
      content: (
        <>
          <p className="mb-4">
            Welcome to your new Agile team management platform! This tutorial will guide you through the main features and help you get started.
          </p>
          <p className="mb-4">
            Click "Next" to begin your tour, or use the sidebar menu to explore on your own.
          </p>
          <Link to="/introduction" className="text-blue-600 hover:underline">
            Read our detailed introduction →
          </Link>
        </>
      ),
    },
    {
      title: 'Navigation',
      icon: ChevronRight,
      content: (
        <>
          <p className="mb-4">
            The sidebar on the left contains all the tools you'll need. Each tool is represented by an icon and a descriptive name.
          </p>
          <p className="mb-4">
            You can always return to this tutorial from the sidebar menu.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> Hover over any icon in the sidebar to see what it does!
            </p>
          </div>
        </>
      ),
    },
    {
      title: 'Team Builder',
      icon: Users,
      content: (
        <>
          <p className="mb-4">
            Start by creating your team! The Team Builder lets you:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Add team members with their roles and skills</li>
            <li>Include both human team members and AI assistants</li>
            <li>Organize your team structure</li>
          </ul>
          <Link to="/team-builder" className="text-blue-600 hover:underline">
            Start building your team →
          </Link>
        </>
      ),
    },
    {
      title: 'Scenario Generator',
      icon: Zap,
      content: (
        <>
          <p className="mb-4">
            Create practice scenarios for your team:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Choose difficulty levels that match your team's experience</li>
            <li>Add specific challenges and constraints</li>
            <li>Generate realistic project situations</li>
          </ul>
          <Link to="/scenario-generator" className="text-blue-600 hover:underline">
            Create your first scenario →
          </Link>
        </>
      ),
    },
    {
      title: 'Performance Dashboard',
      icon: BarChart2,
      content: (
        <>
          <p className="mb-4">
            Track your team's progress with easy-to-read charts and metrics:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>View team performance at a glance</li>
            <li>Monitor key metrics in real-time</li>
            <li>Identify areas for improvement</li>
          </ul>
          <Link to="/performance-dashboard" className="text-blue-600 hover:underline">
            View your dashboard →
          </Link>
        </>
      ),
    },
    {
      title: 'AI Features',
      icon: Brain,
      content: (
        <>
          <p className="mb-4">
            Our AI tools are here to help:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>AI Team Optimizer suggests the best team compositions</li>
            <li>Experiment Lab lets you test different approaches</li>
            <li>Adaptive Learning System improves over time</li>
          </ul>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Don't worry!</strong> Our AI tools are designed to be easy to use - no technical knowledge required.
            </p>
          </div>
        </>
      ),
    },
    {
      title: 'Getting Help',
      icon: MessageSquare,
      content: (
        <>
          <p className="mb-4">
            Help is always available:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Click the help icon (?) in the bottom-right corner</li>
            <li>Use the feedback button to send us your questions</li>
            <li>Try the demo mode to explore features safely</li>
          </ul>
          <p className="text-sm text-gray-600">
            Remember: There are no "wrong" questions - we're here to help!
          </p>
        </>
      ),
    },
  ];

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <CurrentIcon className="mr-3 text-blue-500" size={32} />
          <h2 className="text-3xl font-bold">{steps[currentStep].title}</h2>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          {steps[currentStep].content}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2" size={20} />
          Previous
        </button>
        
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          className={`flex items-center px-4 py-2 rounded transition-colors duration-200 ${
            currentStep === steps.length - 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
        >
          Next
          <ChevronRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default OnboardingTutorial;