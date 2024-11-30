import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

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

type MoodThemeGraphProps = {
    entries: Entry[];
    themes: Theme[];
    graphType: 'moods' | 'themes';
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
    const totalEntries = entries.length;

    // Lasketaan fiilisten esiintymismäärät
    const moodCounts: Record<string, number> = {};
    entries.forEach((entry) => {
        entry.moods.forEach((mood) => {
            moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        });
    });

    // Lasketaan teemojen esiintymismäärät
    const themeCounts: Record<string, number> = {};
    entries.forEach((entry) => {
        entry.themes.forEach((theme) => {
            themeCounts[theme] = (themeCounts[theme] || 0) + 1;
        });
    });

    const moodData = {
        labels: Object.keys(moodCounts),
        datasets: [
            {
                data: Object.values(moodCounts).map((count) => (count / totalEntries) * 100),
                backgroundColor: ['#f39c12', '#27ae60', '#3498db', '#9b59b6', '#e74c3c', '#1abc9c', '#2ecc71', '#f1c40f'],
            },
        ],
    };

    const themeData = {
        labels: Object.keys(themeCounts),
        datasets: [
            {
                data: Object.values(themeCounts).map((count) => (count / totalEntries) * 100),
                backgroundColor: Object.keys(themeCounts).map(
                    (theme) => themes.find((t) => t.name === theme)?.color || '#cccccc'
                ),
            },
        ],
    };

    return (
        <div className="graphs">
            <div className="pie-chart-container">
                <h3>Fiilisten jakauma</h3>

                <Pie data={moodData} />
            </div>
            <div className="pie-chart-container">
                <h3>Teemojen jakauma</h3>

                <Pie data={themeData} />
            </div>
        </div>
    );
};

export default MoodThemeGraph;
