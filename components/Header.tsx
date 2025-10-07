
import React from 'react';
import type { User } from '../types.ts';
import { SearchIcon } from './icons/Icons.tsx';

interface HeaderProps {
  currentUser: User;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          onChange={handleSearch}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Cerca task..."
        />
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 mr-3">{currentUser.name}</span>
        <img className="h-9 w-9 rounded-full" src={currentUser.avatarUrl} alt={currentUser.name} />
      </div>
    </header>
  );
};

export default Header;
