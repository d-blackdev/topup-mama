import { toast } from "react-toastify";

type toastType = "success" | "warning" | "error";

interface showToastProps {
  type: toastType;
  message?: string;
}

export const showToast = ({ type, message }: showToastProps) => {
  switch (type) {
    case "success":
      return toast.success(message);
    case "warning":
      return toast.warning(message);
    case "error":
      return toast.error(message);

    default:
      return null;
  }
};
