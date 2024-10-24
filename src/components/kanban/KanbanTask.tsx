import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../types/kanban';
import { TaskPriorityBadge } from './TaskPriorityBadge';

interface KanbanTaskProps {
  task: Task;
  index: number;
}

export const KanbanTask: React.FC<KanbanTaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow p-4 mb-3 relative transition-shadow duration-200 ${
            snapshot.isDragging ? 'shadow-lg' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="flex items-center gap-2">
                <TaskPriorityBadge priority={task.priority} />
                {task.assignee && (
                  <span className="text-sm text-gray-500">
                    Assigned to: {task.assignee}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};