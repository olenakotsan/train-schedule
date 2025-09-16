import React, { FC } from "react";

export const Home: FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to Train Schedule App
      </h2>
      <p className="text-lg text-gray-600">
        Manage your train schedules easily!
      </p>
    </div>
  );
};
