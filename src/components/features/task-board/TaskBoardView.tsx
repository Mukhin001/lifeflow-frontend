import { Task } from "@/src/api/task/task.types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

type Props = {
  tasks: Task[] | undefined;
  addTask: (title: string, description: string, dueDate: string) => void;
  editTask: (
    id: string,
    title: string,
    description: string,
    dueDate: string,
    status: "todo" | "in-progress" | "done",
    priority: "low" | "medium" | "high",
  ) => void;
  deleteTask: (id: string) => void;
};

const TaskBoardView = ({ tasks, addTask, editTask, deleteTask }: Props) => {
  return (
    <>
      <TaskForm onSubmit={addTask} />

      <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
    </>
  );
};

export default TaskBoardView;
