import {
  PriorityTask,
  StatusTask,
  Task,
  UpdateTaskDto,
} from "@/src/api/task/task.types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { SortField, SortOrder } from "./task-toolbar/task-toolbar.types";
import { useMemo, useState } from "react";
import TaskToolbar from "./task-toolbar/TaskToolbar";

type Props = {
  tasks: Task[] | undefined;
  addTask: (title: string, description: string, dueDate: string) => void;
  //editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => void;
  // isUpdatingTask: boolean;
  // isUpdateTaskError: boolean;
  // isUpdateTaskSuccess: boolean;
};

const TaskBoardView = ({
  tasks,
  addTask,
  //editTask,
  deleteTask,
  // isUpdatingTask,
  // isUpdateTaskError,
  // isUpdateTaskSuccess,
}: Props) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    const query = search.toLowerCase().trim();

    if (!query) return tasks;

    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query),
    );
  }, [tasks, search]);

  const sortedTasks = useMemo(() => {
    if (!filteredTasks) return [];

    const copy = [...filteredTasks];

    const priorityOrder: Record<PriorityTask, number> = {
      low: 1,
      medium: 2,
      high: 3,
    };

    const statusOrder: Record<StatusTask, number> = {
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
  }, [filteredTasks, sortField, sortOrder]);

  return (
    <>
      <TaskForm onSubmit={addTask} />

      <TaskToolbar
        search={search}
        onSearchChange={setSearch}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortFieldChange={setSortField}
        onSortOrderChange={setSortOrder}
      />

      <TaskList
        tasks={sortedTasks}
        //editTask={editTask}
        deleteTask={deleteTask}
        // isUpdatingTask={isUpdatingTask}
        // isUpdateTaskError={isUpdateTaskError}
        // isUpdateTaskSuccess={isUpdateTaskSuccess}
      />
    </>
  );
};

export default TaskBoardView;
