
import React from 'react';
// Fix: Add file extension to import path.
import type { Subtask } from '../types.ts';

/**
 * @name SubtaskItem
 * @description Renders a single subtask item with a checkbox and title.
 * @usage Used within the expanded view of TaskItem.tsx.
 * @dependencies React, types.ts.
 * @futureImprovements Connect the checkbox to a state management function to toggle the 'completed' status.
 */

interface SubtaskItemProps {
  subtask: Subtask;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({ subtask }) => {
  return (
    <div className="flex items-center bg-gray-50 p-2 rounded-md">
      <input
        type="checkbox"
        checked={subtask.completed}
        readOnly // In a real app, this would be handled by an onChange event
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label
        className={`ml-3 text-sm ${subtask.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}
      >
        {subtask.title}
      </label>
    </div>
  );
};

export default SubtaskItem;