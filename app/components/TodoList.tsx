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
    <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center">
      <p className="text-gray-500">
        Belum ada tugas.
      </p>
      <p className="text-gray-400 text-sm mt-2">
        Tambahkan tugas baru di atas untuk memulai!
      </p>
    </div>
  );
}

  return (
    <div>
    {/* Judul */}
     <div className="flex items-center justify-between mb-5">
     <h2 className="text-lg font-semibold text-gray-700">
        Daftar Tugas
      </h2>

    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
      {todos.length} item
    </span>
  </div>

  {/* List */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}