import { Task } from "@/src/api/task/task.types";
import Button from "../../ui/button/Button";
import { useState } from "react";
import Input from "../../ui/input/Input";
import { useToast } from "../../ui/toast/useToast.hooks";

type Props = {
  task: Task;
  editTask: (
    id: string,
    title: string,
    description: string,
    dueDate: string,
    status: "todo" | "in-progress" | "done",
    priority: "low" | "medium" | "high",
  ) => void;
  deleteTask: (id: string) => void;
};

const TaskCard = ({ task, editTask, deleteTask }: Props) => {
  const { notify } = useToast();
  const [isEditing, setIsEditing] = useState(false);
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
      notify("Title обязателен", "info");
      return;
    }
    if (!editData.description.trim()) {
      notify("Description обязателен", "info");
      return;
    }

    editTask(
      task._id,
      editData.title,
      editData.description,
      editData.dueDate,
      editData.status,
      editData.priority,
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.split("T")[0] ?? "",
      status: task.status,
      priority: task.priority,
    });

    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <li>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span>{task.status}</span>
          <p>Статус: {task.status}</p>
          <p>Приоритет: {task.priority}</p>
          <p>Создано: {new Date(task.createdAt).toLocaleString("ru-RU")}</p>
          <p>До: {new Date(task.dueDate).toLocaleDateString("ru-RU")}</p>
          <Button onClick={() => deleteTask(task._id)}>удалить</Button>
          <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
        </li>
      ) : (
        <li>
          <form onSubmit={handleSubmit}>
            <Input
              value={editData.title}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <Input
              value={editData.description}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <Input
              type="date"
              value={editData.dueDate}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  dueDate: e.target.value,
                }))
              }
            />

            <select
              value={editData.status}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  status: e.target.value as "todo" | "in-progress" | "done",
                }))
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <select
              value={editData.priority}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  priority: e.target.value as "low" | "medium" | "high",
                }))
              }
            >
              <option value="low">Low</option>

              <option value="medium">Medium</option>

              <option value="high">High</option>
            </select>

            <Button type="submit">Сохранить</Button>
            <Button type="button" onClick={handleCancel}>
              Отмена
            </Button>
          </form>
        </li>
      )}
    </>
  );
};

export default TaskCard;
