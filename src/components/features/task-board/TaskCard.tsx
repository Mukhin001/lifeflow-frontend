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
  ) => void;
  deleteTask: (id: string) => void;
};

const TaskCard = ({ task, editTask, deleteTask }: Props) => {
  const { notify } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate ?? "",
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

    editTask(task._id, editData.title, editData.description, editData.dueDate);

    editTask(task._id, editData.title, editData.description, editData.dueDate);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate?.split("T")[0] ?? "",
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
          <p>{task.dueDate}</p>
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
