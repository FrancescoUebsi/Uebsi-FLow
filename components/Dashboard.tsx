
import React from 'react';
// Fix: Add file extension to import paths.
import type { Task, User } from '../types.ts';
import TaskItem from './TaskItem.tsx';

/**
 * @name Dashboard
 * @description Renders the personal dashboard view, showing tasks assigned to the current user, categorized by due dates.
 * @usage Rendered by MainContent when the view is 'dashboard'.
 * @dependencies React, TaskItem, types.ts.
 * @futureImprovements Add charts or stats about task completion.
 */

interface DashboardProps {
  tasks: Task[];
  currentUser: User;
}

const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, currentUser }) => {
  const myTasks = tasks.filter(task => 
    task.assignees.some(assignee => assignee.id === currentUser.id)
  );
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const next7Days = new Date(today);
  next7Days.setDate(today.getDate() + 7);

  const overdueTasks = myTasks.filter(task => new Date(task.dueDate) < today && task.status !== 'Completato');
  const todayTasks = myTasks.filter(task => isSameDay(new Date(task.dueDate), today));
  const tomorrowTasks = myTasks.filter(task => isSameDay(new Date(task.dueDate), tomorrow));
  const upcomingTasks = myTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate > tomorrow && dueDate <= next7Days;
  });

  const TaskSection: React.FC<{ title: string; tasks: Task[]; emptyMessage: string; titleColor: string }> = ({ title, tasks, emptyMessage, titleColor }) => (
    <div className="mb-8">
      <h2 className={`text-xl font-bold mb-4 ${titleColor}`}>{title}</h2>
      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map(task => <TaskItem key={task.id} task={task} />)}
        </div>
      ) : (
        <p className="text-gray-500 italic">{emptyMessage}</p>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Le mie attività</h1>
      <p className="text-gray-600 mb-8">Ciao {currentUser.name}, ecco un riepilogo delle tue attività.</p>

      <TaskSection title="In Ritardo" tasks={overdueTasks} emptyMessage="Nessuna attività in ritardo. Ottimo lavoro!" titleColor="text-red-600" />
      <TaskSection title="Oggi" tasks={todayTasks} emptyMessage="Nessuna attività per oggi. Prenditi un caffè!" titleColor="text-blue-600" />
      <TaskSection title="Domani" tasks={tomorrowTasks} emptyMessage="Nessuna attività in scadenza domani." titleColor="text-green-600" />
      <TaskSection title="Prossimi 7 Giorni" tasks={upcomingTasks} emptyMessage="Nessuna attività in programma per la prossima settimana." titleColor="text-purple-600" />
    </div>
  );
};

export default Dashboard;
