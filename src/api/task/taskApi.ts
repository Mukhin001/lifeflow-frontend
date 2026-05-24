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
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = taskApi;
