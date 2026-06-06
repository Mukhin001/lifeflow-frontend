import {
  PriorityTask,
  StatusTask,
  Task,
  UpdateTaskDto,
} from "@/src/api/task/task.types";
import Button from "@/src/components/ui/button/Button";
import styles from "./css/task-card.module.css";
import TaskSelect from "./TaskSelect";
import Loader from "@/src/components/ui/loader/Loader";
import { useUpdateTaskMutation } from "@/src/api/task/taskApi";
import { useToast } from "@/src/components/ui/toast/useToast.hooks";

type Props = {
  task: Task;
  onEdit: () => void;
  deleteTask: (id: string) => void;
};

const TaskView = ({ task, onEdit, deleteTask }: Props) => {
  const { notify } = useToast();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

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
    <div className={styles.taskCard}>
      {isLoading && <Loader overlay text="Обновление задачи..." />}
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

      <TaskSelect
        label={{ value: "status", label: "Статус" }}
        taskId={task._id}
        value={task.status}
        options={[
          { value: "todo", label: "Todo" },
          { value: "in-progress", label: "In Progress" },
          { value: "done", label: "Done" },
        ]}
        onChange={async (value) => {
          await handleEditTask(task._id, {
            status: value as StatusTask,
          });
        }}
      />

      <TaskSelect
        label={{ value: "priority", label: "Приоритет" }}
        taskId={task._id}
        value={task.priority}
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
        onChange={async (value) => {
          await handleEditTask(task._id, {
            priority: value as PriorityTask,
          });
        }}
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
