/**
 * Todo service
 */

import { apiClient } from "./client";
import { TodoResponse, TodosResponse, MessageResponse, Todo } from "@/lib/types";

export const todoService = {
  /**
   * Get all todos
   */
  async getAll(): Promise<Todo[]> {
    const response = await apiClient.get<TodosResponse>("/todos");
    return response.data;
  },

  /**
   * Get single todo
   */
  async getById(id: number): Promise<Todo> {
    const response = await apiClient.get<TodoResponse>(`/todos/${id}`);
    return response.data;
  },

  /**
   * Create new todo
   */
  async create(title: string, description: string): Promise<Todo> {
    const response = await apiClient.post<TodoResponse>("/todos", {
      title,
      description,
    });
    return response.data;
  },

  /**
   * Update todo
   */
  async update(
    id: number,
    data: Partial<{ title: string; description: string; is_completed: boolean }>
  ): Promise<Todo> {
    const response = await apiClient.put<TodoResponse>(`/todos/${id}`, data);
    return response.data;
  },

  /**
   * Delete todo
   */
  async delete(id: number): Promise<MessageResponse> {
    return apiClient.delete<MessageResponse>(`/todos/${id}`);
  },
};
