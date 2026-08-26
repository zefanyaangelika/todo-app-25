import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/types/todo';

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (!todos || todos.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500">Belum ada tugas. Yuk, tambahkan tugas pertama!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Tugas Anda</h2>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}