import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import TaskCard from "./task-card/TaskCard";
import styles from "./task-card/css/task-card.module.css";

type Props = {
  tasks: Task[] | undefined;
  //editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => void;
  // isUpdatingTask: boolean;
  // isUpdateTaskError: boolean;
  // isUpdateTaskSuccess: boolean;
};

const TaskList = ({
  tasks,
  //editTask,
  deleteTask,
  // isUpdatingTask,
  // isUpdateTaskError,
  // isUpdateTaskSuccess,
}: Props) => {
  return (
    <ul className={styles.taskList}>
      {tasks?.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          //editTask={editTask}
          deleteTask={deleteTask}
          // isUpdatingTask={isUpdatingTask}
          // isUpdateTaskError={isUpdateTaskError}
          // isUpdateTaskSuccess={isUpdateTaskSuccess}
        />
      ))}
    </ul>
  );
};

export default TaskList;
