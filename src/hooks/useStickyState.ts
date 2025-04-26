import { useState, useEffect } from 'react';

export const useStickyState = <T>(defaultValue: T, key:string) => {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        if (!stickyValue) return defaultValue;

        try {
            const item = JSON.parse(stickyValue);
            return item.value;
        } catch (e) {
            console.error('Failed to parse localStorage item', e);
            return defaultValue;
        }
    });

    useEffect(() => {
        const item = {
            value,
            timestamp: new Date().toISOString()
        };
        window.localStorage.setItem(key, JSON.stringify(item));
    }, [key, value]);

    return [value, setValue];
}