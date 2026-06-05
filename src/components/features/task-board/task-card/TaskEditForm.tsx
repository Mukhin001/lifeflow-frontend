import {
  PriorityTask,
  StatusTask,
  Task,
  UpdateTaskDto,
} from "@/src/api/task/task.types";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/Input";
import { useToast } from "@/src/components/ui/toast/useToast.hooks";
import { useState } from "react";
import TaskSelect from "./TaskSelect";
import Loader from "@/src/components/ui/loader/Loader";
import { useUpdateTaskMutation } from "@/src/api/task/taskApi";

type Props = {
  task: Task;
  setIsEditing: () => void;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
  isUpdatingTask: boolean;
  isUpdateTaskError: boolean;
  isUpdateTaskSuccess: boolean;
};

const TaskEditForm = ({ task, editTask, setIsEditing }: Props) => {
  const { notify } = useToast();
  const [updateTask, { isLoading, isError, isSuccess }] =
    useUpdateTaskMutation();

  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate?.split("T")[0] ?? "",
    status: task.status,
    priority: task.priority,
  });

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!editData.title.trim()) {
      notify("Название обязателено", "info");
      return;
    }
    if (!editData.description.trim()) {
      notify("Описание обязателено", "info");
      return;
    }

    if (editData.dueDate && Number.isNaN(Date.parse(editData.dueDate))) {
      notify("Некорректная дата", "info");
      return;
    }

    if (editData.title.length > 100) {
      notify("Максимум 100 символов", "info");
      return;
    }

    try {
      await editTask(task._id, editData);
      setIsEditing();
      notify("Задача обновленна", "success");
    } catch (e) {
      notify("Ошибка сохранения задачи", "error");
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.split("T")[0] ?? "",
      status: task.status,
      priority: task.priority,
    });

    setIsEditing();
  };

  return (
    <>
      {isLoading && <Loader overlay text="Сохраняем..." />}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={editData.title}
          id="task-edit-title"
          name="task-edit-title"
          onChange={(e) =>
            setEditData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
        <Input
          type="text"
          value={editData.description}
          id="task-edit-description"
          name="task-edit-description"
          onChange={(e) =>
            setEditData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <Input
          type="date"
          id="task-edit-dueDate"
          name="task-edit-dueDate"
          value={editData.dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setEditData((prev) => ({
              ...prev,
              dueDate: e.target.value,
            }))
          }
        />

        <TaskSelect
          label={{ value: "status", label: "Статус" }}
          taskId={task._id}
          value={editData.status}
          options={[
            { value: "todo", label: "Todo" },
            { value: "in-progress", label: "In Progress" },
            { value: "done", label: "Done" },
          ]}
          onChange={(value) =>
            setEditData((prev) => ({
              ...prev,
              status: value as StatusTask,
            }))
          }
        />

        <p>Приоритет: {editData.priority}</p>
        <TaskSelect
          label={{ value: "priority", label: "Приоритет" }}
          taskId={task._id}
          value={editData.priority}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          onChange={(value) =>
            setEditData((prev) => ({
              ...prev,
              priority: value as PriorityTask,
            }))
          }
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Сохранение..." : "Сохранить"}
        </Button>
        <Button type="button" disabled={isLoading} onClick={handleCancel}>
          Отмена
        </Button>
      </form>
    </>
  );
};

export default TaskEditForm;
