import React from 'react';
import { Plus } from 'lucide-react';

interface KanbanFiltersProps {
  filterPriority: string;
  onFilterChange: (value: string) => void;
  onAddTask: () => void;
}

const KanbanFilters: React.FC<KanbanFiltersProps> = ({
  filterPriority,
  onFilterChange,
  onAddTask,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Kanban Board</h2>
      <div className="flex space-x-4">
        <select
          className="border rounded p-2"
          value={filterPriority}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button
          onClick={onAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default KanbanFilters;