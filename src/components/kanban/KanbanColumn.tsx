import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Task } from '../../types/kanban';
import { KanbanTask } from './KanbanTask';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  columnId: string;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, columnId }) => {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-sm text-gray-600">{tasks.length} tasks</span>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getProgressColor(progressPercentage)} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-gray-50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <KanbanTask key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};