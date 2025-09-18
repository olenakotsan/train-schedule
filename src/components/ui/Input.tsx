import React, { FC, InputHTMLAttributes } from "react";

type Props = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({ label, className = "", ...inputProps }) => {
  const inputClasses = `w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-train-green ${className}`;

  if (label) {
    return (
      <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input {...inputProps} className={inputClasses} />
      </div>
    );
  }

  return <input {...inputProps} className={inputClasses} />;
};
