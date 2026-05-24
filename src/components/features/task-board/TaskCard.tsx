import { Task } from "./model/types";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <li>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <span>{task.status}</span>
    </li>
  );
};

export default TaskCard;
