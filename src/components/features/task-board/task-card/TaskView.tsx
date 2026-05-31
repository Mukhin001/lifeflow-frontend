import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import Button from "@/src/components/ui/button/Button";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskPrioritySelect from "./TaskPrioritySelect";

type Props = {
  task: Task;
  onEdit: () => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
};

const TaskView = ({ task, onEdit, deleteTask, editTask }: Props) => {
  return (
    <>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span>{task.status}</span>
      <p>Статус: {task.status}</p>

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

      <p>Создано: {new Date(task.createdAt).toLocaleString("ru-RU")}</p>
      <p>
        До:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString("ru-RU")
          : "Не указано"}
      </p>
      <Button onClick={() => deleteTask(task._id)}>удалить</Button>
      <Button onClick={onEdit}>Редактировать</Button>
    </>
  );
};

export default TaskView;
