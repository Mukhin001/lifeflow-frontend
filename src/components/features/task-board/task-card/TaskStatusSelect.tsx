import { StatusTask, UpdateTaskDto } from "@/src/api/task/task.types";

type Props = {
  taskId: string;
  value: string;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
};

const TaskStatusSelect = ({ taskId, value, editTask }: Props) => {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await editTask(taskId, {
      status: e.target.value as StatusTask,
    });
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </select>
  );
};

export default TaskStatusSelect;
