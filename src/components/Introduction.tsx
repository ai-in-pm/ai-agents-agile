import React from 'react';
import { Bot, Users, Zap, Brain, GitMerge, Shield, Target, Workflow } from 'lucide-react';

const Introduction: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Project Manager's Guide to AI Collaboration</h2>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Transforming Project Management with AI</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Welcome to A-Teams Dashboard, your comprehensive platform for managing Agile projects with AI assistance. We help Project Managers leverage artificial intelligence to enhance team performance, automate routine tasks, and make data-driven decisions while maintaining human oversight and strategic control.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <GitMerge className="text-blue-500 mr-2" size={24} />
              <h4 className="text-lg font-semibold dark:text-white">PM-AI Collaboration</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Learn how to effectively delegate tasks between human team members and AI agents. Our platform helps PMs maintain the perfect balance of automation and human oversight.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Shield className="text-green-500 mr-2" size={24} />
              <h4 className="text-lg font-semibold dark:text-white">Risk Management</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              AI assists in identifying potential risks early, suggesting mitigation strategies, and monitoring project health while keeping you in control of critical decisions.
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Target className="text-purple-500 mr-2" size={24} />
              <h4 className="text-lg font-semibold dark:text-white">Sprint Planning</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Get AI-powered insights for sprint planning, capacity allocation, and deadline estimation while maintaining your strategic oversight of team priorities.
            </p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Workflow className="text-orange-500 mr-2" size={24} />
              <h4 className="text-lg font-semibold dark:text-white">Workflow Optimization</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              AI analyzes team patterns and suggests workflow improvements while you focus on strategic leadership and team development.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">How PMs Work with AI</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold mb-2 dark:text-white">Daily Standups</h4>
            <p className="text-gray-600 dark:text-gray-300">
              AI assists in tracking progress, identifying blockers, and suggesting solutions while you focus on team facilitation and motivation.
            </p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold mb-2 dark:text-white">Sprint Reviews</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Get AI-generated insights on sprint performance, team velocity, and improvement areas while maintaining meaningful stakeholder communications.
            </p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold mb-2 dark:text-white">Resource Management</h4>
            <p className="text-gray-600 dark:text-gray-300">
              AI helps optimize team composition and workload distribution while you focus on team development and motivation.
            </p>
          </div>
          
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold mb-2 dark:text-white">Stakeholder Management</h4>
            <p className="text-gray-600 dark:text-gray-300">
              AI provides data-driven reports and forecasts while you maintain strategic stakeholder relationships and communication.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h4 className="font-semibold mb-2 dark:text-white">Getting Started</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Begin with the Onboarding Tutorial to understand basic platform features</li>
            <li>Use Team Builder to set up your human-AI collaborative team</li>
            <li>Create your first project scenario in the Scenario Generator</li>
            <li>Monitor progress in the Performance Dashboard</li>
            <li>Get AI assistance for team optimization and workflow improvements</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Introduction;