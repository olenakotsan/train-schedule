import { useState, useEffect } from "react";
import { Train, CreateTrainRequest } from "../types/train";
import { trainService } from "../services/train";
import { ERROR_MESSAGES } from "../const";

export const useTrains = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTrains = async (
    search?: string,
    sortBy?: string,
    sortOrder?: "ASC" | "DESC"
  ) => {
    try {
      setLoading(true);
      setError("");
      const response = await trainService.getTrains({
        search: search || undefined,
        sortBy: sortBy || "departureTime",
        sortOrder: sortOrder || "ASC",
      });
      setTrains(response.data);
    } catch (err) {
      setError(ERROR_MESSAGES.TRAINS_LOAD_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const addTrain = async (data: CreateTrainRequest) => {
    try {
      await trainService.createTrain(data);
      await loadTrains();
    } catch (err) {
      setError(ERROR_MESSAGES.TRAIN_ADD_FAILED);
      throw err;
    }
  };

  const updateTrain = async (id: number, data: Partial<CreateTrainRequest>) => {
    try {
      await trainService.updateTrain(id, data);
      await loadTrains();
    } catch (err) {
      setError(ERROR_MESSAGES.TRAIN_UPDATE_FAILED);
      throw err;
    }
  };

  const deleteTrain = async (id: number) => {
    try {
      await trainService.deleteTrain(id);
      await loadTrains();
    } catch (err) {
      setError(ERROR_MESSAGES.TRAIN_DELETE_FAILED);
      throw err;
    }
  };

  const clearError = () => setError("");

  useEffect(() => {
    loadTrains();
  }, []);

  return {
    trains,
    loading,
    error,
    loadTrains,
    addTrain,
    updateTrain,
    deleteTrain,
    clearError,
  };
};
