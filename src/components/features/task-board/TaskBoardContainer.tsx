"use client";

import {
  useCreateTaskMutation,
  useGetTasksQuery,
} from "@/src/api/task/taskApi";
//import { useTaskBoard } from "./hooks/useTaskBoard";
import TaskBoardView from "./TaskBoardView";

const TaskBoardContainer = () => {
  // const { tasks, addTask } = useTaskBoard();
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();

  const handleCreateTask = async (title: string, description: string) => {
    try {
      await createTask({
        title,
        description,
      }).unwrap();
    } catch (error) {
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
      <TaskBoardView tasks={tasks} addTask={handleCreateTask} />
    </div>
  );
};

export default TaskBoardContainer;
