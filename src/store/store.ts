import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import toastReducer from "./slices/toastSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      toast: toastReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
