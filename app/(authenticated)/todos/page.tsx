/**
 * Todos page
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTodos } from "@/hooks/useTodos";
import { TodoItem } from "@/components/TodoItem";
import { Pagination } from "@/components/Pagination";
import { FilterBar } from "@/components/FilterBar";
import { TodoModal } from "@/components/TodoModal";
import { Button } from "@/components/Button";
import { Alert } from "@/components/Alert";

export default function TodosPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const {
    todos,
    isLoading,
    error,
    fetchTodos,
    createTodo,
    deleteTodo,
    toggleComplete,
    filters,
    currentPage,
    totalPages,
    totalTodos,
    setSearch,
    setStatus,
    setPage,
  } = useTodos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatingTodo, setCreatingTodo] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleCreateTodo = async (title: string, description: string) => {
    setCreatingTodo(true);
    try {
      await createTodo(title, description);
      setAlertMessage("Todo created successfully!");
      setTimeout(() => setAlertMessage(null), 3000);
    } catch (err) {
      // Error already shown by hook
    } finally {
      setCreatingTodo(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteTodo(id);
      setAlertMessage("Todo deleted successfully!");
      setTimeout(() => setAlertMessage(null), 3000);
    } catch (err) {
      // Error already shown
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Todos</h1>
            {user && (
              <p className="text-gray-600 text-sm mt-1">
                Welcome back, <span className="font-bold text-blue-600">{user.name}</span>!
              </p>
            )}
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Alerts */}
        {alertMessage && (
          <Alert
            message={alertMessage}
            type="success"
            onDismiss={() => setAlertMessage(null)}
          />
        )}

        {error && (
          <Alert message={error} type="error" onDismiss={() => {}} />
        )}

        {/* Top Bar - Button + Filter */}
        <div className="flex gap-4 items-center justify-between flex-wrap">
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Todo
          </Button>

          <FilterBar
            search={filters.search || ""}
            status={filters.status || "all"}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            totalTodos={totalTodos}
            totalPages={totalPages}
          />
        </div>

        {/* Todos List */}
        <div className="space-y-3">
          {isLoading && (
            <div className="flex items-center justify-center p-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">Loading todos...</p>
            </div>
          )}

          {!isLoading && todos.length === 0 && (
            <div className="flex items-center justify-center p-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">
                {filters.search || filters.status !== "all"
                  ? "No todos match your filters"
                  : "No todos yet. Create one to get started!"}
              </p>
            </div>
          )}

          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleComplete}
              onDelete={handleDeleteTodo}
              isDeleting={deletingId === todo.id}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </main>

      {/* Modal */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTodo}
        isLoading={creatingTodo}
      />
    </div>
  );
}
