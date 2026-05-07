// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item
interface TodoItem {
  id: string;
  text: string;
  status: TodoStatus;
  createdAt: Date;
  priority?: 'low' | 'medium' | 'high';
}

// TODO: Buat tipe untuk status To-Do (active/done)
type TodoStatus = 'active' | 'done';

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan
type TodoAction = (id: string) => void;
type AddTodoAction = (text: string) => void;
type SearchTodoAction = (query: string) => void;
