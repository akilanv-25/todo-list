import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todos: { title: string; description: string; completed: boolean }[] = [];
  newTodo = { title: '', description: '' };
  editIndex: number | null = null;

  addTodo() {
    if (!this.newTodo.title.trim()) {
      alert('Title is required');
      return;
    }

    if (this.editIndex !== null) {
      this.todos[this.editIndex] = { ...this.newTodo, completed: false };
      this.editIndex = null;
    } else {
      this.todos.push({ ...this.newTodo, completed: false });
    }
    this.newTodo = { title: '', description: '' };
    this.saveToLocalStorage();
  }

  editTodo(index: number) {
    this.newTodo = { ...this.todos[index] };
    this.editIndex = index;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveToLocalStorage();
  }

  markAsCompleted(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadFromLocalStorage() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  ngOnInit() {
    this.loadFromLocalStorage();
  }
}
