import React from 'react';
import type { Project, Folder, View } from '../types.ts';
import { DashboardIcon, FolderIcon, ManualIcon, ActivityIcon, iconMap } from './icons/Icons.tsx';

interface SidebarProps {
  projects: Project[];
  folders: Folder[];
  onSetView: (view: View) => void;
  activeView: View;
}

const Sidebar: React.FC<SidebarProps> = ({ projects, folders, onSetView, activeView }) => {

  const isActive = (viewType: View['type'], id?: string) => {
    if (activeView.type !== viewType) return false;
    if (id) {
        if ('projectId' in activeView && activeView.projectId === id) return true;
        if ('folderId' in activeView && activeView.folderId === id) return true;
        return false;
    }
    // For views without an ID, just check the type
    if (activeView.type === viewType && !('projectId' in activeView || 'folderId' in activeView)) {
        return true;
    }
    return false;
  }

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col p-4 shrink-0 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8 px-2">
          <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
          <span className="text-xl font-bold text-gray-800">TaskFlow</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        <NavItem icon={<DashboardIcon />} label="Dashboard" onClick={() => onSetView({ type: 'dashboard' })} active={isActive('dashboard')} />
        
        {/* Folders */}
        <div className="pt-2">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cartelle</h3>
            {folders.map(folder => (
              <NavItem 
                key={folder.id}
                icon={<FolderIcon />}
                label={folder.name}
                onClick={() => onSetView({ type: 'folder', folderId: folder.id })}
                active={isActive('folder', folder.id)}
              />
            ))}
        </div>

        {/* Uncategorized Projects */}
        <div className="pt-2">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Progetti</h3>
            {projects.filter(p => !p.folderId).map(project => {
                const ProjectIconComponent = iconMap[project.icon] || iconMap.ProjectIcon;
                return (
                    <NavItem 
                        key={project.id}
                        icon={<ProjectIconComponent />} 
                        label={project.name} 
                        onClick={() => onSetView({ type: 'project', projectId: project.id })} 
                        active={isActive('project', project.id)}
                    />
                );
            })}
        </div>

        <div className="pt-4 border-t border-gray-200">
            <NavItem icon={<ManualIcon />} label="Manuale Sviluppo" onClick={() => onSetView({ type: 'manual' })} active={isActive('manual')} />
            <NavItem icon={<ActivityIcon />} label="Attività" onClick={() => onSetView({ type: 'activity' })} active={isActive('activity')} />
        </div>
      </nav>
    </aside>
  );
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick, active }) => {
    return (
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <span className={active ? 'text-indigo-600' : 'text-gray-400'}>{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </a>
    )
}

export default Sidebar;