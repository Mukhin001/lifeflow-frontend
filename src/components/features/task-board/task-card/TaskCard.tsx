import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import { useState } from "react";
import TaskView from "./TaskView";
import TaskEditForm from "./TaskEditForm";
import { useUpdateTaskMutation } from "@/src/api/task/taskApi";
import { useToast } from "@/src/components/ui/toast/useToast.hooks";

type Props = {
  task: Task;
  deleteTask: (id: string) => void;
};

const TaskCard = ({
  task,
  //editTask,
  deleteTask,
  // isUpdatingTask,
  // isUpdateTaskError,
  // isUpdateTaskSuccess,
}: Props) => {
  const { notify } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [updateTask, { isLoading, isError, isSuccess }] =
    useUpdateTaskMutation();

  const handleEditTask = async (id: string, data: UpdateTaskDto) => {
    try {
      await updateTask({
        id,
        data,
      }).unwrap();

      notify("Задача обновлена", "success");
    } catch (error) {
      notify("Ошибка обновления задачи", "error");
      console.error(error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <TaskEditForm
          task={task}
          editTask={handleEditTask}
          setIsEditing={() => setIsEditing(false)}
          isUpdatingTask={isLoading}
          isUpdateTaskError={isError}
          isUpdateTaskSuccess={isSuccess}
        />
      ) : (
        <TaskView
          task={task}
          editTask={handleEditTask}
          deleteTask={deleteTask}
          onEdit={() => setIsEditing(true)}
          isUpdatingTask={isLoading}
        />
      )}
    </li>
  );
};

export default TaskCard;
