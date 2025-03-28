// component for individual todo item management
"use client";

import React, { useState } from "react";
import { Todo } from "../types/Todo";
import { useTodo } from "../context/TodoContext"; // setting up context for todos, thus no need for use context

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { toggleTodo, deleteTodo, editTodo } = useTodo();

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      editTodo(todo.id, editText.trim());
    }
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-sm hover:bg-gray-700 transition-colors duration-200">
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700"
        onChange={() => toggleTodo(todo.id)}
        checked={todo.completed}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          className="flex-1 bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <span 
          className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-100'}`}
          onDoubleClick={() => setEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <button 
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
      >
        Delete
      </button>
    </div>
  );
}
