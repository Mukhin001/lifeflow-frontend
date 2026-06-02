import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { SortField, SortOrder } from "./task-toolbar/task-toolbar.types";
import { useMemo, useState } from "react";
import TaskToolbar from "./task-toolbar/TaskToolbar";

type Props = {
  tasks: Task[] | undefined;
  addTask: (title: string, description: string, dueDate: string) => void;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => void;
};

const TaskBoardView = ({ tasks, addTask, editTask, deleteTask }: Props) => {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedTasks = useMemo(() => {
    if (!tasks) return [];

    const copy = [...tasks];

    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1,
    };

    const statusOrder = {
      todo: 1,
      "in-progress": 2,
      done: 3,
    };

    copy.sort((a, b) => {
      let result = 0;

      switch (sortField) {
        case "date":
          result =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;

        case "priority":
          result = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;

        case "status":
          result = statusOrder[a.status] - statusOrder[b.status];
          break;
      }

      return sortOrder === "asc" ? result : -result;
    });

    return copy;
  }, [tasks, sortField, sortOrder]);

  return (
    <>
      <TaskForm onSubmit={addTask} />

      <TaskToolbar
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={setSortField}
        onSortOrderChange={setSortOrder}
      />

      <TaskList
        tasks={sortedTasks}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </>
  );
};

export default TaskBoardView;
