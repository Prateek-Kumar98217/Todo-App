// using context to provide the todos to the components
// using localStorage to persist the todos
"use client";

import React, { useContext, createContext, useEffect, useState } from "react";
import { Todo, TodoFilter, TodoStats } from "../types/Todo";

interface TodoContextType {
  todos: Todo[];
  filter: TodoFilter;
  stats: TodoStats;
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: TodoFilter) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("all");

  //fetching the todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }))
      );
    }
  }, []);

  //adding the todos to localStorage when the todo state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos: Todo[]) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map((todo: Todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos: Todo[]) =>
      prevTodos.filter((todo: Todo) => todo.completed === false)
    );
  };

  const stats: TodoStats = {
    all: todos.length,
    active: todos.filter((todo: Todo) => !todo.completed).length,
    completed: todos.filter((todo: Todo) => todo.completed).length,
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        filter,
        stats,
        addTodo,
        deleteTodo,
        editTodo,
        toggleTodo,
        clearCompleted,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used inside a TodoProvider");
  }
  return context;
}
