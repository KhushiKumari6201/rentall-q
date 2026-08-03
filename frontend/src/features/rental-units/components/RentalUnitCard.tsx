'use client';

import { RentalUnitRecord, RentalUnitStatus } from '@/server/use-cases/rental-units/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface RentalUnitCardProps {
  unit: RentalUnitRecord;
  onEdit?: (unit: RentalUnitRecord) => void;
  onDelete?: (id: string) => Promise<unknown>;
  onStatusChange?: (id: string, status: RentalUnitStatus) => Promise<unknown>;
}

export function RentalUnitCard({ unit, onEdit, onDelete, onStatusChange }: RentalUnitCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">{unit.name}</h3>
            <Badge status={unit.status}>{unit.status}</Badge>
          </div>
          <div><span className="font-medium text-slate-500">Unit Type:</span> <span className="text-slate-800">{unit.type}</span></div>
          <div><span className="font-medium text-slate-500">Base Price:</span> <span className="font-bold text-emerald-600">₹{unit.basePrice}/day</span></div>
          <div><span className="font-medium text-slate-500">Description:</span> <span className="text-slate-800">{unit.description || 'N/A'}</span></div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onStatusChange ? (
            <Select
              value={unit.status}
              onChange={(e) => onStatusChange(unit.id, e.target.value as RentalUnitStatus)}
              className="text-xs w-auto py-1"
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="OCCUPIED">OCCUPIED</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
              <option value="UNAVAILABLE">UNAVAILABLE</option>
            </Select>
          ) : null}

          {onEdit ? (
            <Button variant="outline" size="sm" onClick={() => onEdit(unit)}>
              Edit
            </Button>
          ) : null}

          {onDelete ? (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${unit.name}?`)) {
                  onDelete(unit.id);
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
