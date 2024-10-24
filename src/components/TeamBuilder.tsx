import React, { useState, useEffect } from 'react';
import { Users, Plus, X } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  type: 'human' | 'ai';
  skills: string[];
  capabilities?: string[];
}

const TeamBuilder: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(() => {
    const savedTeam = localStorage.getItem('team');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    type: 'human',
    skills: [],
    capabilities: [],
  });

  useEffect(() => {
    localStorage.setItem('team', JSON.stringify(team));
  }, [team]);

  const addTeamMember = () => {
    if (newMember.name && newMember.role) {
      setTeam([...team, { ...newMember, id: Date.now(), skills: newMember.skills || [], capabilities: newMember.capabilities || [] } as TeamMember]);
      setNewMember({ name: '', role: '', type: 'human', skills: [], capabilities: [] });
    }
  };

  const removeTeamMember = (id: number) => {
    setTeam(team.filter(member => member.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 flex items-center">
          <Users className="mr-2" size={32} />
          Team Builder
        </h2>
        <div className="prose dark:prose-invert max-w-none mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            The Team Builder helps you create and manage your Agile team by combining human expertise with AI capabilities. Here you can:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Add team members and define their roles</li>
            <li>Specify skills for human team members</li>
            <li>Configure AI agent capabilities</li>
            <li>Balance your team composition</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Start by adding your first team member using the form below. For AI agents, you can specify additional capabilities that will help automate and enhance your team's workflow.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Add Team Member</h3>
        {/* Rest of the existing TeamBuilder component code... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          />
          <select
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={newMember.type}
            onChange={(e) => setNewMember({ ...newMember, type: e.target.value as 'human' | 'ai' })}
          >
            <option value="human">Human</option>
            <option value="ai">AI Agent</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Skills (comma-separated)"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={newMember.skills?.join(', ')}
            onChange={(e) => setNewMember({ ...newMember, skills: e.target.value.split(',').map(s => s.trim()) })}
          />
        </div>
        {newMember.type === 'ai' && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="AI Capabilities (comma-separated)"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={newMember.capabilities?.join(', ')}
              onChange={(e) => setNewMember({ ...newMember, capabilities: e.target.value.split(',').map(s => s.trim()) })}
            />
          </div>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
          onClick={addTeamMember}
        >
          <Plus className="mr-2" size={16} />
          Add Member
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Team Composition</h3>
        {team.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No team members added yet.</p>
        ) : (
          <ul className="space-y-4">
            {team.map((member) => (
              <li key={member.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <div>
                  <span className="font-semibold dark:text-white">{member.name}</span> - {member.role}
                  <br />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Type: {member.type === 'human' ? 'Human' : 'AI Agent'}
                  </span>
                  <br />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Skills: {member.skills.join(', ')}
                  </span>
                  {member.type === 'ai' && (
                    <>
                      <br />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Capabilities: {member.capabilities?.join(', ')}
                      </span>
                    </>
                  )}
                </div>
                <button
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  onClick={() => removeTeamMember(member.id)}
                >
                  <X size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeamBuilder;