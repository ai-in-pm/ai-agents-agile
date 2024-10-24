import React, { useState } from 'react';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  type: 'human' | 'ai';
  skills: string[];
  performance: number;
}

interface OptimizationSuggestion {
  id: number;
  description: string;
  impact: string;
}

const AITeamOptimizer: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([
    { id: 1, name: 'Alice', role: 'Project Manager', type: 'human', skills: ['Leadership', 'Communication'], performance: 85 },
    { id: 2, name: 'Bob', role: 'Developer', type: 'human', skills: ['JavaScript', 'React'], performance: 78 },
    { id: 3, name: 'Charlie', role: 'Designer', type: 'human', skills: ['UI/UX', 'Figma'], performance: 92 },
    { id: 4, name: 'AI Assistant', role: 'Data Analyst', type: 'ai', skills: ['Data Analysis', 'Machine Learning'], performance: 95 },
  ]);

  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([
    { id: 1, description: 'Pair Bob with the AI Assistant for code review', impact: 'High' },
    { id: 2, description: 'Provide leadership training for Alice', impact: 'Medium' },
    { id: 3, description: 'Encourage Charlie to collaborate more with the AI Assistant on design decisions', impact: 'High' },
  ]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateOptimizationSuggestions = () => {
    // In a real application, this would involve complex AI algorithms
    // For this demo, we'll just toggle the visibility of pre-defined suggestions
    setShowSuggestions(!showSuggestions);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">AI Team Optimizer</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Current Team Composition</h3>
        <ul className="space-y-4">
          {team.map((member) => (
            <li key={member.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
              <div>
                <span className="font-semibold">{member.name}</span> - {member.role}
                <br />
                <span className="text-sm text-gray-600">
                  Type: {member.type === 'human' ? 'Human' : 'AI Agent'}
                </span>
                <br />
                <span className="text-sm text-gray-600">
                  Skills: {member.skills.join(', ')}
                </span>
              </div>
              <div className="text-right">
                <span className="font-semibold">Performance:</span>
                <br />
                <span className={`text-lg ${member.performance >= 90 ? 'text-green-500' : member.performance >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {member.performance}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xlfont-semibold mb-4">AI Optimization Suggestions</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center mb-4"
          onClick={generateOptimizationSuggestions}
        >
          <Brain className="mr-2" size={16} />
          {showSuggestions ? 'Hide Suggestions' : 'Generate Suggestions'}
          {showSuggestions ? <ChevronUp className="ml-2" size={16} /> : <ChevronDown className="ml-2" size={16} />}
        </button>
        {showSuggestions && (
          <ul className="space-y-4">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="bg-gray-100 p-4 rounded">
                <p className="font-semibold mb-2">{suggestion.description}</p>
                <p className="text-sm">
                  <span className="font-medium">Predicted Impact:</span>{' '}
                  <span className={`${suggestion.impact === 'High' ? 'text-green-500' : suggestion.impact === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {suggestion.impact}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AITeamOptimizer;