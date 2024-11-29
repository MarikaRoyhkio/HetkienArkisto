import React, { useState } from 'react';
import '../styles/global.css';

// Tyypit
type AddEntryFormProps = {
    date: string;
    themes: { name: string; color: string }[];
    entries: { content: string; image?: string; themes: string[]; moods: string[] }[];
    onSave: (entry: {
        date: string;
        content: string;
        image?: string;
        themes: string[];
        moods: string[];
    }) => void;
    onClose: () => void;
};

const AddEntryForm: React.FC<AddEntryFormProps> = ({ date, themes, entries, onSave, onClose }) => {
    const [content, setContent] = useState('');
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [moods, setMoods] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(false);

    const availableMoods = [
        { value: 'Iloinen', label: '😊' },
        { value: 'Neutraali', label: '😐' },
        { value: 'Surullinen', label: '😢' },
        { value: 'Väsynyt', label: '😴' },
        { value: 'Innostunut', label: '🤩' },
        { value: 'Pettynyt', label: '😞' },
        { value: 'Vihainen', label: '😠' },
        { value: 'Rakastunut', label: '❤️' },
    ];

    const handleThemeChange = (theme: string) => {
        setSelectedThemes((prev) =>
            prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
        );
    };

    const handleMoodChange = (mood: string) => {
        setMoods((prev) =>
            prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const entry = {
            date,
            content,
            themes: selectedThemes,
            moods,
            image: image ? URL.createObjectURL(image) : undefined,
        };
        onSave(entry);
        setContent('');
        setSelectedThemes([]);
        setMoods([]);
        setImage(null);
        setShowForm(false);
    };



    return (
        <div className="form-overlay">
            <div className="form-content">
                <h3>Merkinnät päivälle {date}</h3>
                {entries.length > 0 ? (
                    <div className="entry-list">
                        {entries.map((entry, index) => (
                            <div key={index} className="entry">
                                <p>{entry.content}</p>
                                {entry.image && <img src={entry.image} alt="Entry" className="entry-image" />}
                                <div>
                                    {entry.themes.map((theme) => (
                                        <span
                                            key={theme}
                                            className="theme-chip"
                                            style={{
                                                backgroundColor: themes.find((t) => t.name === theme)
                                                    ?.color,
                                            }}
                                        >
                                            {theme}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Ei merkintöjä tälle päivälle.</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="content">Merkinnän sisältö:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            required
                        />
                    </div>
                    <div>
                        <label>Valitse teemat:</label>
                        <div className="checkbox-group">
                            {themes.map((theme) => (
                                <label key={theme.name}>
                                    <input
                                        type="checkbox"
                                        value={theme.name}
                                        checked={selectedThemes.includes(theme.name)}
                                        onChange={() => handleThemeChange(theme.name)}
                                    />
                                    <span
                                        className="theme-color-dot"
                                        style={{ backgroundColor: theme.color }}
                                    />
                                    {theme.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Lisää kuva:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                        />
                    </div>
                    <div>
                        <label>Valitse fiilikset:</label>
                        <div className="checkbox-group">
                            {availableMoods.map((mood) => (
                                <label key={mood.value}>
                                    <input
                                        type="checkbox"
                                        value={mood.value}
                                        checked={moods.includes(mood.value)}
                                        onChange={() => handleMoodChange(mood.value)}
                                    />
                                    {mood.label} {mood.value}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Tallenna merkintä</button>
                    <button type="button" onClick={onClose}>
                        Peruuta
                    </button>
                </form>

            </div>
        </div>
    );
};

export default AddEntryForm;