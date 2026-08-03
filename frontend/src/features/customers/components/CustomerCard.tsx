'use client';

import { CustomerRecord, CustomerStatus } from '@/server/use-cases/customers/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface CustomerCardProps {
  customer: CustomerRecord;
  onEdit?: (customer: CustomerRecord) => void;
  onDelete?: (id: string) => Promise<unknown>;
  onStatusChange?: (id: string, status: CustomerStatus) => Promise<unknown>;
}

export function CustomerCard({ customer, onEdit, onDelete, onStatusChange }: CustomerCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">{customer.name}</h3>
            <Badge status={customer.status}>{customer.status}</Badge>
          </div>
          <div><span className="font-medium text-slate-500">Email:</span> <span className="text-slate-800">{customer.email}</span></div>
          <div><span className="font-medium text-slate-500">Phone:</span> <span className="text-slate-800">{customer.phone || 'N/A'}</span></div>
          <div><span className="font-medium text-slate-500">Address:</span> <span className="text-slate-800">{customer.address || 'N/A'}</span></div>
          <div className="text-xs text-slate-400">
            Registered: {new Date(customer.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onStatusChange ? (
            <Select
              value={customer.status}
              onChange={(e) => onStatusChange(customer.id, e.target.value as CustomerStatus)}
              className="text-xs w-auto py-1"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="LEAD">LEAD</option>
            </Select>
          ) : null}

          {onEdit ? (
            <Button variant="outline" size="sm" onClick={() => onEdit(customer)}>
              Edit
            </Button>
          ) : null}

          {onDelete ? (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
                  onDelete(customer.id);
                }
              }}
            >
              Delete
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
