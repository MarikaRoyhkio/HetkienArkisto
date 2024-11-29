import React, { useState } from 'react';
import AddEntryForm from './AddEntryForm';
import '../styles/global.css';

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

type CalendarViewProps = {
    themes: Theme[];
    entries: Entry[];
    onAddEntry: (entry: Entry) => void;
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

const CalendarView: React.FC<CalendarViewProps> = ({ themes, entries, onAddEntry }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [showEntries, setShowEntries] = useState<Entry[]>([]);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth = Array.from(
        { length: endOfMonth.getDate() },
        (_, i) => new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i + 1)
    );

    const handleDayClick = (date: string) => {
        const dayEntries = entries.filter((entry) => entry.date === date);
        setShowEntries(dayEntries);
        setSelectedDay(date);
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div>
            <div className="calendar-header">
                <button onClick={previousMonth}>Edellinen</button>
                <h2>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h2>
                <button onClick={nextMonth}>Seuraava</button>
            </div>
            <div className="calendar-grid">
                {daysInMonth.map((day) => {
                    const dayString = day.toISOString().split('T')[0];
                    const dayEntries = entries.filter((entry) => entry.date === dayString);

                    return (
                        <div
                            key={dayString}
                            className="calendar-day"
                            onClick={() => handleDayClick(dayString)}
                        >
                            <span>{day.getDate()}</span>
                            <div className="day-symbols">
                                {/* Teemapallukat */}
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
                                {/* Fiilissymbolit */}
                                {dayEntries.flatMap((entry) =>
                                    entry.moods.map((mood) => (
                                        <span key={`${mood}-${dayString}`} title={mood}>
                                            {moodIcons[mood] || mood}
                                        </span>
                                    ))
                                )}
                            </div>
                            {/* Kuva (alapuolella) */}
                            {dayEntries[0]?.image && (
                                <div
                                    className="day-image"
                                    style={{
                                        backgroundImage: `url(${dayEntries[0].image})`,
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
            {/* Merkinnät ja lisääminen */}
            {selectedDay && (
                <div className="entry-modal">
                    <div className="modal-content">
                        <h3>Merkinnät päivältä {selectedDay}</h3>
                        {showEntries.length > 0 ? (
                            <ul>
                                {showEntries.map((entry, index) => (
                                    <li key={index}>
                                        <p>{entry.content}</p>
                                        <div>
                                            <strong>Teemat:</strong> {entry.themes.join(', ')}
                                        </div>
                                        <div>
                                            <strong>Fiilikset:</strong> {entry.moods.map((mood) => moodIcons[mood]).join(' ')}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Ei merkintöjä.</p>
                        )}
                        <button onClick={() => setSelectedDay(null)}>Sulje</button>
                        <AddEntryForm
                            date={selectedDay}
                            themes={themes}
                            onSave={(entry) => {
                                onAddEntry(entry);
                                setSelectedDay(null);
                            }}
                            onClose={() => setSelectedDay(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
