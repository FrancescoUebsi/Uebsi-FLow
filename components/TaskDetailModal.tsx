
import React from 'react';
// Fix: Add file extension to import path.
import type { Task } from '../types.ts';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, isOpen, onClose }) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p className="text-gray-600 mb-6">{task.description}</p>
        
        {/* More details would go here */}

        <div className="flex justify-end mt-8">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;