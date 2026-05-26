import { Task } from "@/src/api/task/task.types";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[] | undefined;
  deleteTask: (id: string) => void;
};

const TaskList = ({ tasks, deleteTask }: Props) => {
  return (
    <ul>
      {tasks?.map((task) => (
        <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
};

export default TaskList;
