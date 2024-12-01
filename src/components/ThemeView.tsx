import React, { useState } from 'react';
import AddEntryForm from './AddEntryForm';


// Tietueiden tyypitys
type Entry = {
    date: string;
    content: string;
    image?: string;
    themes: string[];
    moods: string[];
};

// Teeman tyypitys
type Theme = {
    name: string;
    color: string;
};

// Komponentin propsien tyypitys
type ThemeViewProps = {
    themes: Theme[]; // Kaikki käytettävissä olevat teemat
    entries: Entry[]; // Kaikki merkinnät
    onAddEntry: (entry: Entry) => void; // Funktio uuden merkinnän lisäämiseksi
};

const ThemeView: React.FC<ThemeViewProps> = ({ themes, entries, onAddEntry }) => {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    // Suodatetaan merkinnät valitulle päivälle
    const filteredEntries = entries.filter((entry) => entry.date === selectedDay);

    return (
        <div>
            {/* Näytetään merkintälomake, jos päivä on valittu */}
            {selectedDay && (
                <AddEntryForm
                    date={selectedDay} // Välitetään valittu päivämäärä lomakkeelle
                    themes={themes} // Välitetään teemat lomakkeelle
                    entries={filteredEntries} // Välitetään valitun päivän merkinnät
                    onSave={onAddEntry} // Tallenna uusi merkintä
                    onClose={() => setSelectedDay(null)} // Tyhjennä valinta ja sulje lomake
                />
            )}
        </div>
    );
};

export default ThemeView;


