export type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'LEAD';

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  status: CustomerStatus;
  createdAt: Date;
}

export interface CreateCustomerInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  status?: CustomerStatus;
}

export interface UpdateCustomerInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  status?: CustomerStatus;
}
