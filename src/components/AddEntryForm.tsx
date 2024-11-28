import React, { useState } from 'react';

type Entry = {
    date: string;
    content: string;
    image?: string;
};

type AddEntryFormProps = {
    themeName: string;
    onSave: (entry: Entry) => void;
    onClose: () => void;
};

const AddEntryForm: React.FC<AddEntryFormProps> = ({ themeName, onSave, onClose }) => {
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | undefined>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !content) {
            alert('Päivämäärä ja sisältö ovat pakollisia!');
            return;
        }

        onSave({ date, content, image });
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

    return (
        <div className="form">
            <div className="form-content">
                <h2>Lisää merkintä teemaan: {themeName}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Päivämäärä:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div>
                        <label>Merkinnän sisältö:</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div>
                        <label>Lisää kuva:</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </div>
                    {image && <img src={image} alt="Esikatselu" style={{ maxWidth: '100px', marginTop: '10px' }} />}
                    <div>
                        <button type="submit">Tallenna</button>
                        <button type="button" onClick={onClose}>
                            Peruuta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntryForm;
