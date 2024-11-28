import React from 'react';


type Entry = {
    date: string;
    content: string;
    image?: string;
};

type Theme = {
    name: string;
    entries: Entry[];
};

type TimelineProps = {
    themes: Theme[];
};

const Timeline: React.FC<TimelineProps> = ({ themes }) => {
    return (
        <div>
            <h2>Aikajana</h2>
            {themes.map((theme: Theme) => (
                <div className="card" key={theme.name}>
                    <h3>{theme.name}</h3>
                    <ul>
                        {theme.entries.map((entry, index) => (
                            <li key={index}>
                                {entry.date}: {entry.content}
                                {entry.image && <img src={entry.image} alt="Merkinnän kuva" style={{ maxWidth: '100px' }} />}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Timeline;