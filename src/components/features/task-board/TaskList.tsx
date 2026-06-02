import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import TaskCard from "./task-card/TaskCard";
import styles from "./task-card/css/task-card.module.css";

type Props = {
  tasks: Task[] | undefined;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => void;
};

const TaskList = ({ tasks, editTask, deleteTask }: Props) => {
  return (
    <ul className={styles.taskList}>
      {tasks?.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
