
import React from 'react';
// Fix: Add file extension to import paths.
import { manualEntries } from '../data/devManualContent.ts';
import type { DevManualEntry } from '../types.ts';

/**
 * @name DevelopmentManual
 * @description Renders the integrated development manual page.
 * @usage Rendered by MainContent when the view is 'manual'.
 * @dependencies React, devManualContent.ts, types.ts
 */

const DevelopmentManual: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Manuale di Sviluppo</h1>
      <p className="text-gray-600 mb-8">Un registro delle modifiche e delle decisioni architetturali per facilitare la manutenzione futura.</p>

      <div className="space-y-8">
        {manualEntries.map((entry, index) => (
          <article key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-indigo-600 mb-1">{entry.date}</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{entry.title}</h2>
            
            <Section title="Cosa è stato realizzato" content={entry.what} />
            <Section title="Dove si trova il codice" content={entry.where} isCode />
            <Section title="Come modificarlo" content={entry.how} />

          </article>
        ))}
      </div>
    </div>
  );
};

const Section: React.FC<{title: string; content: string; isCode?: boolean}> = ({title, content, isCode = false}) => (
    <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
        {isCode ? (
            <code className="block text-sm bg-gray-100 p-3 rounded-md text-gray-800 whitespace-pre-wrap">{content}</code>
        ) : (
            <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
        )}
    </div>
);


export default DevelopmentManual;