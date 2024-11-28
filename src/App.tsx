import React, { useState } from 'react';
import ThemeView from './components/ThemeView';
import Timeline from './components/Timeline';
import './styles/global.css';

type Entry = {
  date: string;
  content: string;
};

type Theme = {
  name: string;
  color: string;
  entries: Entry[];
};

const App = () => {

  const [themes, setThemes] = useState<Theme[]>([
    { name: 'Opiskelu', color: '#ff6347', entries: [] },
    { name: 'Vapaa-aika', color: '#4caf50', entries: [] },
  ]);

  return (
    <div>
      <header>Hetkien Arkisto</header>
      <main>
        <ThemeView themes={themes} setThemes={setThemes} />
        <Timeline themes={themes} />
      </main>
    </div>
  );
};

export default App;
