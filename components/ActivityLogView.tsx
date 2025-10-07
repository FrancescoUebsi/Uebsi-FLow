
import React from 'react';
// Fix: Add file extension to import path.
import type { ActivityLog } from '../types.ts';

interface ActivityLogViewProps {
  logs: ActivityLog[];
}

const ActivityLogView: React.FC<ActivityLogViewProps> = ({ logs }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Registro Attività</h1>
      <p className="text-gray-600 mb-8">Le azioni più recenti nel workspace.</p>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {logs.map(log => (
            <li key={log.id} className="py-4 flex items-center">
              <img src={log.user.avatarUrl} alt={log.user.name} className="w-10 h-10 rounded-full" />
              <div className="ml-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{log.user.name}</span> {log.action} <span className="font-semibold text-indigo-600">{log.target}</span>.
                </p>
                <p className="text-xs text-gray-500">
                  {log.timestamp.toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })} alle {log.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityLogView;