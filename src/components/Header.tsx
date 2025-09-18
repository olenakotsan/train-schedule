import React, { FC } from "react";
import { Icon } from "./ui";
import { authService } from "../services/auth";

export const Header: FC = () => {
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <header className="bg-train-green text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Icon size={32} src="train.svg" />
          Train Schedule
        </h1>
        {user && (
          <div className="flex items-center gap-4">
            <span>Hello, {user.firstName || user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-train-brown hover:bg-train-brown-light px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
