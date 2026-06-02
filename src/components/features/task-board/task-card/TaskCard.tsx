import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import { useState } from "react";
import TaskView from "./TaskView";
import TaskEditForm from "./TaskEditForm";
import style from "./css/task-card.module.css";

type Props = {
  task: Task;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => void;
};

const TaskCard = ({ task, editTask, deleteTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
      {isEditing ? (
        <TaskEditForm
          task={task}
          editTask={editTask}
          setIsEditing={() => setIsEditing(false)}
        />
      ) : (
        <TaskView
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </li>
  );
};

export default TaskCard;
