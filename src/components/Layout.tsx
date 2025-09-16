import React, { FC } from "react";
import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-train-light">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
