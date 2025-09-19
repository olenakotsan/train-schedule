import React, { createContext, useContext, useState, FC } from "react";
import { Alert } from "../components";

type Toast = {
  id: string;
  message: string;
  variant: "error" | "success";
};

type ToastContextType = {
  showToast: (message: string, variant?: "error" | "success") => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const ToastProvider: FC<Props> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    variant: "error" | "success" = "error"
  ) => {
    const id = Date.now().toString();
    const newToast = { id, message, variant };

    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Alert
          key={toast.id}
          variant={toast.variant}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          autoClose={true}
          duration={5000}
        />
      ))}
    </ToastContext.Provider>
  );
};
