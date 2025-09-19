import React, { FC, useState, useEffect } from "react";
import { Train, CreateTrainRequest } from "../types/train";
import { useTrains } from "../hooks/useTrains";
import { useDebounce } from "../hooks/useDebounce";
import {
  AddTrainModal,
  Button,
  DeleteConfirmModal,
  EditTrainModal,
  Input,
  Pagination,
  TrainTable,
} from "../components";

export const Trains: FC = () => {
  const {
    trains,
    loading,
    pagination,
    loadTrains,
    changePage,
    addTrain,
    updateTrain,
    toggleTrainStatus,
    deleteTrain,
  } = useTrains();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("departure");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTrain, setEditTrain] = useState<Train | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    changePage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, sortField, sortOrder]);

  useEffect(() => {
    loadTrains(debouncedSearch, sortField, sortOrder, pagination.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, debouncedSearch, sortField, sortOrder]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortField(field);
      setSortOrder("ASC");
    }
  };

  const clearSearch = () => {
    setSearch("");
  };

  const handleAddTrain = async (data: CreateTrainRequest) => {
    try {
      setSubmitting(true);
      await addTrain(data);
      setShowAddModal(false);
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTrain = async (data: CreateTrainRequest) => {
    if (!editTrain) return;

    try {
      setSubmitting(true);
      await updateTrain(editTrain.id, data);
      setEditTrain(null);
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    try {
      await toggleTrainStatus(id, isActive);
    } catch (err) {}
  };

  const handleDeleteTrain = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      await deleteTrain(deleteId);
      setDeleteId(null);
    } catch (err) {
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-train-dark">Train Schedule</h1>
        <Button onClick={() => setShowAddModal(true)}>Add Train</Button>
      </div>

      <div className="mb-6 relative">
        <Input
          placeholder="Search trains..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-8"
        />
        {search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <TrainTable
        trains={trains}
        onEdit={setEditTrain}
        onDelete={setDeleteId}
        onToggleStatus={handleToggleStatus}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        loading={loading}
      />

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={changePage}
      />

      <AddTrainModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddTrain}
        loading={submitting}
      />

      <EditTrainModal
        isOpen={!!editTrain}
        onClose={() => setEditTrain(null)}
        onSubmit={handleEditTrain}
        train={editTrain}
        loading={submitting}
      />

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteTrain}
        title="Delete Train"
        message="Are you sure you want to delete this train? This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
};
