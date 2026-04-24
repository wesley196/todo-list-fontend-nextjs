/**
 * TodoForm component for creating new todos
 */

"use client";

import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

interface TodoFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
  isLoading?: boolean;
}

export function TodoForm({ onSubmit, isLoading = false }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await onSubmit(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create todo";
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Create New Todo</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-900 rounded-lg border-2 border-red-400 font-medium">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          disabled={isLoading}
        />

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description (optional)"
            disabled={isLoading}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 resize-none"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full"
        >
          Create Todo
        </Button>
      </div>
    </form>
  );
}
