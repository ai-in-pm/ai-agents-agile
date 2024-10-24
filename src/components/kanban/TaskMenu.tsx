import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface TaskMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskMenu = ({ isOpen, onClose, onEdit, onDelete }: TaskMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
        onClick={onEdit}
      >
        <Edit2 className="w-4 h-4 mr-2" />
        Edit
      </button>
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
        onClick={onDelete}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </button>
    </div>
  );
};