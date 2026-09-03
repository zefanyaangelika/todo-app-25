'use client';

import React from 'react';
import TodoItem from './TodoItem';
import type { Todo } from '@/types/todo';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Belum ada tugas.
      </div>
    );
  }

  return (
    <div>
      {/* Judul */}
      <h2 className="text-2xl font-bold text-gray-700 mb-5">
        Tugas Anda
      </h2>

      {/* List */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
          />
        ))}
      </ul>
    </div>
  );
}