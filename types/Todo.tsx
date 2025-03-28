export type TodoFilter = "all" | "active" | "completed";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface TodoStats {
  all: number;
  completed: number;
  active: number;
}
