/**
 * Modal component for creating and editing todos
 */

"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/lib/types";
import { Input } from "./Input";
import { Button } from "./Button";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => Promise<void>;
  isLoading?: boolean;
  todo?: Todo;
}

export function TodoModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  todo,
}: TodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!todo;

  useEffect(() => {
    if (isOpen) {
      setTitle(todo?.title ?? "");
      setDescription(todo?.description ?? "");
      setError(null);
    }
  }, [isOpen, todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await onSubmit(title.trim(), description.trim());
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : isEditing ? "Failed to update todo" : "Failed to create todo";
      setError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Todo" : "Create New Todo"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-lg border border-red-300 text-sm font-medium">
              {error}
            </div>
          )}

          <Input
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you want to do?"
            disabled={isLoading}
            autoFocus
          />

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 resize-none"
              rows={3}
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="flex-1"
            >
              {isEditing ? "Save" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
