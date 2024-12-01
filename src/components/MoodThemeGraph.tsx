import React from 'react';
import { Pie } from 'react-chartjs-2'; // Piirakkakaavio Chart.js-kirjastosta
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Rekisteröidään Chart.js:n tarvittavat osat
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

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
    name: string;
    color: string;
};

// Komponentin propsien tyypitys
type MoodThemeGraphProps = {
    entries: Entry[]; // Kaikki merkinnät
    themes: Theme[]; // Kaikki käytettävissä olevat teemat
    graphType: 'moods' | 'themes'; // Kaavion tyyppi: fiilikset tai teemat
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

const MoodThemeGraph: React.FC<MoodThemeGraphProps> = ({ entries, themes }) => {
    const totalEntries = entries.length; // Kokonaismäärä merkintöjä

    // Lasketaan fiilisten esiintymismäärät
    const moodCounts: Record<string, number> = {};
    entries.forEach((entry) => {
        entry.moods.forEach((mood) => {
            moodCounts[mood] = (moodCounts[mood] || 0) + 1; // Lisää tai aloita laskuri
        });
    });

    // Lasketaan teemojen esiintymismäärät
    const themeCounts: Record<string, number> = {};
    entries.forEach((entry) => {
        entry.themes.forEach((theme) => {
            themeCounts[theme] = (themeCounts[theme] || 0) + 1; // Lisää tai aloita laskuri
        });
    });

    // Rakennetaan fiilisdata piirakkakaaviota varten
    const moodData = {
        labels: Object.keys(moodCounts), // Fiilisten nimet (esim. Iloinen, Surullinen)
        datasets: [
            {
                data: Object.values(moodCounts).map((count) => (count / totalEntries) * 100), // Prosenttiosuuksien lasku
                backgroundColor: ['#f39c12', '#27ae60', '#3498db', '#9b59b6', '#e74c3c', '#1abc9c', '#2ecc71', '#f1c40f'], // Värit fiiliksille
            },
        ],
    };

    // Rakennetaan teemadata piirakkakaaviota varten
    const themeData = {
        labels: Object.keys(themeCounts), // Teemojen nimet
        datasets: [
            {
                data: Object.values(themeCounts).map((count) => (count / totalEntries) * 100), // Prosenttiosuuksien lasku
                backgroundColor: Object.keys(themeCounts).map(
                    (theme) => themes.find((t) => t.name === theme)?.color || '#cccccc'
                ),
            },
        ],
    };

    return (
        <div className="graphs">
            {/* Fiilisten jakauma */}
            <div className="pie-chart-container">
                <h3>Fiilisten jakauma</h3>
                <Pie data={moodData} /> {/* Näytetään fiiliskaavio */}
            </div>
            {/* Teemojen jakauma */}
            <div className="pie-chart-container">
                <h3>Teemojen jakauma</h3>
                <Pie data={themeData} /> {/* Näytetään teemakaavio */}
            </div>
        </div>
    );
};

export default MoodThemeGraph;

