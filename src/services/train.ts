import { api } from "./api";
import { Train, CreateTrainRequest, TrainsResponse } from "../types/train";
import { API_ENDPOINTS } from "../const";

export const trainService = {
  async getTrains(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }): Promise<TrainsResponse> {
    const response = await api.get<TrainsResponse>(API_ENDPOINTS.TRAINS, {
      params,
    });
    return response.data;
  },

  async createTrain(data: CreateTrainRequest): Promise<Train> {
    const response = await api.post<Train>(API_ENDPOINTS.TRAINS, data);
    return response.data;
  },

  async updateTrain(id: number, data: CreateTrainRequest): Promise<Train> {
    const response = await api.put<Train>(
      `${API_ENDPOINTS.TRAINS}/${id}`,
      data
    );
    return response.data;
  },

  async patchTrain(id: number, data: Partial<Train>): Promise<Train> {
    const response = await api.patch<Train>(
      `${API_ENDPOINTS.TRAINS}/${id}`,
      data
    );
    return response.data;
  },

  async deleteTrain(id: number): Promise<void> {
    await api.delete(`${API_ENDPOINTS.TRAINS}/${id}`);
  },
};
