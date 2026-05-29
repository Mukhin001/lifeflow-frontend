export type StatusTask = "todo" | "in-progress" | "done";
export type PriorityTask = "low" | "medium" | "high";

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: StatusTask;
  priority?: PriorityTask;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: StatusTask;
  priority: PriorityTask;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
}

export interface UpdateTaskRequest {
  id: string;
  data: UpdateTaskDto;
}
