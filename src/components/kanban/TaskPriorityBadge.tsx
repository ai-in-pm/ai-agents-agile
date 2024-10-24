import React from 'react';
import { Priority } from '../../types/kanban';

interface TaskPriorityBadgeProps {
  priority: Priority;
}

export const TaskPriorityBadge: React.FC<TaskPriorityBadgeProps> = ({ priority }) => {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(priority)}`}>
      {priority}
    </span>
  );
};