import React, { FC } from "react";
import { Train } from "../types/train";
import { Button } from "./ui";

type Props = {
  trains: Train[];
  onEdit: (train: Train) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
  onSort: (field: string) => void;
  sortField: string;
  sortOrder: "ASC" | "DESC";
  loading?: boolean;
};

export const TrainTable: FC<Props> = ({
  trains,
  onEdit,
  onDelete,
  onToggleStatus,
  onSort,
  sortField,
  sortOrder,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-train-dark">Loading trains...</div>
      </div>
    );
  }

  if (trains.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No trains found</div>
    );
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) return "↕️";
    return sortOrder === "ASC" ? "↑" : "↓";
  };

  const handleSort = (field: string) => {
    onSort(field);
  };

  return (
    <div className="bg-white border rounded">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th
              className="px-4 py-3 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort("trainNumber")}
            >
              Train {getSortIcon("trainNumber")}
            </th>
            <th
              className="px-4 py-3 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort("departure")}
            >
              From - To {getSortIcon("departure")}
            </th>
            <th
              className="px-4 py-3 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort("departureTime")}
            >
              Time {getSortIcon("departureTime")}
            </th>
            <th
              className="px-4 py-3 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort("price")}
            >
              Price {getSortIcon("price")}
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Status
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr
              key={train.id}
              className={`border-b hover:bg-gray-50 ${
                !train.isActive ? "bg-gray-100 text-gray-500" : ""
              }`}
            >
              <td className="px-4 py-3 font-medium">{train.trainNumber}</td>
              <td className="px-4 py-3">
                {train.departure} - {train.arrival}
              </td>
              <td className="px-4 py-3">
                {train.departureTime} - {train.arrivalTime}
              </td>
              <td className="px-4 py-3">₴{train.price}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    train.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {train.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <Button
                  variant="link"
                  onClick={() => onEdit(train)}
                  disabled={!train.isActive}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="link"
                  onClick={() => onToggleStatus(train.id, !train.isActive)}
                  className={
                    train.isActive
                      ? "text-orange-600 hover:text-orange-800"
                      : "text-green-600 hover:text-green-800"
                  }
                >
                  {train.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="link-danger"
                  onClick={() => onDelete(train.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
