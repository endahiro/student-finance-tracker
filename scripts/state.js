// state.js - manage in-memory data + simple helpers
import { load, save } from './storage.js';

let records = load();

export function getAll() {
  return records.slice().sort((a,b) => new Date(b.date) - new Date(a.date));
}

export function addRecord(rec) {
  records.unshift(rec);
  save(records);
}

export function updateRecord(id, updated) {
  records = records.map(r => r.id === id ? { ...r, ...updated, updatedAt: new Date().toISOString() } : r);
  save(records);
}

export function deleteRecord(id) {
  records = records.filter(r => r.id !== id);
  save(records);
}

export function setRecords(arr) {
  records = arr;
  save(records);
}
