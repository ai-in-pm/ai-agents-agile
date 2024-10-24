import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Task } from '../../types/kanban';

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'status'>) => void;
  initialTask?: Task;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTask
}) => {
  const [task, setTask] = useState<Partial<Task>>(
    initialTask || {
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: undefined
    }
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (task.title && task.priority) {
            onSave(task as Omit<Task, 'id' | 'status'>);
          }
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={task.title || ''}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={task.description || ''}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className="w-full border rounded p-2"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={task.priority}
                onChange={(e) => setTask({ ...task, priority: e.target.value as Task['priority'] })}
                className="w-full border rounded p-2"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Assignee</label>
              <input
                type="text"
                value={task.assignee || ''}
                onChange={(e) => setTask({ ...task, assignee: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setTask({ ...task, dueDate: new Date(e.target.value) })}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {initialTask ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};