/**
 * User type
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Todo item type
 */
export interface Todo {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * API Error response
 */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Auth response from API
 */
export interface AuthResponse {
  user: User;
  access_token: string;
  token_type: string;
}

/**
 * Todos list response
 */
export interface TodosResponse {
  data: Todo[];
}

/**
 * Single todo response
 */
export interface TodoResponse {
  data: Todo;
}

/**
 * Generic message response
 */
export interface MessageResponse {
  message: string;
}

/**
 * Pagination filters for todos
 */
export interface TodoFilters {
  search?: string;
  status?: "all" | "completed" | "pending";
  page?: number;
  limit?: number;
}

/**
 * Pagination state
 */
export interface PaginationState {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
}

/**
 * Todos state for local management
 */
export interface TodosState {
  items: Todo[];
  filters: TodoFilters;
  pagination: PaginationState;
  isLoading: boolean;
  error: string | null;
}

