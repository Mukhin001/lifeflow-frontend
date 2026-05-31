// import {
//   PriorityTask,
//   StatusTask,
//   Task,
//   UpdateTaskDto,
// } from "@/src/api/task/task.types";
// import Button from "../../ui/button/Button";
// import { useState } from "react";
// import Input from "../../ui/input/Input";
// import { useToast } from "../../ui/toast/useToast.hooks";

// type Props = {
//   task: Task;
//   editTask: (id: string, data: UpdateTaskDto) => Promise<void>;
//   deleteTask: (id: string) => void;
// };

// const TaskCard = ({ task, editTask, deleteTask }: Props) => {
//   const { notify } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     title: task.title,
//     description: task.description,
//     dueDate: task.dueDate?.split("T")[0] ?? "",
//     status: task.status,
//     priority: task.priority,
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!editData.title.trim()) {
//       notify("Название обязателено", "info");
//       return;
//     }
//     if (!editData.description.trim()) {
//       notify("Описание обязателено", "info");
//       return;
//     }

//     if (editData.dueDate && Number.isNaN(Date.parse(editData.dueDate))) {
//       notify("Некорректная дата", "info");
//       return;
//     }

//     editTask(task._id, editData);

//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditData({
//       title: task.title,
//       description: task.description,
//       dueDate: task.dueDate?.split("T")[0] ?? "",
//       status: task.status,
//       priority: task.priority,
//     });

//     setIsEditing(false);
//   };

//   const updateField = async (data: UpdateTaskDto) => {
//     try {
//       await editTask(task._id, data);

//       setEditData((prev) => ({
//         ...prev,
//         ...data,
//       }));
//     } catch (error) {
//       notify("Ошибка обновления", "error");
//     }
//   };

//   return (
//     <>
//       {!isEditing ? (
//         <li>
//           <h3>{task.title}</h3>
//           <p>{task.description}</p>
//           <span>{task.status}</span>
//           <p>Статус: {task.status}</p>

//           <select
//             value={editData.status}
//             onChange={(e) => {
//               updateField({
//                 status: e.target.value as StatusTask,
//               });
//             }}
//           >
//             <option value="todo">Todo</option>
//             <option value="in-progress">In Progress</option>
//             <option value="done">Done</option>
//           </select>

//           <p>Приоритет: {task.priority}</p>
//           <select
//             value={editData.priority}
//             onChange={(e) => {
//               updateField({
//                 priority: e.target.value as PriorityTask,
//               });
//             }}
//           >
//             <option value="low">Low</option>

//             <option value="medium">Medium</option>

//             <option value="high">High</option>
//           </select>
//           <p>Создано: {new Date(task.createdAt).toLocaleString("ru-RU")}</p>
//           <p>
//             До:{" "}
//             {task.dueDate
//               ? new Date(task.dueDate).toLocaleDateString("ru-RU")
//               : "Не указано"}
//           </p>
//           <Button onClick={() => deleteTask(task._id)}>удалить</Button>
//           <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
//         </li>
//       ) : (
//         <li>
//           <form onSubmit={handleSubmit}>
//             <Input
//               type="text"
//               value={editData.title}
//               id="task-edit-title"
//               name="task-edit-title"
//               onChange={(e) =>
//                 setEditData((prev) => ({
//                   ...prev,
//                   title: e.target.value,
//                 }))
//               }
//             />
//             <Input
//               type="text"
//               value={editData.description}
//               id="task-edit-description"
//               name="task-edit-description"
//               onChange={(e) =>
//                 setEditData((prev) => ({
//                   ...prev,
//                   description: e.target.value,
//                 }))
//               }
//             />
//             <Input
//               type="date"
//               id="task-edit-dueDate"
//               name="task-edit-dueDate"
//               value={editData.dueDate}
//               min={new Date().toISOString().split("T")[0]}
//               onChange={(e) =>
//                 setEditData((prev) => ({
//                   ...prev,
//                   dueDate: e.target.value,
//                 }))
//               }
//             />

//             <select
//               value={editData.status}
//               onChange={(e) =>
//                 setEditData((prev) => ({
//                   ...prev,
//                   status: e.target.value as StatusTask,
//                 }))
//               }
//             >
//               <option value="todo">Todo</option>
//               <option value="in-progress">In Progress</option>
//               <option value="done">Done</option>
//             </select>

//             <select
//               value={editData.priority}
//               onChange={(e) =>
//                 setEditData((prev) => ({
//                   ...prev,
//                   priority: e.target.value as PriorityTask,
//                 }))
//               }
//             >
//               <option value="low">Low</option>

//               <option value="medium">Medium</option>

//               <option value="high">High</option>
//             </select>

//             <Button type="submit">Сохранить</Button>
//             <Button type="button" onClick={handleCancel}>
//               Отмена
//             </Button>
//           </form>
//         </li>
//       )}
//     </>
//   );
// };

// export default TaskCard;
