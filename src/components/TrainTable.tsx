import React, { FC } from "react";
import { Train } from "../types/train";
import { Button } from "./ui";

type Props = {
  trains: Train[];
  onEdit: (train: Train) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
};

export const TrainTable: FC<Props> = ({
  trains,
  onEdit,
  onDelete,
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

  return (
    <div className="bg-white border rounded">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Train
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              From - To
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Time
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Price
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{train.trainNumber}</td>
              <td className="px-4 py-3">
                {train.departure} - {train.arrival}
              </td>
              <td className="px-4 py-3">
                {train.departureTime} - {train.arrivalTime}
              </td>
              <td className="px-4 py-3">${train.price}</td>
              <td className="px-4 py-3">
                <Button
                  variant="link"
                  onClick={() => onEdit(train)}
                  className="mr-3"
                >
                  Edit
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
