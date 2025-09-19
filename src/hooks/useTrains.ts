import { useState, useEffect } from "react";
import { Train, CreateTrainRequest } from "../types/train";
import { trainService } from "../services/train";
import { ERROR_MESSAGES } from "../const";
import { useToast } from "../contexts/ToastContext";

export const useTrains = () => {
  const { showToast } = useToast();
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const loadTrains = async (
    search?: string,
    sortBy?: string,
    sortOrder?: "ASC" | "DESC",
    page?: number
  ) => {
    try {
      setLoading(true);
      const response = await trainService.getTrains({
        search: search || undefined,
        sortBy: sortBy || "departureTime",
        sortOrder: sortOrder || "ASC",
        page: page || pagination.page,
        limit: pagination.limit,
      });
      setTrains(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (err) {
      showToast(ERROR_MESSAGES.TRAINS_LOAD_FAILED, "error");
    } finally {
      setLoading(false);
    }
  };

  const changePage = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const addTrain = async (data: CreateTrainRequest) => {
    try {
      await trainService.createTrain(data);
      showToast("Train added successfully", "success");
      await loadTrains();
    } catch (err) {
      showToast(ERROR_MESSAGES.TRAIN_ADD_FAILED, "error");
      throw err;
    }
  };

  const updateTrain = async (id: number, data: CreateTrainRequest) => {
    try {
      await trainService.updateTrain(id, data);
      showToast("Train updated successfully", "success");
      await loadTrains();
    } catch (err) {
      showToast(ERROR_MESSAGES.TRAIN_UPDATE_FAILED, "error");
      throw err;
    }
  };

  const toggleTrainStatus = async (id: number, isActive: boolean) => {
    try {
      await trainService.patchTrain(id, { isActive });
      showToast(
        `Train ${isActive ? "activated" : "deactivated"} successfully`,
        "success"
      );
      await loadTrains();
    } catch (err) {
      showToast("Failed to update train status", "error");
      throw err;
    }
  };

  const deleteTrain = async (id: number) => {
    try {
      await trainService.deleteTrain(id);
      showToast("Train deleted successfully", "success");
      await loadTrains();
    } catch (err) {
      showToast(ERROR_MESSAGES.TRAIN_DELETE_FAILED, "error");
      throw err;
    }
  };

  useEffect(() => {
    loadTrains();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page]);

  return {
    trains,
    loading,
    pagination,
    loadTrains,
    changePage,
    addTrain,
    updateTrain,
    toggleTrainStatus,
    deleteTrain,
  };
};
