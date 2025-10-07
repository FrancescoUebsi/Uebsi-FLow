
import type { DevManualEntry } from '../types.ts';

export const manualEntries: DevManualEntry[] = [
  {
    date: '2024-07-29',
    title: 'Integrazione di Zustand per lo State Management',
    what: 'È stato scelto e integrato Zustand come libreria per la gestione dello stato globale del frontend. È stato preferito a Redux per la sua semplicità, la minima quantità di boilerplate e le ottime performance.',
    where: 'Lo store principale si trova in `src/store/useAppStore.ts`. I singoli "slice" dello stato sono definiti nello stesso file.',
    how: 'Per usare lo stato in un componente, importa lo hook: `import useAppStore from \'../store/useAppStore\';`. Poi, all\'interno del componente: `const myValue = useAppStore(state => state.myValue);` per leggere, e `const setMyValue = useAppStore(state => state.setMyValue);` per ottenere la funzione di aggiornamento.',
  },
  {
    date: '2024-07-25',
    title: 'Setup del Componente Task Riutilizzabile',
    what: 'È stato creato un componente `TaskItem` generico per visualizzare un task in diverse parti dell\'applicazione (Dashboard, Vista Progetto, etc.). Il componente gestisce la propria logica di espansione per mostrare/nascondere i dettagli.',
    where: 'Il codice si trova in `src/components/TaskItem.tsx`.',
    how: 'Il componente accetta una prop `task` di tipo `Task`. Non ha stato interno complesso oltre alla gestione dell\'UI (se è espanso o meno). Qualsiasi modifica allo stato del task deve essere gestita dal componente genitore.',
  },
];
