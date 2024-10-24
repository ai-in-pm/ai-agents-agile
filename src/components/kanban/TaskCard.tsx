import React, { useState } from 'react';
import { Calendar, Flag, MoreVertical, Edit2, Trash2, Bot } from 'lucide-react';
import { Task } from './types';

interface TaskCardProps {
  task: Task;
  isEditing: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isEditing,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border-l-4 ${
      getPriorityColor(task.priority)
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
          >
            <MoreVertical size={16} />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Edit2 size={14} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Trash2 size={14} className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">{task.dueDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Flag size={14} className="text-gray-400" />
          <span className={`capitalize ${getPriorityColor(task.priority)} px-2 py-1 rounded text-xs`}>
            {task.priority}
          </span>
          {task.isAIAssisted && (
            <Bot size={14} className="text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;