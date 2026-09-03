'use client';

import React, { useState } from 'react';
import type { TaskItem } from '@/types/api-todo';
import { todoService } from '@/services/todoService';
import { Badge } from '@/app/components/ui/badge';

interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({
  initialTasks,
}: ApiTodoListProps) {
  const [tasks, setTasks] =
    useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (
    id: number,
    currentCompleted: boolean
  ) => {
    const targetStatus = !currentCompleted;

    // 1. Optimistic Update di State Lokal
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: targetStatus,
            }
          : task
      )
    );

    // 2. Simulasi Update ke DummyJSON
    try {
      await todoService.updateTodoStatus(
        id,
        targetStatus
      );
    } catch (error) {
      console.warn(
        'Simulasi update ke API DummyJSON gagal (fallback state):',
        error
      );
    }
  };

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-dark-70">
          Daftar Tugas
        </h2>

        <span className="text-xs bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {tasks.length} item
        </span>
      </div>

      {/* Empty State */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-muted text-sm">
              Tidak ada tugas.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() =>
                handleToggleTask(
                  task.id,
                  task.completed
                )
              }
              className={`group flex items-start sm:items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                task.completed
                  ? 'bg-success-10/20 border-success-20 hover:border-success-40'
                  : 'bg-white border-gray-100 hover:border-primary-70/40'
              }`}
            >

              {/* Kiri: Checkbox + Judul */}
              <div className="flex items-start sm:items-center gap-3.5 flex-1 pr-2">

                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mt-0.5 sm:mt-0 h-5 w-5 shrink-0 cursor-pointer accent-primary-70"
                />

                {/* Title */}
                <div>
                  <p
                    className={`text-xs md:text-sm font-medium leading-relaxed transition-all ${
                      task.completed
                        ? 'line-through text-gray-400'
                        : 'text-dark-70 group-hover:text-primary-100'
                    }`}
                  >
                    {task.title}
                  </p>

                  <p className="text-[10px] text-muted sm:hidden mt-1">
                    ID #{task.id} • User #{task.userId}
                  </p>
                </div>
              </div>

              {/* Badge */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">

                <Badge variant="purple" size="default">
                  ID: #{task.id}
                </Badge>

                <Badge variant="blue" size="default">
                  User: #{task.userId}
                </Badge>

                <Badge
                  variant={
                    task.completed
                      ? 'green'
                      : 'yellow'
                  }
                  size="default"
                >
                  {task.completed
                    ? 'Selesai'
                    : 'Pending'}
                </Badge>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}