import React, { FC, useState } from "react";
import { CreateTrainRequest } from "../types/train";
import { Input, Button } from "./ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTrainRequest) => void;
  loading?: boolean;
};

const initialFormData: CreateTrainRequest = {
  trainNumber: "",
  departure: "",
  arrival: "",
  departureTime: "",
  arrivalTime: "",
  price: 0,
};

export const AddTrainModal: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CreateTrainRequest>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Add Train</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Train Number"
            name="trainNumber"
            value={formData.trainNumber}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="From"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              required
            />
            <Input
              label="To"
              name="arrival"
              value={formData.arrival}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Departure"
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
            <Input
              label="Arrival"
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Price ($)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
