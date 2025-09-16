import React, { FC } from "react";

type Props = {
  size?: number;
  className?: string;
  src?: string;
};

export const Icon: FC<Props> = ({
  size = 24,
  className,
  src,
}) => {
  return (
    <img
      src={src}
      alt="icon"
      className={`w-${size / 4} h-${size / 4} ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
