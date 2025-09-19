import React, { FC } from "react";

type Variant =
  | "primary-green"
  | "primary-brown"
  | "secondary"
  | "danger"
  | "link"
  | "link-danger";

type Props = {
  variant?: Variant;
  children: React.ReactNode;
} & React.ComponentProps<"button">;

const getVariantClasses = (variant: Variant): string => {
  const base =
    "px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  switch (variant) {
    case "primary-green":
      return `${base} bg-train-green text-white hover:bg-opacity-90`;
    case "primary-brown":
      return `${base} bg-train-brown text-white hover:bg-opacity-90`;
    case "secondary":
      return `${base} border hover:bg-gray-50`;
    case "danger":
      return `${base} bg-red-600 text-white hover:bg-red-700`;
    case "link":
      return `p-0 bg-transparent border-none text-train-green hover:text-train-green-light hover:underline`;
    case "link-danger":
      return `p-0 bg-transparent border-none text-red-600 hover:text-red-900 hover:underline`;
  }
};

export const Button: FC<Props> = ({
  variant = "primary-green",
  children,
  className = "",
  ...props
}) => {
  return (
    <button className={`${getVariantClasses(variant)} ${className}`} {...props}>
      {children}
    </button>
  );
};
