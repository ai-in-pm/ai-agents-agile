import React, { useState } from 'react';
import { GitBranch, CheckSquare, Clock, BarChart2 } from 'lucide-react';

interface SprintTask {
  id: number;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee: string;
}

const AgileMethodology: React.FC = () => {
  const [sprintTasks, setSprintTasks] = useState<SprintTask[]>([
    { id: 1, title: 'Design user interface', status: 'Done', assignee: 'Alice' },
    { id: 2, title: 'Implement login functionality', status: 'In Progress', assignee: 'Bob' },
    { id: 3, title: 'Write unit tests', status: 'To Do', assignee: 'Charlie' },
    { id: 4, title: 'Set up CI/CD pipeline', status: 'To Do', assignee: 'David' },
  ]);

  const [newTask, setNewTask] = useState<Partial<SprintTask>>({
    title: '',
    status: 'To Do',
    assignee: '',
  });

  const addTask = () => {
    if (newTask.title && newTask.assignee) {
      setSprintTasks([...sprintTasks, { ...newTask, id: Date.now() } as SprintTask]);
      setNewTask({ title: '', status: 'To Do', assignee: '' });
    }
  };

  const updateTaskStatus = (id: number, newStatus: 'To Do' | 'In Progress' | 'Done') => {
    setSprintTasks(sprintTasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Agile Methodology Integration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <GitBranch className="mr-2" size={20} />
            Sprint Backlog
          </h3>
          <div className="space-y-4">
            {sprintTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-500">Assignee: {task.assignee}</p>
                </div>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value as 'To Do' | 'In Progress' | 'Done')}
                  className={`${getStatusColor(task.status)} px-2 py-1 rounded text-sm`}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="New task title"
              className="w-full p-2 border rounded"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Assignee"
              className="w-full p-2 border rounded"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2" size={20} />
            Sprint Progress
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Sprint Completion</span>
              <span className="text-green-600 font-medium">
                {Math.round((sprintTasks.filter(task => task.status === 'Done').length / sprintTasks.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${(sprintTasks.filter(task => task.status === 'Done').length / sprintTasks.length) * 100}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-red-100 p-3 rounded">
                <p className="text-red-800 font-medium">To Do</p>
                <p className="text-2xl font-bold text-red-800">
                  {sprintTasks.filter(task => task.status === 'To Do').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <p className="text-yellow-800 font-medium">In Progress</p>
                <p className="text-2xl font-bold text-yellow-800">
                  {sprintTasks.filter(task => task.status === 'In Progress').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <p className="text-green-800 font-medium">Done</p>
                <p className="text-2xl font-bold text-green-800">
                  {sprintTasks.filter(task => task.status === 'Done').length}
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
            Daily Stand-up
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="font-medium mr-2">Alice:</span>
              <span>Completed UI design, starting on user testing today.</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Bob:</span>
              <span>Working on login functionality, facing some issues with authentication.</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Charlie:</span>
              <span>Will start writing unit tests for the completed modules.</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">David:</span>
              <span>Researching best practices for setting up the CI/CD pipeline.</span>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2" size={20} />
            Sprint Timeline
          </h3>
          <div className="space-y-2">
            <p><strong>Sprint Start:</strong> May 1, 2023</p>
            <p><strong>Sprint End:</strong> May 14, 2023</p>
            <p><strong>Days Remaining:</strong> 7</p>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Upcoming Events</h4>
            <ul className="space-y-2">
              <li>Sprint Review: May 13, 2023</li>
              <li>Sprint Retrospective: May 14, 2023</li>
              <li>Next Sprint Planning: May 15, 2023</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgileMethodology;