import React, { useState } from 'react';
import AddEntryForm from './AddEntryForm';
import MoodThemeGraph from './MoodThemeGraph';
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

const weekDays = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];

const CalendarView: React.FC<CalendarViewProps> = ({ themes, entries, onAddEntry }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [isAddEntryFormVisible, setIsAddEntryFormVisible] = useState(false);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth = Array.from(
        { length: endOfMonth.getDate() },
        (_, i) => new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i + 1)
    );

    const handleDayClick = (date: string) => {
        setSelectedDay(date);
        setIsAddEntryFormVisible(false);
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const firstDayIndex = (startOfMonth.getDay() + 6) % 7;

    const filteredEntries = selectedDay
        ? entries.filter((entry) => entry.date === selectedDay)
        : [];

    return (
        <div>
            <div className="calendar-header">
                <button onClick={previousMonth}>Edellinen</button>
                <h2>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h2>
                <button onClick={nextMonth}>Seuraava</button>
            </div>
            <div className="weekdays">
                {weekDays.map((day) => (
                    <div key={day} className="weekday">
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-grid">
                {[...Array(firstDayIndex)].map((_, i) => (
                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                ))}
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
            {selectedDay && !isAddEntryFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Merkinnät päivälle {selectedDay}</h3>
                        {filteredEntries.length > 0 ? (
                            <ul className="entry-list">
                                {filteredEntries.map((entry, index) => (
                                    <li key={index} className="entry-item">
                                        <p>
                                            {entry.themes.join(', ')} {entry.moods.map((mood) => moodIcons[mood]).join(' ')}
                                        </p>

                                        <p>{entry.content}</p>
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
                            <p>Ei merkintöjä tältä päivältä.</p>
                        )}
                        <div className="modal-buttons">
                            <button
                                onClick={() => { setIsAddEntryFormVisible(true) }}
                            >
                                Lisää merkintä
                            </button>
                            <button onClick={() => setSelectedDay(null)}>Sulje</button>
                        </div>
                    </div>
                </div>
            )}

            {isAddEntryFormVisible && selectedDay && (
                <AddEntryForm
                    date={selectedDay}
                    themes={themes}
                    entries={filteredEntries}
                    onSave={(entry) => {
                        onAddEntry(entry);
                        setIsAddEntryFormVisible(false); // Sulje lomake tallentamisen jälkeen
                    }}
                    onClose={() => setIsAddEntryFormVisible(false)}
                />
            )}
        </div>
    );
};

export default CalendarView;

