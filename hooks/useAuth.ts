/**
 * Auth hook - wrapper around AuthContext
 */

"use client";

import { useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  return useAuthContext();
}
