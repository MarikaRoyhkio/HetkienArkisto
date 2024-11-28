import React, { useState } from 'react';
import AddEntryForm from './AddEntryForm';

type Entry = {
    date: string;
    content: string;
    image?: string;
    themes: string[];
    moods?: string[];
};

type CalendarViewProps = {
    themes: { name: string; color: string }[];
    entries: Entry[];
    onAddEntry: (entry: Entry) => void;
};

const CalendarView: React.FC<CalendarViewProps> = ({ themes, entries, onAddEntry }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth = Array.from(
        { length: endOfMonth.getDate() },
        (_, i) => new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i + 1)
    );

    const handleDayClick = (date: string) => {
        setSelectedDay(date);
    };

    return (
        <div>
            <h2>
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h2>
            <div className="calendar-grid">
                {daysInMonth.map((day) => {
                    const dayString = day.toISOString().split('T')[0];
                    const dayEntries = entries.filter((entry) => entry.date === dayString);

                    return (
                        <div key={dayString} className="calendar-day" onClick={() => handleDayClick(dayString)}>
                            <span>{day.getDate()}</span>
                            <div className="day-entries">
                                {dayEntries.map((entry, index) => (
                                    <div key={index} className="entry-dots">
                                        {entry.themes.map((theme) => {
                                            const themeColor = themes.find((t) => t.name === theme)?.color;
                                            return themeColor ? (
                                                <span
                                                    key={theme}
                                                    className="entry-dot"
                                                    style={{ backgroundColor: themeColor }}
                                                />
                                            ) : null;
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            {selectedDay && (
                <AddEntryForm
                    date={selectedDay}
                    themes={themes}
                    onSave={(entry) => {
                        onAddEntry(entry);
                        setSelectedDay(null);
                    }}
                    onClose={() => setSelectedDay(null)}
                />
            )}
        </div>
    );
};


export default CalendarView;
