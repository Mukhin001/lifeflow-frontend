// import { useState } from "react";

// import { mockTasks } from "../model/mockTasks";
// import { Task } from "../model/types";

// export const useTaskBoard = () => {
//   const [tasks, setTasks] = useState<Task[]>(mockTasks);

//   const addTask = (title: string, description: string) => {
//     const newTask: Task = {
//       id: crypto.randomUUID(),

//       title,
//       description,

//       status: "todo",

//       priority: "medium",
//       userId: "1",
//       createdAt: new Date().toISOString(),
//     };

//     setTasks((prev) => [newTask, ...prev]);
//   };

//   return {
//     tasks,
//     addTask,
//   };
// };
