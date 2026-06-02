import { Task, UpdateTaskDto } from "@/src/api/task/task.types";
import Button from "@/src/components/ui/button/Button";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskPrioritySelect from "./TaskPrioritySelect";
import styles from "./css/task-card.module.css";

type Props = {
  task: Task;
  onEdit: () => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
};

const TaskView = ({ task, onEdit, deleteTask, editTask }: Props) => {
  return (
    <div className={styles.taskCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>

        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles[`status${task.status}`]}`}>
            {task.status + "  "}
          </span>

          <span
            className={`${styles.badge} ${styles[`priority${task.priority}`]}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <p className={styles.description}>{task.description}</p>

      <TaskStatusSelect
        taskId={task._id}
        value={task.status}
        editTask={editTask}
      />

      <TaskPrioritySelect
        taskId={task._id}
        value={task.priority}
        editTask={editTask}
      />

      <div className={styles.meta}>
        <span>
          📅 Создано: {new Date(task.createdAt).toLocaleString("ru-RU")}
        </span>

        <span>
          ⏳ Срок:{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("ru-RU")
            : "Не указан"}
        </span>
      </div>

      <div className={styles.actions}>
        <Button onClick={onEdit}>Редактировать</Button>

        <Button onClick={() => deleteTask(task._id)}>Удалить</Button>
      </div>
    </div>
  );
};

export default TaskView;
