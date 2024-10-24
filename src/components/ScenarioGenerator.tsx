import React, { useState, useEffect } from 'react';
import { Zap, Plus, X, AlertTriangle, Clock, Target, Users, Brain } from 'lucide-react';

interface Scenario {
  id: number;
  name: string;
  difficulty: number;
  industry: string;
  duration: string;
  teamSize: number;
  constraints: string[];
  events: string[];
  aiInvolvement: number;
}

const ScenarioGenerator: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    const savedScenarios = localStorage.getItem('scenarios');
    return savedScenarios ? JSON.parse(savedScenarios) : [];
  });

  const [newScenario, setNewScenario] = useState<Partial<Scenario>>({
    name: '',
    difficulty: 5,
    industry: '',
    duration: '',
    teamSize: 5,
    constraints: [],
    events: [],
    aiInvolvement: 50,
  });

  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');

  useEffect(() => {
    localStorage.setItem('scenarios', JSON.stringify(scenarios));
  }, [scenarios]);

  const addScenario = () => {
    if (newScenario.name && newScenario.industry) {
      setScenarios([...scenarios, { ...newScenario, id: Date.now() } as Scenario]);
      setNewScenario({
        name: '',
        difficulty: 5,
        industry: '',
        duration: '',
        teamSize: 5,
        constraints: [],
        events: [],
        aiInvolvement: 50,
      });
      setActiveTab('list');
    }
  };

  const removeScenario = (id: number) => {
    setScenarios(scenarios.filter(scenario => scenario.id !== id));
  };

  const addConstraint = (constraint: string) => {
    if (constraint) {
      setNewScenario({
        ...newScenario,
        constraints: [...(newScenario.constraints || []), constraint],
      });
    }
  };

  const addEvent = (event: string) => {
    if (event) {
      setNewScenario({
        ...newScenario,
        events: [...(newScenario.events || []), event],
      });
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'text-green-500';
    if (difficulty <= 7) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 flex items-center">
          <Zap className="mr-2" size={32} />
          Scenario Generator
        </h2>
        <div className="prose dark:prose-invert max-w-none mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Create realistic project scenarios to test and improve your team's agility:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Define project parameters and constraints</li>
            <li>Set AI involvement levels</li>
            <li>Add unexpected events to test adaptability</li>
            <li>Track scenario outcomes and team performance</li>
          </ul>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === 'create'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('create')}
          >
            Create Scenario
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === 'list'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('list')}
          >
            View Scenarios ({scenarios.length})
          </button>
        </div>

        {activeTab === 'create' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Scenario Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Product Launch Sprint"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  value={newScenario.name}
                  onChange={(e) => setNewScenario({ ...newScenario, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  placeholder="e.g., Technology"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  value={newScenario.industry}
                  onChange={(e) => setNewScenario({ ...newScenario, industry: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2 weeks"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  value={newScenario.duration}
                  onChange={(e) => setNewScenario({ ...newScenario, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  value={newScenario.teamSize}
                  onChange={(e) => setNewScenario({ ...newScenario, teamSize: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty Level: {newScenario.difficulty}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                className="w-full"
                value={newScenario.difficulty}
                onChange={(e) => setNewScenario({ ...newScenario, difficulty: parseInt(e.target.value) })}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Easy</span>
                <span>Medium</span>
                <span>Hard</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Involvement: {newScenario.aiInvolvement}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
                value={newScenario.aiInvolvement}
                onChange={(e) => setNewScenario({ ...newScenario, aiInvolvement: parseInt(e.target.value) })}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Minimal</span>
                <span>Balanced</span>
                <span>Maximum</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Constraints
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add constraint"
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addConstraint((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add constraint"]') as HTMLInputElement;
                    if (input.value) {
                      addConstraint(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Add
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {newScenario.constraints?.map((constraint, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                    {constraint}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unexpected Events
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add unexpected event"
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addEvent((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add unexpected event"]') as HTMLInputElement;
                    if (input.value) {
                      addEvent(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Add
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {newScenario.events?.map((event, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <AlertTriangle size={16} className="mr-2 text-red-500" />
                    {event}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
              onClick={addScenario}
            >
              <Plus className="mr-2" size={16} />
              Create Scenario
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {scenarios.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No scenarios created yet. Click "Create Scenario" to get started.
              </p>
            ) : (
              scenarios.map((scenario) => (
                <div key={scenario.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold dark:text-white">{scenario.name}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Target size={16} className="mr-2" />
                          Industry: {scenario.industry}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock size={16} className="mr-2" />
                          Duration: {scenario.duration}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Users size={16} className="mr-2" />
                          Team Size: {scenario.teamSize}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Brain size={16} className="mr-2" />
                          AI Involvement: {scenario.aiInvolvement}%
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty:</p>
                        <div className={`text-lg font-bold ${getDifficultyColor(scenario.difficulty)}`}>
                          {scenario.difficulty}/10
                        </div>
                      </div>
                      {scenario.constraints.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Constraints:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            {scenario.constraints.map((constraint, index) => (
                              <li key={index}>{constraint}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {scenario.events.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Events:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            {scenario.events.map((event, index) => (
                              <li key={index}>{event}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => removeScenario(scenario.id)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioGenerator;