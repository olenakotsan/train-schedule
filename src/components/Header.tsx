import React, { FC } from "react";
import { authService } from "../services/auth";
import { Button } from "./ui";

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
          <img src="train.svg" alt="train" className="w-8 h-8" />
          Train Schedule
        </h1>

        {user && (
          <div className="flex items-center gap-4">
            <span>
              Hello, {user.firstName} {user.secondName}
            </span>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
