"use client";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import styles from "./toast.module.css";
import { removeToast, ToastItem } from "@/src/store/slices/toastSlice";
import { useEffect } from "react";

const Toast = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.toast.toasts);

  useEffect(() => {
    if (!toasts.length) return;

    const timers = toasts.map((toast: ToastItem) => {
      return setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 1500);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [toasts, dispatch]);

  return (
    <div className={styles.container}>
      {toasts.map((toast: ToastItem) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type || "info"]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
