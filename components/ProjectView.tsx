import React, { useState } from 'react';
// Fix: 'TaskStatus' is an enum used as a value (e.g., `TaskStatus.ToDo`).
// It must be imported as a value, not with `import type` which is for type-only imports.
import type { Project, Task, User } from '../types.ts';
import { TaskStatus } from '../types.ts';
import { PlusIcon } from './icons/Icons.tsx';
import TaskItem from './TaskItem.tsx';
import CreateTaskModal from './CreateTaskModal.tsx';
import ProjectTableView from './ProjectTableView.tsx';
import ConfigureColumnsModal from './ConfigureColumnsModal.tsx';

interface ProjectViewProps {
  project: Project;
  tasks: Task[];
  users: User[];
  onAddTask: (taskData: Omit<Task, 'id' | 'projectId' | 'subtasks' | 'status'>, projectId: string) => void;
}

type ProjectDisplayMode = 'list' | 'board' | 'table';

const ProjectView: React.FC<ProjectViewProps> = ({ project, tasks, users, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ProjectDisplayMode>('list');
  const [visibleStatuses, setVisibleStatuses] = useState<TaskStatus[]>([
    TaskStatus.ToDo,
    TaskStatus.InProgress,
    TaskStatus.InReview,
    TaskStatus.Done,
  ]);

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'projectId' | 'subtasks' | 'status'>) => {
    onAddTask(taskData, project.id);
  };
  
  const renderView = () => {
    switch (viewMode) {
      case 'list':
        return (
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        );
      case 'board':
        return (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {visibleStatuses.map(status => (
              <div key={status} className="w-72 bg-gray-100 rounded-lg p-3 shrink-0">
                <h3 className="font-semibold text-sm text-gray-700 mb-4 px-1">{status}</h3>
                <div className="space-y-3">
                  {tasks.filter(t => t.status === status).map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        case 'table':
            return <ProjectTableView tasks={tasks} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="flex items-center gap-2">
            <div className="flex items-center rounded-md border border-gray-300 bg-white">
                <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 text-sm font-medium rounded-l-md ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Lista</button>
                <button onClick={() => setViewMode('board')} className={`px-3 py-1.5 text-sm font-medium border-x border-gray-300 ${viewMode === 'board' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Board</button>
                <button onClick={() => setViewMode('table')} className={`px-3 py-1.5 text-sm font-medium rounded-r-md ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Tabella</button>
            </div>
            {viewMode === 'board' && (
              <button 
                onClick={() => setIsConfigureModalOpen(true)}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Configura
              </button>
            )}
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
                <PlusIcon />
                Nuovo Task
            </button>
        </div>
      </div>
      
      {renderView()}

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        users={users}
      />
      
      <ConfigureColumnsModal 
        isOpen={isConfigureModalOpen}
        onClose={() => setIsConfigureModalOpen(false)}
        visibleStatuses={visibleStatuses}
        onSave={setVisibleStatuses}
      />

    </div>
  );
};

export default ProjectView;