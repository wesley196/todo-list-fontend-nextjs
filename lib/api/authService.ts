/**
 * Authentication service
 */

import { apiClient } from "./client";
import { AuthResponse, MessageResponse, User } from "@/lib/types";

export const authService = {
  /**
   * Register a new user
   */
  async register(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  },

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/login", { email, password });
  },

  /**
   * Get current authenticated user
   */
  async getMe(): Promise<User> {
    return apiClient.get<User>("/auth/me");
  },

  /**
   * Logout user
   */
  async logout(): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>("/auth/logout");
  },
};
