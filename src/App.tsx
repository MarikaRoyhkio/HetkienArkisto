import React, { useState } from 'react';
import CalendarView from './components/CalendarView';
import './styles/global.css';

type Entry = {
  date: string;
  content: string;
  image?: string;
  themes: string[];
  moods?: string[];
};

type Theme = {
  name: string;
  color: string;
};

const App = () => {

  const [themes, setThemes] = useState<Theme[]>([
    { name: 'Opiskelu', color: '#ff6347' },
    { name: 'Vapaa-aika', color: '#4caf50' },
    { name: 'Matkustelu', color: '#1e90ff' },
  ]);

  const [entries, setEntries] = useState<Entry[]>([]);

  const handleAddEntry = (newEntry: Entry) => {
    setEntries([...entries, newEntry]);
  };

  return (
    <div>
      <header>Hetkien Arkisto</header>
      <main>
        <CalendarView themes={themes} entries={entries} onAddEntry={handleAddEntry} />
      </main>
    </div>
  );
};

export default App;
