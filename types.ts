
export enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
}
  
export enum TaskStatus {
    Backlog = 'Backlog',
    ToDo = 'Da Fare',
    InProgress = 'In Corso',
    InReview = 'In Revisione',
    Done = 'Completato',
}
  
export interface User {
    id: string;
    name: string;
    avatarUrl: string;
}
  
export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
}
  
export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: Priority;
    status: TaskStatus;
    assignees: User[];
    subtasks: Subtask[];
    tags: string[];
    projectId: string;
}
  
export interface Project {
    id: string;
    name: string;
    icon: string;
    folderId?: string;
}

export interface Folder {
    id: string;
    name: string;
}
  
export interface ActivityLog {
    id: string;
    user: User;
    action: string;
    target: string;
    timestamp: Date;
}

export interface DevManualEntry {
    date: string;
    title: string;
    what: string;
    where: string;
    how: string;
}

export type View = 
  | { type: 'dashboard' }
  | { type: 'project'; projectId: string }
  | { type: 'folder'; folderId: string }
  | { type: 'manual' }
  | { type: 'activity' }
  | { type: 'search'; query: string };