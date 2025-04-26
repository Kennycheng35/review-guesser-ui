import { DateTime } from 'luxon';

export const resetLocalStorage = (keysToReset:string[]): void => {
    const lastResetDate = localStorage.getItem('lastResetDate');
    const today = DateTime.local().toFormat('yyyy-MM-dd');
    if (lastResetDate !== today) {
      keysToReset.forEach(key => localStorage.removeItem(key));
      localStorage.setItem('lastResetDate', today);
    }
}