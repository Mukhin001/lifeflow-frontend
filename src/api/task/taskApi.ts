import { baseApi } from "../baseApi";

import { CreateTaskRequest, Task } from "./task.types";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",

      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<
      Task,
      {
        id: string;
        title: string;
        description: string;
        dueDate?: string;
        status: string;
        priority: string;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
