// component for filtering todos
"use client";

import React from "react";
import { useTodo } from "../context/TodoContext"; // setting up context for todos, thus no need for use context

export function TodoFilters() {
  const { filter, setFilter, stats, clearCompleted } = useTodo();

  return (
    <div className="mt-6 flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-gray-300">Tasks left: {stats.active}</span>
        {stats.completed > 0 && (
          <button
            onClick={clearCompleted}
            className="text-red-400 hover:text-red-300 transition-colors duration-200"
          >
            Clear Completed
          </button>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            filter === "active"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            filter === "completed"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
