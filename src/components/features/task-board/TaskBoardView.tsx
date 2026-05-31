import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

type Props = {
  tasks: Task[] | undefined;
  addTask: (title: string, description: string, dueDate: string) => void;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
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
