import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import MainContent from './components/MainContent.tsx';
import { tasks as initialTasks, projects as initialProjects, users as initialUsers, activityLogs as initialActivityLogs, folders as initialFolders } from './data/mockData.ts';
import type { View, Task, Project, User, ActivityLog, Folder, TaskStatus } from './types.ts';
import useDebounce from './hooks/useDebounce.ts';

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects] = useState<Project[]>(initialProjects);
  const [users] = useState<User[]>(initialUsers);
  const [activityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [folders] = useState<Folder[]>(initialFolders);

  const [view, setView] = useState<View>({ type: 'dashboard' });
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setView({ type: 'search', query: debouncedSearchQuery });
    } else if (view.type === 'search') {
      setView({ type: 'dashboard' });
    }
  }, [debouncedSearchQuery, view.type]);

  const handleSetView = (newView: View) => {
    setSearchQuery(''); // Clear search when navigating manually
    setView(newView);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'projectId' | 'subtasks' | 'status'>, projectId: string) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      projectId: projectId,
      subtasks: [],
      status: 'ToDo' as TaskStatus,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    // Optionally, add an activity log entry here
  };

  const currentUser = users[0];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        projects={projects}
        folders={folders}
        onSetView={handleSetView} 
        activeView={view} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentUser={currentUser} onSearch={handleSearch} />
        <MainContent 
          view={view}
          tasks={tasks}
          projects={projects}
          users={users}
          activityLogs={activityLogs}
          folders={folders}
          onAddTask={handleAddTask}
          onSetView={handleSetView}
        />
      </div>
    </div>
  );
}

export default App;
