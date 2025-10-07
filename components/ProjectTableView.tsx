
import React from 'react';
import type { Task, User } from '../types.ts';
import { Priority } from '../types.ts';

interface ProjectTableViewProps {
  tasks: Task[];
}

const priorityClasses: Record<Priority, string> = {
    [Priority.High]: "bg-red-100 text-red-800",
    [Priority.Medium]: "bg-yellow-100 text-yellow-800",
    [Priority.Low]: "bg-green-100 text-green-800",
}

const ProjectTableView: React.FC<ProjectTableViewProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assegnatari</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorità</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scadenza</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{task.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex -space-x-2">
                    {task.assignees.map(user => (
                        <img key={user.id} src={user.avatarUrl} alt={user.name} title={user.name} className="w-8 h-8 rounded-full border-2 border-white" />
                    ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityClasses[task.priority]}`}>
                    {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {task.dueDate.toLocaleDateString('it-IT')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTableView;
