export type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  dueDate: string;
};
