import React, { FC, useEffect } from "react";

type Variant = "error" | "success";

type Props = {
  variant?: Variant;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
};

const getVariantClasses = (variant: Variant): string => {
  switch (variant) {
    case "error":
      return "bg-red-50 border-red-200 text-red-700";
    case "success":
      return "bg-green-50 border-green-200 text-green-700";
  }
};

export const Alert: FC<Props> = ({
  variant = "error",
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, duration]);

  return (
    <div className="fixed top-8 right-6 transform z-50 max-w-md w-full mx-4">
      <div
        className={`border px-4 py-3 rounded-lg shadow-lg flex justify-between items-center ${getVariantClasses(
          variant
        )}`}
      >
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="hover:opacity-75 ml-4 text-lg font-bold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
