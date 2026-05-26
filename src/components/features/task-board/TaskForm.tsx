import { useState } from "react";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import { useToast } from "../../ui/toast/useToast.hooks";

type Props = {
  onSubmit: (title: string, description: string) => void;
};

const TaskForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { notify } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      notify("Title обязателен", "info");
      return;
    }
    if (!description.trim()) {
      notify("Description обязателен", "info");
      return;
    }

    onSubmit(title, description);

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit">Добавить задачу</Button>
    </form>
  );
};

export default TaskForm;
