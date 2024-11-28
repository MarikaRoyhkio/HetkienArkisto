import React from 'react';


type Entry = {
    date: string;
    content: string;
};

type Theme = {
    name: string;
    entries: Entry[];
};

type ThemeViewProps = {
    themes: Theme[];
    setThemes: React.Dispatch<React.SetStateAction<Theme[]>>;
};

const ThemeView: React.FC<ThemeViewProps> = ({ themes, setThemes }) => {
    const addTheme = () => {
        const name = prompt('Anna uuden teeman nimi:');
        if (name) {
            setThemes([...themes, { name, entries: [] }]);
        }
    };

    return (
        <div>
            <h2>Teemat</h2>
            <ul>
                {themes.map((theme) => (
                    <li key={theme.name}>{theme.name}</li>
                ))}
            </ul>
            <button onClick={addTheme}>Lisää teema</button>
        </div>
    );
};

export default ThemeView;
