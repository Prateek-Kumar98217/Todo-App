// component for entering new todos
"use client";

import React, { useState } from "react";
import { useTodo } from "../context/TodoContext"; // setting up context for todos, thus no need for use context

export function TodoInput() {
  const [text, setText] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = () => {
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-4">
      <input
        className="flex-1 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done"
      />
      <button 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        Add Todo
      </button>
    </div>
  );
}
