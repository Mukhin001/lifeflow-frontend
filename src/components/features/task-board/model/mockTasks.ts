import { Task } from "./types";

export const mockTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Изучить RTK Query",
    description: "Разобраться с cache invalidation",

    status: "todo",

    priority: "high",
    userId: "1",
    createdAt: new Date().toISOString(),
  },
];
