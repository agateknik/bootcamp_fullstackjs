export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export let todos: Todo[] = [
  { id: 1, title: "Belajar HTML", completed: true, createdAt: new Date() },
  { id: 2, title: "Belajar Hono", completed: false, createdAt: new Date() },
];
export let nextId = 3;

export function incrementTodoId() {
  return nextId++;
}
