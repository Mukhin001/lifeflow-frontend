"use client";

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
} from "@/src/api/task/taskApi";
import TaskBoardView from "./TaskBoardView";
import { useToast } from "../../ui/toast/useToast.hooks";

const TaskBoardContainer = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { notify } = useToast();

  const handleCreateTask = async (title: string, description: string) => {
    try {
      await createTask({
        title,
        description,
      }).unwrap();

      notify("Задача создана", "success");
    } catch (error) {
      notify("Ошибка создания задачи", "error");
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id).unwrap();

      notify("Задача удалена", "success");
    } catch (error) {
      notify("Ошибка удаления задачи", "error");
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки задач</div>;
  }

  return (
    <div>
      <h2>Task Board Container</h2>
      <TaskBoardView
        tasks={tasks}
        addTask={handleCreateTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskBoardContainer;
