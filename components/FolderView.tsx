
import React from 'react';
import type { Folder, Project, View } from '../types.ts';
import { iconMap } from './icons/Icons.tsx';

interface FolderViewProps {
  folder: Folder;
  projects: Project[];
  onSetView: (view: View) => void;
}

const FolderView: React.FC<FolderViewProps> = ({ folder, projects, onSetView }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cartella: {folder.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map(project => {
          const ProjectIconComponent = iconMap[project.icon] || iconMap.ProjectIcon;
          return (
            <div
              key={project.id}
              onClick={() => onSetView({ type: 'project', projectId: project.id })}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-500 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-indigo-600"><ProjectIconComponent /></span>
                <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FolderView;