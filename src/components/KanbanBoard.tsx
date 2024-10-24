import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plus, Filter } from 'lucide-react';
import { Task, Column, Priority } from '../types/kanban';
import { KanbanColumn } from './kanban/KanbanColumn';
import { TaskDialog } from './kanban/TaskDialog';

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);
    
    if (!sourceColumn || !destColumn) return;

    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = source.droppableId === destination.droppableId 
      ? sourceTasks 
      : [...destColumn.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, {
      ...removed,
      status: destination.droppableId as Task['status']
    });

    setColumns(columns.map(col => {
      if (col.id === source.droppableId) {
        return { ...col, tasks: sourceTasks };
      }
      if (col.id === destination.droppableId) {
        return { ...col, tasks: destTasks };
      }
      return col;
    }));
  };

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      status: 'todo'
    };

    setColumns(columns.map(col => 
      col.id === 'todo' 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => 
      selectedPriority === 'all' || task.priority === selectedPriority
    )
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <div className="flex gap-4">
          <select
            className="border rounded p-2"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as Priority | 'all')}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            onClick={() => setIsAddingTask(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredColumns.map(column => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              tasks={column.tasks}
              columnId={column.id}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskDialog
        isOpen={isAddingTask}
        onClose={() => setIsAddingTask(false)}
        onSave={(task) => {
          handleAddTask(task);
          setIsAddingTask(false);
        }}
      />
    </div>
  );
};

export default KanbanBoard;