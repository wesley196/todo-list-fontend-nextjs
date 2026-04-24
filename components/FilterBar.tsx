/**
 * Filter bar - search + status dropdown
 */

"use client";

import { useState } from "react";

interface FilterBarProps {
  search: string;
  status: "all" | "pending" | "completed";
  onSearchChange: (search: string) => void;
  onStatusChange: (status: "all" | "pending" | "completed") => void;
  totalTodos: number;
  totalPages: number;
}

export function FilterBar({
  search,
  status,
  onSearchChange,
  onStatusChange,
  totalTodos,
  totalPages,
}: FilterBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusLabels = {
    all: "All Todos",
    pending: "Pending",
    completed: "Completed",
  };

  const statusColors = {
    all: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <div className="flex gap-4 items-center justify-between flex-wrap">
        {/* Search Input */}
        <div className="flex-1 min-w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search todos..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all flex items-center gap-2 ${statusColors[status]} border-current`}
          >
            {statusLabels[status]}
            <svg
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border-2 border-gray-200 z-10">
              {(["all", "pending", "completed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onStatusChange(s);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left font-medium transition-colors ${
                    s === status
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  } ${s === "all" ? "rounded-t-lg" : ""} ${s === "completed" ? "rounded-b-lg" : ""}`}
                >
                  {statusLabels[s]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="text-sm text-gray-600 font-medium">
          <span className="text-blue-600 font-bold">{totalTodos}</span> items • <span className="text-blue-600 font-bold">{totalPages}</span> page{totalPages > 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
