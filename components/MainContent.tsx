
import React from 'react';
import type { View, Task, User, Project, ActivityLog, Folder } from '../types.ts';
import Dashboard from './Dashboard.tsx';
import ProjectView from './ProjectView.tsx';
import DevelopmentManual from './DevelopmentManual.tsx';
import ActivityLogView from './ActivityLogView.tsx';
import SearchResultsView from './SearchResultsView.tsx';
import FolderView from './FolderView.tsx';

interface MainContentProps {
  view: View;
  tasks: Task[];
  projects: Project[];
  users: User[];
  activityLogs: ActivityLog[];
  folders: Folder[];
  onAddTask: (taskData: Omit<Task, 'id' | 'projectId' | 'subtasks' | 'status'>, projectId: string) => void;
  onSetView: (view: View) => void;
}

const MainContent: React.FC<MainContentProps> = ({ 
    view, 
    tasks, 
    projects, 
    users, 
    activityLogs, 
    folders,
    onAddTask,
    onSetView
}) => {
  const currentUser = users[0];

  const renderContent = () => {
    switch (view.type) {
      case 'dashboard':
        return <Dashboard tasks={tasks} currentUser={currentUser} />;
      case 'project':
        const project = projects.find(p => p.id === view.projectId);
        const projectTasks = tasks.filter(t => t.projectId === view.projectId);
        if (!project) return <div>Progetto non trovato</div>;
        return <ProjectView project={project} tasks={projectTasks} users={users} onAddTask={onAddTask} />;
      case 'folder':
        const folder = folders.find(f => f.id === view.folderId);
        const folderProjects = projects.filter(p => p.folderId === view.folderId);
        if (!folder) return <div>Cartella non trovata</div>;
        return <FolderView folder={folder} projects={folderProjects} onSetView={onSetView} />;
      case 'manual':
        return <DevelopmentManual />;
      case 'activity':
        return <ActivityLogView logs={activityLogs} />;
      case 'search':
        const searchResults = tasks.filter(task => 
            task.title.toLowerCase().includes(view.query.toLowerCase()) || 
            task.description.toLowerCase().includes(view.query.toLowerCase())
        );
        return <SearchResultsView query={view.query} results={searchResults} />;
      default:
        return <div>Seleziona una vista</div>;
    }
  };

  return (
    <main className="flex-grow p-8 bg-white overflow-y-auto">
      {renderContent()}
    </main>
  );
};

export default MainContent;
