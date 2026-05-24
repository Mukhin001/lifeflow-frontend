import { Task } from "@/src/api/task/task.types";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[] | undefined;
};

const TaskList = ({ tasks }: Props) => {
  return (
    <ul>
      {tasks?.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
