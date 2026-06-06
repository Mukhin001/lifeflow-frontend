import { useState } from "react";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import { useToast } from "../../ui/toast/useToast.hooks";
import Loader from "../../ui/loader/Loader";
import styles from "./task-card/css/task-card.module.css";

type Props = {
  isCreatingTask: boolean;
  onSubmit: (
    title: string,
    description: string,
    dueDate: string,
  ) => Promise<void>;
};

const TaskForm = ({ isCreatingTask, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { notify } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      notify("Название обязателено", "info");
      return;
    }
    if (!description.trim()) {
      notify("Описание обязателено", "info");
      return;
    }

    if (dueDate && Number.isNaN(Date.parse(dueDate))) {
      notify("Некорректная дата", "info");
      return;
    }

    if (title.length > 100) {
      notify("Максимум 100 символов", "info");
      return;
    }

    try {
      await onSubmit(title.trim(), description.trim(), dueDate);

      setTitle("");
      setDescription("");
      setDueDate("");
    } catch {}
  };

  return (
    <div className={styles.taskCard}>
      {isCreatingTask && <Loader overlay text="Создание задачи..." />}
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Название задачи"
          id="task-title"
          name="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Описание"
          id="task-description"
          name="task-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="date"
          id="task-date"
          name="task-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
        <Button type="submit" disabled={isCreatingTask}>
          {isCreatingTask ? "Создание..." : "Добавить задачу"}
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
