import React, { useState } from 'react';
import '../styles/global.css';

// Tyypit
type AddThemeFormProps = {
    onAddTheme: (name: string, color: string) => void;
    onClose: () => void;
};

const AddThemeForm: React.FC<AddThemeFormProps> = ({ onAddTheme, onClose }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ffffff');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddTheme(name, color); // Lähetetään tiedot App.tsx:lle
    };

    return (
        <div className="form-overlay">
            <div className="form-content">
                <h3>Lisää uusi teema</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Teeman nimi:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="color">Teeman väri:</label>
                        <input
                            id="color"
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <button type="submit">Tallenna teema</button>
                </form>
                <button onClick={onClose}>Peruuta</button>
            </div>
        </div>
    );
};

export default AddThemeForm;
