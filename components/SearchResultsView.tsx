
import React from 'react';
// Fix: Add file extension to import paths.
import type { Task } from '../types.ts';
import TaskItem from './TaskItem.tsx';

interface SearchResultsViewProps {
  query: string;
  results: Task[];
}

const SearchResultsView: React.FC<SearchResultsViewProps> = ({ query, results }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Risultati della ricerca per: "{query}"</h1>
      <p className="text-gray-600 mb-8">Trovati {results.length} task.</p>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">Nessun task trovato.</p>
          <p className="text-sm text-gray-400 mt-2">Prova a cercare con parole chiave diverse.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsView;