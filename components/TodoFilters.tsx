/**
 * TodoFilters component
 */

"use client";

import { Input } from "./Input";
import { Button } from "./Button";

interface TodoFiltersProps {
  search: string;
  status: "all" | "completed" | "pending";
  onSearchChange: (search: string) => void;
  onStatusChange: (status: "all" | "completed" | "pending") => void;
  onReset: () => void;
}

export function TodoFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onReset,
}: TodoFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Filters</h3>

      <Input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        label="Search"
      />

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Status
        </label>
        <div className="flex gap-3 flex-wrap">
          {(["all", "pending", "completed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                status === s
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <Button variant="secondary" onClick={onReset} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
}
