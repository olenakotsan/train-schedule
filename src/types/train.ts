export type Train = {
  id: number;
  trainNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateTrainRequest = {
  trainNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

export type TrainsResponse = {
  data: Train[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
