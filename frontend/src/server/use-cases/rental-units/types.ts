export type RentalUnitStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'UNAVAILABLE';

export interface RentalUnitRecord {
  id: string;
  name: string;
  type: string;
  description?: string;
  basePrice: number;
  status: RentalUnitStatus;
  createdAt: Date;
}

export interface CreateRentalUnitInput {
  name: string;
  type: string;
  description?: string;
  basePrice: number;
  status?: RentalUnitStatus;
}

export interface UpdateRentalUnitInput {
  name?: string;
  type?: string;
  description?: string;
  basePrice?: number;
  status?: RentalUnitStatus;
}
