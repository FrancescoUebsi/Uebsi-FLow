
import React, { useState } from 'react';
// Fix: Add file extension to import paths.
import type { Task } from '../types.ts';
import SubtaskItem from './SubtaskItem.tsx';
import { Priority } from '../types.ts';

/**
 * @name TaskItem
 * @description Renders a card for a single task, showing essential details and a progress bar for subtasks.
 * @usage Used in Dashboard.tsx and ProjectView.tsx to display lists of tasks.
 * @dependencies React, SubtaskItem, types.ts.
 * @futureImprovements Add a modal for editing the task directly from this component.
 */

interface TaskItemProps {
  task: Task;
}

const priorityConfig: Record<Priority, { color: string, label: string }> = {
    [Priority.High]: { color: 'bg-red-500', label: 'Alta' },
    [Priority.Medium]: { color: 'bg-yellow-500', label: 'Media' },
    [Priority.Low]: { color: 'bg-green-500', label: 'Bassa' },
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const totalSubtasks = task.subtasks.length;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
      <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
        <div className="flex justify-between items-start">
            <p className="font-semibold text-gray-800">{task.title}</p>
            <div 
              className={`w-3 h-3 rounded-full mt-1 shrink-0 ${priorityConfig[task.priority].color}`}
              title={`Priorità: ${priorityConfig[task.priority].label}`}
            ></div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
          <p>{task.dueDate.toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}</p>
          <div className="flex -space-x-2">
            {task.assignees.map(user => (
              <img key={user.id} src={user.avatarUrl} alt={user.name} title={user.name} className="w-6 h-6 rounded-full border-2 border-white" />
            ))}
          </div>
        </div>

        {totalSubtasks > 0 && (
          <div className="mt-3">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
              <span>Sottotask</span>
              <span>{completedSubtasks}/{totalSubtasks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full" 
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progresso sottotask"
              ></div>
            </div>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">{task.description}</p>
          {totalSubtasks > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Elenco Sottotask</h4>
              <div className="space-y-2">
                {task.subtasks.map(subtask => (
                  <SubtaskItem key={subtask.id} subtask={subtask} />
                ))}
              </div>
            </div>
          )}
           <div className="mt-3 flex flex-wrap gap-2">
            {task.tags.map(tag => (
                <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tag}</span>
            ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;