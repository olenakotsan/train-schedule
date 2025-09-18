import { api } from "./api";
import { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";
import { API_ENDPOINTS } from "../const";

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  setAuth(authData: AuthResponse) {
    localStorage.setItem("token", authData.access_token);
    localStorage.setItem("user", JSON.stringify(authData.user));
  },
};
