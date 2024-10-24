import React, { useState } from 'react';
import { FolderKanban, Plus, Star, Edit2, Trash2 } from 'lucide-react';

interface Scenario {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  industry: string;
}

const ScenarioManagement: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: 1, name: 'Agile Transformation', description: 'Guide a traditional company through an Agile transformation', difficulty: 4, industry: 'Technology' },
    { id: 2, name: 'Remote Team Collaboration', description: 'Optimize collaboration in a fully remote team', difficulty: 3, industry: 'Various' },
    { id: 3, name: 'Product Launch', description: 'Manage the launch of a new product in a competitive market', difficulty: 5, industry: 'Retail' },
  ]);

  const [newScenario, setNewScenario] = useState<Partial<Scenario>>({
    name: '',
    description: '',
    difficulty: 1,
    industry: '',
  });

  const addScenario = () => {
    if (newScenario.name && newScenario.description && newScenario.industry) {
      setScenarios([...scenarios, { ...newScenario, id: Date.now(), difficulty: newScenario.difficulty || 1 } as Scenario]);
      setNewScenario({ name: '', description: '', difficulty: 1, industry: '' });
    }
  };

  const deleteScenario = (id: number) => {
    setScenarios(scenarios.filter(scenario => scenario.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Scenario Management</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Create New Scenario</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Scenario Name"
            className="w-full p-2 border rounded"
            value={newScenario.name}
            onChange={(e) => setNewScenario({ ...newScenario, name: e.target.value })}
          />
          <textarea
            placeholder="Scenario Description"
            className="w-full p-2 border rounded"
            value={newScenario.description}
            onChange={(e) => setNewScenario({ ...newScenario, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Industry"
            className="w-full p-2 border rounded"
            value={newScenario.industry}
            onChange={(e) => setNewScenario({ ...newScenario, industry: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty: {newScenario.difficulty}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              className="w-full"
              value={newScenario.difficulty}
              onChange={(e) => setNewScenario({ ...newScenario, difficulty: parseInt(e.target.value) })}
            />
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
            onClick={addScenario}
          >
            <Plus className="mr-2" size={16} />
            Add Scenario
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Scenario Library</h3>
        {scenarios.length === 0 ? (
          <p className="text-gray-500">No scenarios available. Create a new scenario to get started.</p>
        ) : (
          <ul className="space-y-4">
            {scenarios.map((scenario) => (
              <li key={scenario.id} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{scenario.name}</h4>
                    <p className="text-gray-600 mt-1">{scenario.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Industry: {scenario.industry}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={index < scenario.difficulty ? 'text-yellow-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteScenario(scenario.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ScenarioManagement;