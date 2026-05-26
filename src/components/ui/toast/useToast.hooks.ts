import { useAppDispatch } from "@/src/store/hooks";
import { addToast } from "@/src/store/slices/toastSlice";

type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const dispatch = useAppDispatch();

  const notify = (message: string, type: ToastType) => {
    dispatch(addToast({ message, type }));
  };

  return { notify };
};
