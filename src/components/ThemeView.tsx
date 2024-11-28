import React, { useState } from 'react';
import AddEntryForm from './AddEntryForm';
//import AddThemeForm from './AddThemeForm';

// Tyypit
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

type ThemeViewProps = {
    themes: Theme[];
    entries: Entry[];
    onAddEntry: (entry: Entry) => void;
};

const ThemeView: React.FC<ThemeViewProps> = ({ themes, entries, onAddEntry }) => {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    return (
        <div>
            {selectedDay && (
                <AddEntryForm
                    date={selectedDay} // Varmistetaan, että päivämäärä välitetään
                    themes={themes} // Teemat, joita voidaan valita
                    onSave={onAddEntry} // Tallenna merkintä
                    onClose={() => setSelectedDay(null)} // Sulje lomake
                />
            )}
        </div>
    );
};

export default ThemeView;

