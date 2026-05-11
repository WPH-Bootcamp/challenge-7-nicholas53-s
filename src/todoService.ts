import { Todo, TodoList } from './types';
import { readTodos, writeTodos } from './storage';
import { generateId, validStringInput } from './utils';

//Add TODO
export function addTodo(text: string): Todo {
  const validText = validStringInput(text, 'Todo Text');

  const todos = readTodos();

  const newTodo: Todo = {
    id: generateId(todos),
    text: validText,
    completed: false,
  };

  todos.push(newTodo);
  const saved = writeTodos(todos);
  if (!saved) {
    throw new Error('Gagal menyimpan data, coba lagi');
  }

  return newTodo;
}

// Complete TODO
export function completeTodo(id: number): Todo {
  const todos = readTodos();

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    throw new Error(`todo dengan id ${id} tidak ditemukan`);
  }

  if (todo.completed) {
    throw new Error(`Todo "${todo.text}" sudah ditandai sebagai selesai`);
  }

  todo.completed = true;

  const saved = writeTodos(todos);
  if (!saved) {
    throw new Error('Gagal menyimpan data, coba lagi');
  }

  return todo;
}

// Delete TODO
export function deleteTodo(id: number): boolean {
  const todos: TodoList = readTodos();
  const initialLength = todos.length;

  const filtered = todos.filter((t) => t.id !== id);

  if (filtered.length === initialLength) {
    throw new Error(`Todo dengan id ${id} tidak ditemukan`);
  }
  const saved = writeTodos(filtered);
  if (!saved) {
    throw new Error('Gagal menyimpan data, coba lagi');
  }
  return true;
}

// List Todos
export function listTodos(): void {
  const todos: TodoList = readTodos();

  if (todos.length === 0) {
    console.log(`bellum ada Todo, tambahkan todo pertama!`);
    return;
  }

  console.log('\n————————————————————————————————————————————————————');

  todos.forEach((todo, index) => {
    const num = String(index + 1).padStart(2, '0');
    const status = todo.completed ? '[--DONE--]' : '[-ACTIVE-]';

    console.log(`${status} ${num}. ${todo.text}`);
  });

  console.log('————————————————————————————————————————————————————\n');
}

//Search TODO

export function searchTodos(keyword: string): TodoList {
  const validKeyword = validStringInput(keyword, 'Keyword Pencarian');
  const todos: TodoList = readTodos();

  const lowerKeyword = validKeyword.toLowerCase();
  return todos.filter((todo) => todo.text.toLowerCase().includes(lowerKeyword));
}

export function getAllTodos(): TodoList {
  return readTodos();
}
