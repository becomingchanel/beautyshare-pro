'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface OrderFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  status?: string;
  search?: string;
}

export function OrderFilters({ onFilterChange }: OrderFiltersProps) {
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const handleStatusChange = useCallback(
    (value: string) => {
      setStatus(value);
      onFilterChange({
        status: value || undefined,
        search: search || undefined,
      });
    },
    [search, onFilterChange]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      onFilterChange({
        status: status || undefined,
        search: value || undefined,
      });
    },
    [status, onFilterChange]
  );

  const handleReset = useCallback(() => {
    setStatus('');
    setSearch('');
    onFilterChange({});
  }, [onFilterChange]);

  return (
    <div className="flex gap-4 mb-6 flex-wrap items-end">
      <div className="flex-1 min-w-64">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Orders
        </label>
        <Input
          type="text"
          placeholder="Search by order # or customer name..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="w-48">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order Status
        </label>
        <Select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </Select>
      </div>

      <Button variant="outline" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}
