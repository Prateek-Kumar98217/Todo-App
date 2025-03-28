"use client";

import { TodoList } from "@/components/TodoList";
import { TodoProvider } from "@/context/TodoContext";

export default function Home() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}
