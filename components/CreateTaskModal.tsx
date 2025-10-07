
import React, { useState, useEffect } from 'react';
// Fix: Add file extension to import paths.
import type { Task, User } from '../types.ts';
import { Priority } from '../types.ts';

/**
 * @name CreateTaskModal
 * @description Renders a modal form to create a new task.
 * @usage Used in ProjectView.tsx to add new tasks to a project.
 * @dependencies React, types.ts
 */

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'projectId' | 'subtasks' | 'status'>) => void;
  users: User[];
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSave, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignees, setAssignees] = useState<User[]>([]);
  const [priority, setPriority] = useState<Priority>(Priority.Medium);

  useEffect(() => {
    // Reset form when modal is reopened
    if (isOpen) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setAssignees([]);
      setPriority(Priority.Medium);
    }
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) {
        alert("Titolo e data di scadenza sono obbligatori.");
        return;
    }
    
    onSave({
        title,
        description,
        dueDate: new Date(dueDate),
        assignees,
        priority,
        tags: [], // Tags can be added later
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Crea un nuovo task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titolo Task</label>
            <input 
              type="text" 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrizione</label>
            <textarea 
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Data di Scadenza</label>
              <input 
                type="date" 
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priorità</label>
                <select 
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value={Priority.Low}>Bassa</option>
                    <option value={Priority.Medium}>Media</option>
                    <option value={Priority.High}>Alta</option>
                </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assegna a</label>
            <div className="mt-2 flex flex-wrap gap-2">
                {users.map(user => (
                    <button
                        type="button"
                        key={user.id}
                        onClick={() => {
                            setAssignees(prev => 
                                prev.some(a => a.id === user.id) 
                                ? prev.filter(a => a.id !== user.id)
                                : [...prev, user]
                            )
                        }}
                        className={`flex items-center p-1 rounded-full border-2 ${assignees.some(a => a.id === user.id) ? 'border-indigo-500 bg-indigo-100' : 'border-transparent'}`}
                    >
                        <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                        <span className="text-sm font-medium mx-2">{user.name}</span>
                    </button>
                ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Annulla
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Salva Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;