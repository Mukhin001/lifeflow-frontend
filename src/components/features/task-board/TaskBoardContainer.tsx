"use client";

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
} from "@/src/api/task/taskApi";
import TaskBoardView from "./TaskBoardView";
import { useToast } from "../../ui/toast/useToast.hooks";
import Button from "../../ui/button/Button";
import Loader from "../../ui/loader/Loader";

const TaskBoardContainer = () => {
  const { data: tasks, isLoading, error, refetch } = useGetTasksQuery();
  const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { notify } = useToast();
  console.log(tasks);

  const handleCreateTask = async (
    title: string,
    description: string,
    dueDate: string,
  ) => {
    try {
      await createTask({
        title,
        description,
        dueDate,
      }).unwrap();

      notify("Задача создана", "success");
    } catch (error) {
      notify("Ошибка создания задачи", "error");
      console.error(error);
      throw error;
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
    return <Loader overlay text="Загрузка задач..." />;
  }

  if (error && !tasks) {
    return (
      <div>
        Ошибка получения задач
        <Button onClick={refetch}>Попробовать снова</Button>
      </div>
    );
  }

  return (
    <div>
      <h2>Task Board Container</h2>
      <TaskBoardView
        tasks={tasks}
        addTask={handleCreateTask}
        isCreatingTask={isCreatingTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskBoardContainer;
