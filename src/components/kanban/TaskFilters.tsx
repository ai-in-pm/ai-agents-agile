import React from 'react';
import { Filter } from 'lucide-react';

interface TaskFiltersProps {
  priorityFilter: string;
  onPriorityChange: (priority: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  priorityFilter,
  onPriorityChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Filter size={20} className="text-gray-400" />
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="all">All Priorities</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    </div>
  );
};

export default TaskFilters;