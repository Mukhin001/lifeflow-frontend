import { Task } from "@/src/api/task/task.types";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[] | undefined;
  editTask: (
    id: string,
    title: string,
    description: string,
    dueDate: string,
  ) => void;
  deleteTask: (id: string) => void;
};

const TaskList = ({ tasks, editTask, deleteTask }: Props) => {
  return (
    <ul>
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
