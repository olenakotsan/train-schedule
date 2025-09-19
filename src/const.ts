export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  TRAINS: "/trains",
} as const;

export const ERROR_MESSAGES = {
  LOGIN_FAILED: "Invalid email or password",
  REGISTER_FAILED: "Registration failed. Please try again.",
  TRAINS_LOAD_FAILED: "Failed to load trains",
  TRAIN_ADD_FAILED: "Failed to add train",
  TRAIN_UPDATE_FAILED: "Failed to update train",
  TRAIN_DELETE_FAILED: "Failed to delete train",
} as const;

export const SUCCESS_MESSAGES = {
  TRAIN_ADDED: "Train added successfully",
  TRAIN_UPDATED: "Train updated successfully",
  TRAIN_DELETED: "Train deleted  successfully",
} as const;
