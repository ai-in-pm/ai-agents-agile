import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../types/kanban';

interface DraggableTaskProps {
  task: Task;
  index: number;
  children: React.ReactNode;
}

export const DraggableTask = ({ task, index, children }: DraggableTaskProps) => (
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
        {children}
      </div>
    )}
  </Draggable>
);