import Select from "@/src/components/ui/select/Select";

type Props = {
  label: { value: string; label: string };
  taskId: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

const TaskSelect = ({ label, taskId, value, options, onChange }: Props) => {
  return (
    <div>
      <label htmlFor={`${label.value}-${taskId}`}>{label.label}: </label>

      <Select
        id={`${label.value}-${taskId}`}
        name={`${label.value}-${taskId}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={`${taskId}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default TaskSelect;
