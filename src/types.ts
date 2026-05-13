// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// TODO: Buat tipe untuk status To-Do (active/done)
export type TodoStatus = 'active' | 'done';

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan
export type AddTodoFn = (text: string) => void;
export type CompleteTodoFn = (id: number) => void;
export type DeleteTodoFn = (id: number) => boolean;
export type ListTodoFn = () => void;
export type GetAllTodosFn = () => TodoList[];
export type SearchTodoFn = (query: string) => TodoList;

// Type Alias: Array of Todo
export type TodoList = Todo[];
