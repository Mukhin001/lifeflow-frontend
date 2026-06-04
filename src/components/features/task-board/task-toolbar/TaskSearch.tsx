import styles from "./task-toolbar.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TaskSearch = ({ value, onChange }: Props) => {
  return (
    <div className={styles.search}>
      <label htmlFor="task-search" className={styles.label}>
        Поиск
      </label>

      <input
        id="task-search"
        name="task-search"
        type="text"
        placeholder="Название или описание..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default TaskSearch;
