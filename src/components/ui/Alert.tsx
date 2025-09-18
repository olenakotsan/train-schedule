import React, { FC } from "react";

type Variant = "error" | "success";

type Props = {
  variant?: Variant;
  message: string;
  onClose?: () => void;
};

const getVariantClasses = (variant: Variant): string => {
  switch (variant) {
    case "error":
      return "bg-red-50 border-red-200 text-red-700";
    case "success":
      return "bg-green-50 border-green-200 text-green-700";
  }
};

export const Alert: FC<Props> = ({ variant = "error", message, onClose }) => {
  return (
    <div
      className={`border px-4 py-3 rounded mb-4 flex justify-between items-center ${getVariantClasses(
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
  );
};
