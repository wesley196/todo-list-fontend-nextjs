/**
 * Simple Pagination component
 */

"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 items-center justify-center p-4">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg font-semibold border-2 border-gray-300 text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        ← Prev
      </button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg font-semibold border-2 transition-all ${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-900 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg font-semibold border-2 border-gray-300 text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Next →
      </button>
    </div>
  );
}
