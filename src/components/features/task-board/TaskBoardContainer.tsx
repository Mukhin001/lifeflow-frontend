"use client";

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/src/api/task/taskApi";
import TaskBoardView from "./TaskBoardView";
import { useToast } from "../../ui/toast/useToast.hooks";
import { UpdateTaskDto } from "@/src/api/task/task.types";
import Button from "../../ui/button/Button";

const TaskBoardContainer = () => {
  const { data: tasks, isLoading, error, refetch } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
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
    }
  };

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
        editTask={handleEditTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskBoardContainer;
