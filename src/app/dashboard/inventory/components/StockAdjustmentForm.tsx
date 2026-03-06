'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Inventory } from '@/lib/types';

interface StockAdjustmentFormProps {
  productId: string;
  currentInventory: Inventory;
  onSuccess?: () => void;
}

type AdjustmentType = 'restock' | 'write_off' | 'correction';

export function StockAdjustmentForm({
  productId,
  currentInventory,
  onSuccess,
}: StockAdjustmentFormProps) {
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('restock');
  const [quantity, setQuantity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!quantity || isNaN(Number(quantity))) {
      setError('Please enter a valid quantity');
      return;
    }

    const qty = Number(quantity);
    if (qty < 0) {
      setError('Quantity must be a positive number');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/inventory/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adjustment_type: adjustmentType,
          quantity: qty,
          notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to adjust stock');
      }

      setSuccess(true);
      setQuantity('');
      setNotes('');
      setAdjustmentType('restock');

      // Call onSuccess callback after a short delay
      setTimeout(() => {
        onSuccess?.();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getPreview = () => {
    if (!quantity || isNaN(Number(quantity))) {
      return null;
    }

    const qty = Number(quantity);
    let newQuantity = currentInventory.quantity_on_hand;

    if (adjustmentType === 'restock') {
      newQuantity = currentInventory.quantity_on_hand + qty;
    } else if (adjustmentType === 'write_off') {
      newQuantity = Math.max(0, currentInventory.quantity_on_hand - qty);
    } else if (adjustmentType === 'correction') {
      newQuantity = qty;
    }

    return newQuantity;
  };

  const preview = getPreview();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Adjustment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Stock Display */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Current Stock Level</p>
            <p className="text-3xl font-bold text-gray-900">
              {currentInventory.quantity_on_hand}
            </p>
          </div>

          {/* Adjustment Type */}
          <div className="space-y-2">
            <label htmlFor="adjustment-type" className="text-sm font-medium text-gray-700">
              Adjustment Type
            </label>
            <Select
              id="adjustment-type"
              value={adjustmentType}
              onChange={(e) =>
                setAdjustmentType(e.target.value as AdjustmentType)
              }
              disabled={isLoading}
              className="w-full"
            >
              <option value="restock">
                Restock (Add to current stock)
              </option>
              <option value="write_off">
                Write-Off (Subtract from stock)
              </option>
              <option value="correction">
                Correction (Set to exact amount)
              </option>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              {adjustmentType === 'restock' &&
                'Increases inventory by the specified amount'}
              {adjustmentType === 'write_off' &&
                'Decreases inventory by the specified amount'}
              {adjustmentType === 'correction' &&
                'Sets inventory to the exact specified amount'}
            </p>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <Input
              id="quantity"
              type="number"
              min="0"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              disabled={isLoading}
              required
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <Input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Damaged units, received shipment..."
              disabled={isLoading}
            />
          </div>

          {/* Preview */}
          {preview !== null && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600">
                <strong>Preview:</strong> Stock will be adjusted to{' '}
                <span className="font-bold text-lg">{preview}</span>
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                Stock adjusted successfully!
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !quantity}
            className="w-full"
            style={{ backgroundColor: '#FA6A27' }}
          >
            {isLoading ? (
              <>
                <Spinner className="w-4 h-4 mr-2" />
                Adjusting...
              </>
            ) : (
              'Adjust Stock'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
