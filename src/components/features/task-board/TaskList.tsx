import { Task } from "@/src/api/task/task.types";
import TaskCard from "./task-card/TaskCard";
import styles from "./task-card/css/task-card.module.css";

type Props = {
  tasks: Task[] | undefined;
  deleteTask: (id: string) => void;
};

const TaskList = ({ tasks, deleteTask }: Props) => {
  return (
    <ul className={styles.taskList}>
      {tasks?.map((task) => (
        <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
};

export default TaskList;
