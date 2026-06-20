import { Task } from "@/src/api/task/task.types";
import { useState } from "react";
import TaskView from "./TaskView";
import TaskEditForm from "./TaskEditForm";

type Props = {
  task: Task;
  deleteTask: (id: string) => void;
};

const TaskCard = ({ task, deleteTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  console.count("TaskCard");

  return (
    <li>
      {isEditing ? (
        <TaskEditForm task={task} setIsEditing={() => setIsEditing(false)} />
      ) : (
        <TaskView
          task={task}
          deleteTask={deleteTask}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </li>
  );
};

export default TaskCard;
