
import React, { useState } from 'react';
// Fix: Add file extension to import path.
import { TaskStatus } from '../types.ts';

interface ConfigureColumnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibleStatuses: TaskStatus[];
  onSave: (newStatuses: TaskStatus[]) => void;
}

// Fix: Explicitly type allStatuses to help TypeScript inference and resolve 'unknown' type errors.
const allStatuses: TaskStatus[] = Object.values(TaskStatus);

const ConfigureColumnsModal: React.FC<ConfigureColumnsModalProps> = ({
  isOpen,
  onClose,
  visibleStatuses,
  onSave,
}) => {
  const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>(visibleStatuses);

  const handleToggle = (status: TaskStatus) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleSave = () => {
    onSave(selectedStatuses);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Configura Colonne Kanban</h2>
        <div className="space-y-3">
          {allStatuses.map(status => (
            <div key={status} className="flex items-center">
              <input
                id={`status-${status}`}
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => handleToggle(status)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={`status-${status}`} className="ml-3 text-sm text-gray-700">
                {status}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 pt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Annulla
          </button>
          <button type="button" onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Salva
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigureColumnsModal;
