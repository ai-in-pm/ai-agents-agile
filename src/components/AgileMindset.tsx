import React, { useState } from 'react';
import { Lightbulb, CheckSquare, Clock, BarChart2 } from 'lucide-react';

interface MindsetPrinciple {
  id: number;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Embraced';
  team: string;
}

const AgileMindset: React.FC = () => {
  const [principles, setPrinciples] = useState<MindsetPrinciple[]>([
    { id: 1, title: 'Embrace Change', status: 'Embraced', team: 'All Teams' },
    { id: 2, title: 'Continuous Learning', status: 'In Progress', team: 'Development' },
    { id: 3, title: 'Customer Collaboration', status: 'In Progress', team: 'Product' },
    { id: 4, title: 'Adaptive Planning', status: 'Not Started', team: 'Management' },
  ]);

  const [newPrinciple, setNewPrinciple] = useState<Partial<MindsetPrinciple>>({
    title: '',
    status: 'Not Started',
    team: '',
  });

  const addPrinciple = () => {
    if (newPrinciple.title && newPrinciple.team) {
      setPrinciples([...principles, { ...newPrinciple, id: Date.now() } as MindsetPrinciple]);
      setNewPrinciple({ title: '', status: 'Not Started', team: '' });
    }
  };

  const updatePrincipleStatus = (id: number, newStatus: 'Not Started' | 'In Progress' | 'Embraced') => {
    setPrinciples(principles.map(principle =>
      principle.id === id ? { ...principle, status: newStatus } : principle
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Embraced':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Agile Mindset Development</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Lightbulb className="mr-2" size={20} />
            Agile Principles Adoption
          </h3>
          <div className="space-y-4">
            {principles.map(principle => (
              <div key={principle.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div>
                  <h4 className="font-medium">{principle.title}</h4>
                  <p className="text-sm text-gray-500">Team: {principle.team}</p>
                </div>
                <select
                  value={principle.status}
                  onChange={(e) => updatePrincipleStatus(principle.id, e.target.value as 'Not Started' | 'In Progress' | 'Embraced')}
                  className={`${getStatusColor(principle.status)} px-2 py-1 rounded text-sm`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Embraced">Embraced</option>
                </select>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="New principle"
              className="w-full p-2 border rounded"
              value={newPrinciple.title}
              onChange={(e) => setNewPrinciple({ ...newPrinciple, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Team"
              className="w-full p-2 border rounded"
              value={newPrinciple.team}
              onChange={(e) => setNewPrinciple({ ...newPrinciple, team: e.target.value })}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              onClick={addPrinciple}
            >
              Add Principle
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2" size={20} />
            Mindset Progress
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Adoption</span>
              <span className="text-green-600 font-medium">
                {Math.round((principles.filter(principle => principle.status === 'Embraced').length / principles.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${(principles.filter(principle => principle.status === 'Embraced').length / principles.length) * 100}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-red-100 p-3 rounded">
                <p className="text-red-800 font-medium">Not Started</p>
                <p className="text-2xl font-bold text-red-800">
                  {principles.filter(principle => principle.status === 'Not Started').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <p className="text-yellow-800 font-medium">In Progress</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {principles.filter(principle => principle.status === 'In Progress').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <p className="text-green-800 font-medium">Embraced</p>
                <p className="text-2xl font-bold text-green-800">
                  {principles.filter(principle => principle.status === 'Embraced').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CheckSquare className="mr-2" size={20} />
            Key Mindset Practices
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="font-medium mr-2">Customer Focus:</span>
              <span>Regular customer feedback sessions and adaptations.</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Continuous Improvement:</span>
              <span>Weekly retrospectives and action items tracking.</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Empowerment:</span>
              <span>Team-driven decision making and problem-solving.</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Transparency:</span>
              <span>Open communication and visible progress tracking.</span>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2" size={20} />
            Transformation Timeline
          </h3>
          <div className="space-y-2">
            <p><strong>Phase 1:</strong> Understanding Agile Values</p>
            <p><strong>Phase 2:</strong> Practicing Agile Behaviors</p>
            <p><strong>Phase 3:</strong> Cultural Transformation</p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Next Steps</h4>
            <ul className="space-y-2">
              <li>Agile Leadership Workshop</li>
              <li>Team Empowerment Training</li>
              <li>Continuous Learning Programs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgileMindset;