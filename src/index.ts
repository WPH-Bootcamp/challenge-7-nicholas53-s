// TODO: Import readline untuk membaca input dari command line

// TODO: Import fungsi-fungsi dari todoService

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

// TODO: Jalankan fungsi main

import readline from 'readline';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  listTodos,
  searchTodos,
} from './todoService';
import { isTodo, validStringInput } from './utils';
import { pipeline } from 'stream';

// Set Up Readline Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk menampilkan menu utama
function showMenu(): void {
  console.log('\n----------------------------------');
  console.log('\n=== To-Do List App ===');
  console.log('\n---------------------------------');
  console.log('1. Add new todo');
  console.log('2. Mark todo as complete');
  console.log('3. Delete todo');
  console.log('4. List all todos');
  console.log('5. Search todos');
  console.log('6. Exit');
  console.log('\n----------------------------------');
}

//Fungsi untuk baca input user
function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

//Fungsi parseID
function parseId(input: string): number {
  const id = parseInt(input.trim(), 10);

  if (isNaN(id) || id <= 0) {
    throw new Error('ID harus berupa angka positif');
  }
  return id;
}

//Fungsi utama untuk menjalankan aplikasi
// looping menggunakan while loop

async function main(): Promise<void> {
  console.log('\n🚀 Selamat datang di Todo App TypeScript!');
  while (true) {
    showMenu();
    const choice = (await question('pilih menu (1-6): ')).trim();

    try {
      switch (choice) {
        // 1. Add new todo
        case '1': {
          const text = await question('Masukkan deskripsi todo: ');
          const newTodo = addTodo(text);

          console.log(`✅ Todo ditambahkan: ${newTodo.text}`);
          console.log(`ID: ${newTodo.id}`);
          console.log(`teks: ${newTodo.text}`);
          break;
        }

        // 2. Mark todo as complete
        case '2': {
          listTodos();
          const idInput = await question(
            'Masukkan ID todo yang ingin ditandai selesai: '
          );
          const id = parseId(idInput);
          const completedTodo = completeTodo(id);

          console.log(
            `✅ Todo "${completedTodo.text}" ditandai sebagai selesai`
          );
          break;
        }

        // 3. Delete todo
        case '3': {
          listTodos();
          const idInput = await question(
            'Masukkan ID todo yang ingin dihapus: '
          );
          const id = parseId(idInput);
          const success = deleteTodo(id);

          console.log(`✅ Todo dengan ID ${id} berhasil dihapus`);
          break;
        }

        // 4. List all todos
        case '4': {
          listTodos();
          break;
        }

        // 5. Search todos
        case '5': {
          const query = await question(
            'Masukkan kata kunci untuk mencari todo: '
          );

          const results = searchTodos(query);

          if (results.length === 0) {
            console.log(`🔍 Tidak ditemukan todo yang cocok dengan "${query}"`);
          } else {
            console.log(
              `🔍 Ditemukan ${results.length} todo yang cocok dengan "${query}":`
            );

            results.forEach((todo, index) => {
              const num = String(index + 1).padStart(2, '0');
              const status = todo.completed ? '✅' : '❌';
              console.log(`\n${num}. [${status}] ${todo.text}`);
            });

            console.log('\n----------------------------------');
          }
          break;
        }

        // 6. Exit
        case '6': {
          console.log(
            '\n👋 Terima kasih telah menggunakan Todo App. Sampai jumpa!\n'
          );
          rl.close();
          process.exit(0);
        }

        // 7 . Invalid input
        default: {
          console.log(
            `⚠️ Pilihan ${choice} tidak valid, silakan pilih menu antara 1-6`
          );
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error: ${msg}`);
    }
  }
}

// Jalankan fungsi main
main().catch((error) => {
  console.error('fatal error:', error);
  process.exit(1);
});
