import { todoService, FetchTodosParams } from '@/services/todoService';
import { ApiTodo, TaskItem } from '@/types/api-todo';

export function formatApiTodoToTaskItem(apiTodo: ApiTodo): TaskItem {
  return {
    id: apiTodo.id,
    title: apiTodo.todo,
    completed: apiTodo.completed,
    userId: apiTodo.userId,
    source: 'dummyjson-api',
  };
}

export async function getTasks( params: FetchTodosParams = {}): Promise<{
  tasks: TaskItem[];
  total: number;
  limit: number;
  skip: number;
}> {
  try {
    const response = await todoService.fetchTodos(params);
    const tasks = response.todos.map(formatApiTodoToTaskItem);

    return {
      tasks,
      total: response.total,
      limit: response.limit,
      skip: response.skip,
    };
  } catch (error) {
    console.error('[lib/tasks.ts] Error mengambil tasks dari API:', error);
    throw error;
  }
}

export async function getTaskById(
  id: number | string
): Promise<TaskItem | null> {
  try {
    const response = await todoService.fetchTodoById(id);
    return formatApiTodoToTaskItem(response);
  } catch (error) {
    console.error(`[lib/tasks.ts] Error mengambil task ID ${id}:`, error);
    return null;
  }
}

export async function getTaskStats(tasks: TaskItem[]) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completionPercentage,
  };
}