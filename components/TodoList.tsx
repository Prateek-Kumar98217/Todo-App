// component to display the list of todos
"use client";

import React from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../types/Todo";
import { useTodo } from "../context/TodoContext"; // setting up context for todos, thus no need for use context
import { TodoInput } from "./TodoInput";
import { TodoFilters } from "./TodoFilter";

export function TodoList() {
  const { todos } = useTodo();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-100">Todo List</h1>
      <TodoInput />
      <div className="mt-6 space-y-4">
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todos.length === 0 && (
          <p className="text-center text-gray-400 italic">No todos yet. Add some to get started!</p>
        )}
      </div>
      <TodoFilters />
    </div>
  );
}
