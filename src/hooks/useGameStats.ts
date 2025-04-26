import { useState, useEffect } from 'react';

const GAME_STATS_KEY = 'gameStats';

type GameStats = {
    gamesPlayed: number,
    winPercent: number,
    currentStreak: number,
    maxStreak: number,
    distribution: number[]
};

const defaultStats: GameStats = {
    gamesPlayed: 0,
    winPercent: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: [0, 0, 0, 0, 0]
};

export const useGameStats = () => {

    const [stats, setStats] = useState<GameStats>(() => {
        try {
          const stored = localStorage.getItem(GAME_STATS_KEY);
          return stored ? JSON.parse(stored) : defaultStats;
        } catch (err) {
          console.error('Error parsing localStorage game stats:', err);
          return defaultStats;
        }
    });

    useEffect(() => {
        const storedStats = localStorage.getItem(GAME_STATS_KEY);
        if (storedStats) {
          try {
            setStats(JSON.parse(storedStats));
          } catch (e) {
            console.error('Failed to parse game stats:', e);
          }
        }
      }, []);
    
    useEffect(() => {
        localStorage.setItem(GAME_STATS_KEY, JSON.stringify(stats));
    }, [stats]);

    const updateStats = (key: keyof GameStats, value: number | number[]) => {
        setStats(prev => ({
          ...prev,
          [key]: value,
        }));
    };

    return { stats, updateStats, setStats };
}
  