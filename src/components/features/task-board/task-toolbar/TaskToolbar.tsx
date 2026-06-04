import { SortField, SortOrder } from "./task-toolbar.types";
import styles from "./task-toolbar.module.css";
import TaskSearch from "./TaskSearch";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (value: SortField) => void;
  onSortOrderChange: (value: SortOrder) => void;
};

const TaskToolbar = ({
  search,
  onSearchChange,
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}: Props) => {
  return (
    <div className={styles.toolbar}>
      <TaskSearch value={search} onChange={onSearchChange} />
      <div className={styles.group}>
        <label>Сортировка</label>

        <select
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value as SortField)}
        >
          <option value="date">Дата</option>
          <option value="priority">Приоритет</option>
          <option value="status">Статус</option>
        </select>
      </div>

      <div className={styles.group}>
        <label>Порядок</label>

        <select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
        >
          <option value="desc">По убыванию</option>
          <option value="asc">По возрастанию</option>
        </select>
      </div>
    </div>
  );
};

export default TaskToolbar;
