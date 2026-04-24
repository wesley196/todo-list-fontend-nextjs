/**
 * TodoItem component
 */

"use client";

import { Todo } from "@/lib/types";
import { Button } from "./Button";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, isCompleted: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isDeleting?: boolean;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  isDeleting = false,
}: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await onToggle(todo.id, todo.is_completed);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      await onDelete(todo.id);
    }
  };

  return (
    <div className="flex items-start gap-4 p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={handleToggle}
        disabled={isUpdating}
        className="mt-1 cursor-pointer w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex-1 min-w-0">
        <h3
          className={`font-bold text-lg ${
            todo.is_completed
              ? "line-through text-gray-500"
              : "text-gray-900"
          }`}
        >
          {todo.title}
        </h3>
        <p className="text-gray-700 text-base mt-2">{todo.description}</p>
        <p className="text-gray-500 text-sm font-medium mt-3">
          📅 {new Date(todo.created_at).toLocaleDateString()}
        </p>
      </div>

      <Button
        onClick={handleDelete}
        variant="danger"
        disabled={isDeleting || isUpdating}
        className="whitespace-nowrap flex-shrink-0"
      >
        Delete
      </Button>
    </div>
  );
}
