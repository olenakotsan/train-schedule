import React, { FC } from "react";
import { Icon } from "./ui";

export const Header: FC = () => {
  return (
    <header className="bg-train-green text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-center items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Icon size={32} src="train.svg" />
          Train Schedule
        </h1>
      </div>
    </header>
  );
};
