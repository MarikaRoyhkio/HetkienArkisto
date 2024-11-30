import React, { useState, useEffect } from 'react';
import CalendarView from './components/CalendarView';
import AddThemeForm from './components/AddThemeForm';
import MoodThemeGraph from './components/MoodThemeGraph';
import './styles/global.css';

type Entry = {
  date: string;
  content: string;
  image?: string;
  themes: string[];
  moods: string[];
};

type Theme = {
  name: string;
  color: string;
};

const App = () => {
  const [themes, setThemes] = useState<Theme[]>([
    { name: 'Opiskelu', color: '#ffc0cb' },
    { name: 'Vapaa-aika', color: '#add8e6' },
    { name: 'Matkustelu', color: '#ffe4b5' },
  ]);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [isAddingTheme, setIsAddingTheme] = useState(false);

  useEffect(() => {
    // Simuloi tietojen noutoa localStoragesta
    const savedEntries = localStorage.getItem('entries');
    const savedThemes = localStorage.getItem('themes');
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedThemes) setThemes(JSON.parse(savedThemes));
  }, []);

  useEffect(() => {
    // Tallennetaan localStorageen
    localStorage.setItem('entries', JSON.stringify(entries));
    localStorage.setItem('themes', JSON.stringify(themes));
  }, [entries, themes]);

  const handleAddEntry = (newEntry: Entry) => {
    setEntries([...entries, newEntry]);
  };

  const handleAddTheme = (name: string, color: string) => {
    setThemes([...themes, { name, color }]);
    setIsAddingTheme(false);
  };

  return (
    <div>
      <header>Hetkien Arkisto
      </header>
      <main>
        <button onClick={() => setIsAddingTheme(true)}>Lisää uusi teema</button>
        <CalendarView
          themes={themes}
          entries={entries}
          onAddEntry={handleAddEntry}
        />

        <MoodThemeGraph entries={entries} themes={themes} graphType="themes" />
      </main>
      {isAddingTheme && (
        <AddThemeForm
          onAddTheme={handleAddTheme}
          onClose={() => setIsAddingTheme(false)}
        />
      )}
    </div>
  );
};

export default App;

