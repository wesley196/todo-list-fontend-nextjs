/**
 * Todos hook for managing todos state with pagination and filtering
 */

"use client";

import { useCallback, useState, useMemo } from "react";
import { Todo, TodoFilters } from "@/lib/types";
import { todoService } from "@/lib/api/todoService";

interface UseTodosReturn {
  todos: Todo[];
  filteredTodos: Todo[];
  isLoading: boolean;
  error: string | null;
  filters: TodoFilters;
  currentPage: number;
  totalPages: number;
  totalTodos: number;

  // Actions
  fetchTodos: () => Promise<void>;
  createTodo: (title: string, description: string) => Promise<void>;
  updateTodo: (id: number, data: Partial<Omit<Todo, "id" | "created_at" | "updated_at">>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleComplete: (id: number, isCompleted: boolean) => Promise<void>;

  // Filtering & Pagination
  setSearch: (search: string) => void;
  setStatus: (status: "all" | "completed" | "pending") => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const ITEMS_PER_PAGE = 5;

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TodoFilters>({
    search: "",
    status: "all",
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  // Apply filters and search
  const filteredTodos = useMemo(() => {
    let result = [...todos];

    // Filter by status
    if (filters.status === "completed") {
      result = result.filter((t) => t.is_completed);
    } else if (filters.status === "pending") {
      result = result.filter((t) => !t.is_completed);
    }

    // Filter by search
    if (filters.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(searchLower) ||
          (t.description && t.description.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }, [todos, filters.search, filters.status]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTodos.length / (filters.limit || ITEMS_PER_PAGE));
  const currentPage = Math.max(1, Math.min(filters.page || 1, totalPages || 1));
  const startIdx = (currentPage - 1) * (filters.limit || ITEMS_PER_PAGE);
  const paginatedTodos = filteredTodos.slice(startIdx, startIdx + (filters.limit || ITEMS_PER_PAGE));

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await todoService.getAll();
      setTodos(data);
      // Reset to first page when fetching
      setFilters((prev) => ({ ...prev, page: 1 }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch todos";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTodo = useCallback(async (title: string, description: string) => {
    setError(null);
    try {
      const newTodo = await todoService.create(title, description);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create todo";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const updateTodo = useCallback(
    async (id: number, data: Partial<Omit<Todo, "id" | "created_at" | "updated_at">>) => {
      setError(null);
      try {
        const updated = await todoService.update(id, data);
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to update todo";
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const toggleComplete = useCallback(async (id: number, isCompleted: boolean) => {
    await updateTodo(id, { is_completed: !isCompleted });
  }, [updateTodo]);

  const deleteTodo = useCallback(async (id: number) => {
    setError(null);
    try {
      await todoService.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete todo";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const setStatus = useCallback((status: "all" | "completed" | "pending") => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ search: "", status: "all", page: 1, limit: ITEMS_PER_PAGE });
  }, []);

  return {
    todos: paginatedTodos, // Return paginated todos
    filteredTodos: paginatedTodos,
    isLoading,
    error,
    filters,
    currentPage,
    totalPages,
    totalTodos: filteredTodos.length,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    setSearch,
    setStatus,
    setPage,
    resetFilters,
  };
}
