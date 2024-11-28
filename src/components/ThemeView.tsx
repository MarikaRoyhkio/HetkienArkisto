import React, { useState } from 'react';
import AddEntryForm from './AddEntryForm';
import AddThemeForm from './AddThemeForm';

// Tyypit
type Entry = {
    date: string;
    content: string;
    image?: string;
};

type Theme = {
    name: string;
    color: string;
    entries: Entry[];
};

type ThemeViewProps = {
    themes: Theme[];
    setThemes: React.Dispatch<React.SetStateAction<Theme[]>>;
};

const ThemeView: React.FC<ThemeViewProps> = ({ themes, setThemes }) => {
    const [activeTheme, setActiveTheme] = useState<string | null>(null);
    const [showAddThemeForm, setShowAddThemeForm] = useState(false);

    const handleAddEntry = (themeName: string, newEntry: Entry) => {
        setThemes((prevThemes) =>
            prevThemes.map((theme) =>
                theme.name === themeName
                    ? {
                        ...theme,
                        entries: [...theme.entries, newEntry].sort(
                            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                        ),
                    }
                    : theme
            )
        );
    };


    const addTheme = (name: string, color: string) => {
        setThemes([...themes, { name, color, entries: [] }]);
        setShowAddThemeForm(false); // Sulje lomake
    };

    return (
        <div>
            <h2>Teemat</h2>
            <ul>
                {themes.map((theme) => (
                    <li key={theme.name} style={{ backgroundColor: theme.color }}>
                        <strong>{theme.name}</strong>
                        <button onClick={() => setActiveTheme(theme.name)}>Lisää merkintä</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setShowAddThemeForm(true)}>Lisää teema</button>
            {showAddThemeForm && (
                <AddThemeForm onAddTheme={addTheme} onClose={() => setShowAddThemeForm(false)} />
            )}

            {activeTheme && (
                <AddEntryForm
                    themeName={activeTheme}
                    onSave={(entry) => handleAddEntry(activeTheme, entry)}
                    onClose={() => setActiveTheme(null)}
                />
            )}
        </div>
    );

};

export default ThemeView;

