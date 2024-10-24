import React from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

interface DroppableColumnProps extends Omit<DroppableProps, 'children'> {
  children: React.ReactNode;
}

export const DroppableColumn = ({ children, ...props }: DroppableColumnProps) => (
  <Droppable {...props}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`min-h-[200px] transition-colors duration-200 ${
          snapshot.isDraggingOver ? 'bg-gray-50' : ''
        }`}
      >
        {children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);