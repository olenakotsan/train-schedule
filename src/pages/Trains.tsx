import React, { FC, useState } from "react";
import { Train, CreateTrainRequest } from "../types/train";
import { useTrains } from "../hooks/useTrains";
import {
  AddTrainModal,
  Alert,
  Button,
  DeleteConfirmModal,
  EditTrainModal,
  Input,
  TrainTable,
} from "../components";

export const Trains: FC = () => {
  const {
    trains,
    loading,
    error,
    loadTrains,
    addTrain,
    updateTrain,
    deleteTrain,
    clearError,
  } = useTrains();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTrain, setEditTrain] = useState<Train | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSearch = () => {
    loadTrains(search);
  };

  const handleAddTrain = async (data: CreateTrainRequest) => {
    try {
      setSubmitting(true);
      await addTrain(data);
      setShowAddModal(false);
    } catch (err) {
      // Error handled in hook
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTrain = async (data: Partial<CreateTrainRequest>) => {
    if (!editTrain) return;

    try {
      setSubmitting(true);
      await updateTrain(editTrain.id, data);
      setEditTrain(null);
    } catch (err) {
      // Error handled in hook
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTrain = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      await deleteTrain(deleteId);
      setDeleteId(null);
    } catch (err) {
      // Error handled in hook
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

      <div className="mb-6 flex gap-2">
        <Input
          placeholder="Search trains..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button variant="secondary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {error && <Alert variant="error" message={error} onClose={clearError} />}

      <TrainTable
        trains={trains}
        onEdit={setEditTrain}
        onDelete={setDeleteId}
        loading={loading}
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
