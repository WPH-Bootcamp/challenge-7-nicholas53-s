// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid

//Type guard: satu Todo

import { Todo, TodoList } from './types';

export function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === 'number' &&
    typeof obj.text === 'string' &&
    typeof obj.completed === 'boolean'
  );
}

//Type guard: array of Todo

export function isTodoList(value: unknown): value is TodoList {
  if (!Array.isArray(value)) return false;
  return value.every(isTodo);
}

// Validasi Input User - 3 lapis pengecekan

export function validStringInput(
  input: unknown,
  fieldName: string = 'string',
  maxLenght: number = 200
): string {
  // Lapis 1 harus berupa string
  if (typeof input !== 'string') {
    throw new Error(`${fieldName} harus berupa teks`);
  }

  //Lapis 2 tidak boleh kosong setelah di-trim
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new Error(`${fieldName} tidak boleh kosong`);
  }

  //Lapis 3 batas panjang input
  if (trimmed.length > maxLenght) {
    throw new Error(
      `${fieldName} Terlalu Panjang (maksimal ${maxLenght} karakter)`
    );
  }

  return trimmed;
}

//Helper Functions

// Generate ID
export function generateId(todos: TodoList): number {
  if (todos.length === 0) return 1;
  return Math.max(...todos.map((t: Todo) => t.id)) + 1;
}

//Format Date
export function formatDate(IsoString: string): string {
  const date = new Date(IsoString);

  if (isNaN(date.getTime())) {
    return 'Tanggal tidak valid';
  }

  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
