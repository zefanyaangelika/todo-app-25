import ApiTodoList from './components/ApiTodoList';
import { getTasks } from '@/lib/tasks';

export default async function ApiTodosPage() {
  const result = await getTasks({
    limit: 10,
    skip: 0,
  });

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">

          {/* Header Halaman */}
          <header className="mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-dark-70 text-center">
              Todo List - Fetch Data
            </h1>

            <p className="text-sm text-gray-500 text-center mt-2">
              Data diambil dari DummyJSON API
            </p>
          </header>

          {/* Data Todo */}
          <ApiTodoList
            initialTasks={result.tasks}
          />

        </div>
      </div>
    </main>
  );
}