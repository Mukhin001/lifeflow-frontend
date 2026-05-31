import { PriorityTask, UpdateTaskDto } from "@/src/api/task/task.types";

type Props = {
  taskId: string;
  value: string;
  editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
};

const TaskPrioritySelect = ({ taskId, value, editTask }: Props) => {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await editTask(taskId, {
      priority: e.target.value as PriorityTask,
    });
  };
  return (
    <select value={value} onChange={handleChange}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  );
};

export default TaskPrioritySelect;
