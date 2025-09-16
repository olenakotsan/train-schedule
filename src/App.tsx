import React, { FC } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages";
import "./App.css";

export const App: FC = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};
