import type { Task, Project, User, ActivityLog, Folder } from '../types.ts';
import { Priority, TaskStatus } from '../types.ts';

export const users: User[] = [
  { id: 'user-1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=user-1' },
  { id: 'user-2', name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?u=user-2' },
  { id: 'user-3', name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?u=user-3' },
];

export const folders: Folder[] = [
  { id: 'folder-1', name: 'Sviluppo' },
  { id: 'folder-2', name: 'Design' },
];

export const projects: Project[] = [
  { id: 'proj-1', name: 'Frontend Refactor', icon: 'CodeIcon', folderId: 'folder-1' },
  { id: 'proj-2', name: 'API Gateway', icon: 'CodeIcon', folderId: 'folder-1' },
  { id: 'proj-3', name: 'Design System', icon: 'DesignIcon', folderId: 'folder-2' },
  { id: 'proj-4', name: 'Marketing Website', icon: 'DesignIcon' },
];

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Implementare autenticazione OAuth 2.0',
    description: 'Aggiungere login con Google e GitHub al portale clienti.',
    dueDate: new Date('2024-08-15T23:59:59'),
    priority: Priority.High,
    status: TaskStatus.InProgress,
    assignees: [users[0], users[2]],
    subtasks: [
      { id: 'sub-1-1', title: 'Creare client ID su Google Cloud', completed: true },
      { id: 'sub-1-2', title: 'Installare Passport.js', completed: true },
      { id: 'sub-1-3', title: 'Configurare la strategia Google', completed: false },
    ],
    tags: ['auth', 'backend', 'security'],
    projectId: 'proj-2',
  },
  {
    id: 'task-2',
    title: 'Creare componenti base del Design System',
    description: 'Sviluppare i componenti Button, Input e Card in React.',
    dueDate: new Date('2024-08-10T23:59:59'),
    priority: Priority.High,
    status: TaskStatus.InReview,
    assignees: [users[1]],
    subtasks: [],
    tags: ['react', 'storybook', 'design-system'],
    projectId: 'proj-3',
  },
  {
    id: 'task-3',
    title: 'Migrare state management a Zustand',
    description: 'Rimuovere Redux boilerplate e sostituirlo con store Zustand più semplici.',
    dueDate: new Date('2024-08-20T23:59:59'),
    priority: Priority.Medium,
    status: TaskStatus.ToDo,
    assignees: [users[0]],
    subtasks: [
      { id: 'sub-3-1', title: 'Analizzare stato attuale', completed: false },
      { id: 'sub-3-2', title: 'Creare store principale', completed: false },
    ],
    tags: ['refactor', 'frontend', 'state-management'],
    projectId: 'proj-1',
  },
  {
    id: 'task-4',
    title: 'Fix: Bug di layout su Safari',
    description: 'Il footer si sovrappone al contenuto principale su Safari 15.x.',
    dueDate: new Date('2024-08-05T23:59:59'),
    priority: Priority.Low,
    status: TaskStatus.Done,
    assignees: [users[2]],
    subtasks: [],
    tags: ['bugfix', 'css', 'safari'],
    projectId: 'proj-1',
  },
  {
    id: 'task-5',
    title: 'Scrivere documentazione per endpoint /users',
    description: 'Dettagliare i parametri di richiesta e i formati di risposta per l\'API degli utenti.',
    dueDate: new Date(), // Today
    priority: Priority.Medium,
    status: TaskStatus.ToDo,
    assignees: [users[0]],
    subtasks: [],
    tags: ['documentation', 'api'],
    projectId: 'proj-2'
  },
];

export const activityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    user: users[1],
    action: 'ha completato il task',
    target: 'Fix: Bug di layout su Safari',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 'log-2',
    user: users[0],
    action: 'ha aggiunto un nuovo task',
    target: 'Migrare state management a Zustand',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: 'log-3',
    user: users[2],
    action: 'ha commentato sul task',
    target: 'Implementare autenticazione OAuth 2.0',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
];