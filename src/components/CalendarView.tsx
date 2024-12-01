import React, { useState } from 'react';
import AddEntryForm from './AddEntryForm';
import '../styles/global.css';

// Tietueiden tyypitys
type Entry = {
    date: string; // Päivämäärä muodossa YYYY-MM-DD
    content: string; // Merkinnän sisältö
    image?: string; // Valinnainen kuva URL
    themes: string[]; // Lista teemoista
    moods: string[]; // Lista fiiliksistä
};

// Teeman tyypitys
type Theme = {
    name: string; // Teeman nimi
    color: string; // Teeman väri (CSS-muodossa, esim. #ff0000)
};

// Komponentin saamat propsit
type CalendarViewProps = {
    themes: Theme[]; // Kaikki käytettävissä olevat teemat
    entries: Entry[]; // Kaikki merkinnät
    onAddEntry: (entry: Entry) => void; // Funktio uuden merkinnän lisäämiseksi
};


const moodIcons: Record<string, string> = {
    Iloinen: '😊',
    Neutraali: '😐',
    Surullinen: '😢',
    Väsynyt: '😴',
    Innostunut: '🤩',
    Pettynyt: '😞',
    Vihainen: '😠',
    Rakastunut: '❤️',
};


const weekDays = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];

const CalendarView: React.FC<CalendarViewProps> = ({ themes, entries, onAddEntry }) => {
    // Tilamuuttujat
    const [currentDate, setCurrentDate] = useState(new Date()); // Nykyinen kuukausi
    const [selectedDay, setSelectedDay] = useState<string | null>(null); // Valittu päivä
    const [isAddEntryFormVisible, setIsAddEntryFormVisible] = useState(false); // Lomakkeen näkyvyys

    // Kuukauden alku ja loppupäivät
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Lista kaikista päivistä kuukaudessa
    const daysInMonth = Array.from(
        { length: endOfMonth.getDate() },
        (_, i) => new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i + 1)
    );

    // Päivän valinta
    const handleDayClick = (date: string) => {
        setSelectedDay(date); // Asetetaan valittu päivä
        setIsAddEntryFormVisible(false); // Piilotetaan lomake
    };

    // Siirry edelliseen kuukauteen
    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // Siirry seuraavaan kuukauteen
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Kuukauden ensimmäisen päivän viikonpäivä
    const firstDayIndex = (startOfMonth.getDay() + 6) % 7; // Korjataan viikon aloituspäivä maanantaiksi

    // Suodatetaan merkinnät valitulle päivälle
    const filteredEntries = selectedDay
        ? entries.filter((entry) => entry.date === selectedDay)
        : [];

    return (
        <div>
            {/* Kalenterin yläosa */}
            <div className="calendar-header">
                <button onClick={previousMonth}>Edellinen</button>
                <h2>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h2>
                <button onClick={nextMonth}>Seuraava</button>
            </div>

            {/* Viikonpäivät */}
            <div className="weekdays">
                {weekDays.map((day) => (
                    <div key={day} className="weekday">
                        {day}
                    </div>
                ))}
            </div>

            {/* Kalenteriruudukko */}
            <div className="calendar-grid">
                {/* Tyhjät ruudut ennen kuukauden ensimmäistä päivää */}
                {[...Array(firstDayIndex)].map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                ))}

                {/* Päiväkohtaiset ruudut */}
                {daysInMonth.map((day) => {
                    const dayString = day.toISOString().split('T')[0]; // Päivämäärä muodossa YYYY-MM-DD
                    const dayEntries = entries.filter((entry) => entry.date === dayString); // Merkinnät kyseiseltä päivältä
                    const backgroundImage = dayEntries[0]?.image; // Ensimmäisen merkinnän kuva

                    return (
                        <div
                            key={dayString}
                            className="calendar-day"
                            onClick={() => handleDayClick(dayString)} // Klikattavan päivän valinta
                            style={
                                backgroundImage
                                    ? {
                                        backgroundImage: `url(${backgroundImage})`, // Taustakuva
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        color: '#fff',
                                    }
                                    : undefined
                            }
                        >
                            {/* Päivämäärän numero */}
                            <span>{day.getDate()}</span>

                            {/* Teema- ja fiilissymbolit */}
                            <div className="day-symbols">
                                {/* Teemojen symbolit */}
                                {dayEntries.flatMap((entry) =>
                                    entry.themes.map((theme) => {
                                        const themeColor = themes.find((t) => t.name === theme)?.color;
                                        return themeColor ? (
                                            <span
                                                key={`${theme}-${dayString}`}
                                                className="entry-dot"
                                                style={{ backgroundColor: themeColor }}
                                            />
                                        ) : null;
                                    })
                                )}
                                {/* Fiilisten symbolit */}
                                {dayEntries.flatMap((entry) =>
                                    entry.moods.map((mood) => (
                                        <span key={`${mood}-${dayString}`} title={mood}>
                                            {moodIcons[mood] || mood}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal, joka näyttää valitun päivän merkinnät */}
            {selectedDay && !isAddEntryFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Merkinnät päivälle {selectedDay}</h3>
                        {/* Jos merkintöjä löytyy */}
                        {filteredEntries.length > 0 ? (
                            <ul className="entry-list">
                                {filteredEntries.map((entry, index) => (
                                    <li key={index} className="entry-item">
                                        {/* Teemat ja fiilikset */}
                                        <p>
                                            {entry.themes.join(', ')} {entry.moods.map((mood) => moodIcons[mood]).join(' ')}
                                        </p>
                                        {/* Sisältö */}
                                        <p>{entry.content}</p>
                                        {/* Kuva */}
                                        {entry.image && (
                                            <div
                                                className="entry-image"
                                                style={{
                                                    backgroundImage: `url(${entry.image})`,
                                                    backgroundSize: 'contain',
                                                    backgroundPosition: 'center',
                                                    height: '150px',
                                                    width: '150px',
                                                    border: '1px solid #ccc',
                                                    margin: '10px 0',
                                                }}
                                            ></div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Ei merkintöjä tältä päivältä.</p> // Ei merkintöjä
                        )}
                        {/* Napit modaalin hallintaan */}
                        <div className="modal-buttons">
                            <button
                                onClick={() => {
                                    setIsAddEntryFormVisible(true); // Näytä lomake
                                }}
                            >
                                Lisää merkintä
                            </button>
                            <button onClick={() => setSelectedDay(null)}>Sulje</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Merkintälomake */}
            {isAddEntryFormVisible && selectedDay && (
                <AddEntryForm
                    date={selectedDay} // Päivämäärä lomakkeelle
                    themes={themes} // Teemat lomakkeelle
                    entries={filteredEntries} // Valitun päivän merkinnät
                    onSave={(entry) => {
                        onAddEntry(entry); // Uuden merkinnän tallennus
                        setIsAddEntryFormVisible(false); // Lomake piiloon
                    }}
                    onClose={() => setIsAddEntryFormVisible(false)} // Lomake piiloon
                />
            )}
        </div>
    );
};

export default CalendarView;

