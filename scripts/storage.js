// storage.js - simple localStorage wrapper
export const KEY = 'finance:records';

export const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load from storage', err);
    return [];
  }
};

export const save = (data) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to storage', err);
  }
};
