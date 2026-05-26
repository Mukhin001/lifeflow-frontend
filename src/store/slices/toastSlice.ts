import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToastItem {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
}

type ToastState = {
  toasts: ToastItem[];
};

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<ToastItem, "id">>) => {
      state.toasts.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },

    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;

export default toastSlice.reducer;
