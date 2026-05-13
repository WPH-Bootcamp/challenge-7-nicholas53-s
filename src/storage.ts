import fs from 'fs';
import path from 'path';
import { TodoList } from './types';
import { isTodoList } from './utils';

// Path file untuk menyimpan data To-Do
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'todos.json');

// Inisialisasi storage
export function initStorage(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf-8');
    console.log('📁 Storage diinisialisasi: data/todos.json dibuat');
  }
}

// kode untuk baca TODO dari file
export function readTodos(): TodoList {
  try {
    initStorage();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed: unknown = JSON.parse(raw);

    if (isTodoList(parsed)) {
      return parsed;
    }
    console.error('⚠️ Data di file tidak valid, mengembalikan array kosong');
    return [];
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Gagal membaca data: ${msg}, mengembalikan array kosong`);
    return [];
  }
}

// Kode simpan todo ke file
export function writeTodos(todos: TodoList): boolean {
  try {
    initStorage();
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Gagal menyimpan data: ${msg}`);
    return false;
  }
}
