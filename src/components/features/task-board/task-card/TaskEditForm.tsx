import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/Input";
import { useToast } from "@/src/components/ui/toast/useToast.hooks";
import { useState } from "react";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskPrioritySelect from "./TaskPrioritySelect";

type Props = {
  task: Task;
  setIsEditing: () => void;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
};

const TaskEditForm = ({ task, editTask, setIsEditing }: Props) => {
  const { notify } = useToast();

  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate?.split("T")[0] ?? "",
    status: task.status,
    priority: task.priority,
  });

  const handleSubmit = (e: React.FormEvent) => {
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

    editTask(task._id, editData);

    setIsEditing();
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

      <TaskStatusSelect
        taskId={task._id}
        value={task.status}
        editTask={editTask}
      />

      <p>Приоритет: {task.priority}</p>
      <TaskPrioritySelect
        taskId={task._id}
        value={task.priority}
        editTask={editTask}
      />

      <Button type="submit">Сохранить</Button>
      <Button type="button" onClick={handleCancel}>
        Отмена
      </Button>
    </form>
  );
};

export default TaskEditForm;
