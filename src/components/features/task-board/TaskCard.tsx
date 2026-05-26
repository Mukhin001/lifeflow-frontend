import { Task } from "@/src/api/task/task.types";
import Button from "../../ui/button/Button";

type Props = {
  task: Task;
  deleteTask: (id: string) => void;
};

const TaskCard = ({ task, deleteTask }: Props) => {
  return (
    <li>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <span>{task.status}</span>
      <Button onClick={() => deleteTask(task._id)}>удалить</Button>
    </li>
  );
};

export default TaskCard;
