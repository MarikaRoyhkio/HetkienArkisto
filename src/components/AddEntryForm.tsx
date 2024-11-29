import React, { useState } from 'react';
import '../styles/global.css';

// Tyypit
type AddEntryFormProps = {
    date: string;
    themes: { name: string; color: string }[];
    onSave: (entry: {
        date: string;
        content: string;
        image?: string;
        themes: string[];
        moods: string[];
    }) => void;
    onClose: () => void;
};

const AddEntryForm: React.FC<AddEntryFormProps> = ({ date, themes, onSave, onClose }) => {
    const [content, setContent] = useState('');
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [moods, setMoods] = useState<string[]>([]);

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
    };

    return (
        <div className="form-overlay">
            <div className="form-content">
                <h3>Lisää merkintä päivälle {date}</h3>
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
