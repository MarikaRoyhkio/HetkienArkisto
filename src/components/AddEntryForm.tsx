import React, { useState } from 'react';

type Entry = {
    date: string;
    content: string;
    image?: string;
    themes: string[],
    moods?: string[];
};

type AddEntryFormProps = {
    date: string;
    themes: { name: string; color: string }[];
    onSave: (entry: Entry) => void;
    onClose: () => void;
};

const AddEntryForm: React.FC<AddEntryFormProps> = ({ date, themes, onSave, onClose }) => {
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | undefined>();
    const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content || !selectedThemes.length) {
            alert('Sisältö ja teemat ovat pakollisia!');
            return;
        }

        const newEntry: Entry = {
            date,
            content,
            image,
            themes: selectedThemes,
            moods: selectedMoods,
        };

        onSave(newEntry);
        onClose();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleThemeChange = (themeName: string) => {
        setSelectedThemes((prevThemes) =>
            prevThemes.includes(themeName)
                ? prevThemes.filter((theme) => theme !== themeName)
                : [...prevThemes, themeName]
        );
    };

    const handleMoodChange = (mood: string) => {
        setSelectedMoods((prevMoods) =>
            prevMoods.includes(mood) ? prevMoods.filter((m) => m !== mood) : [...prevMoods, mood]
        );
    };

    return (
        <div className="form">
            <h2>Lisää merkintä päivälle: {date}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Päivämäärä:</label>
                    <input type="date" value={date} readOnly />
                </div>
                <div>
                    <label>Merkinnän sisältö:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label>Valitse teemat:</label>
                    {themes.map((theme) => (
                        <label key={theme.name} style={{ backgroundColor: theme.color }}>
                            <input
                                type="checkbox"
                                checked={selectedThemes.includes(theme.name)}
                                onChange={() => handleThemeChange(theme.name)}
                            />
                            {theme.name}
                        </label>
                    ))}
                </div>
                <div>
                    <label>Valitse fiilikset:</label>
                    {/* Lisätään fiiliksen valinta tähän */}
                </div>
                <div>
                    <label>Lisää kuva:</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                {image && <img src={image} alt="Esikatselu" style={{ maxWidth: '100px', marginTop: '10px' }} />}
                <button type="submit">Tallenna merkintä</button>
                <button type="button" onClick={onClose}>Peruuta</button>
            </form>
        </div>
    );
};

export default AddEntryForm;
