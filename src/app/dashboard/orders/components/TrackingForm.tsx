'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

interface TrackingFormProps {
  orderId: string;
  initialTracking?: {
    tracking_number?: string;
    tracking_carrier?: string;
  };
  onSuccess?: () => void;
}

export function TrackingForm({
  orderId,
  initialTracking,
  onSuccess,
}: TrackingFormProps) {
  const [trackingNumber, setTrackingNumber] = useState(
    initialTracking?.tracking_number || ''
  );
  const [trackingCarrier, setTrackingCarrier] = useState(
    initialTracking?.tracking_carrier || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!trackingNumber || !trackingCarrier) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tracking_number: trackingNumber,
          tracking_carrier: trackingCarrier,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update tracking information');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tracking Number
        </label>
        <Input
          type="text"
          placeholder="e.g., 1Z999AA10123456784"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shipping Carrier
        </label>
        <Select
          value={trackingCarrier}
          onChange={(e) => setTrackingCarrier(e.target.value)}
          disabled={isLoading}
          required
        >
          <option value="">Select a carrier</option>
          <option value="fedex">FedEx</option>
          <option value="ups">UPS</option>
          <option value="usps">USPS</option>
          <option value="dhl">DHL</option>
          <option value="other">Other</option>
        </Select>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          Tracking information updated successfully
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Updating...
          </>
        ) : (
          'Update Tracking'
        )}
      </Button>
    </form>
  );
}
