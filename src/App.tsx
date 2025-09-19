import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Trains } from "./pages/Trains";
import { authService } from "./services/auth";
import { ToastProvider } from "./contexts/ToastContext";
import "./App.css";

export const App: FC = () => {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/trains" />}
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? <Register /> : <Navigate to="/trains" />
            }
          />

          <Route
            path="/trains"
            element={
              isAuthenticated ? (
                <Layout>
                  <Trains />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/" element={<Navigate to="/trains" />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
};
