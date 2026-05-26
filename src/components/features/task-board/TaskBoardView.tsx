import { Task } from "@/src/api/task/task.types";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

type Props = {
  tasks: Task[] | undefined;
  addTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
};

const TaskBoardView = ({ tasks, addTask, deleteTask }: Props) => {
  return (
    <>
      <TaskForm onSubmit={addTask} />

      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </>
  );
};

export default TaskBoardView;
