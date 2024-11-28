import React, { useState } from 'react';
import ThemeView from './components/ThemeView';
import Timeline from './components/Timeline';


type Entry = {
  date: string;
  content: string;
};

type Theme = {
  name: string;
  entries: Entry[];
};

const App = () => {

  const [themes, setThemes] = useState<Theme[]>([
    { name: 'Opiskelu', entries: [] },
    { name: 'Vapaa-aika', entries: [] },
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
