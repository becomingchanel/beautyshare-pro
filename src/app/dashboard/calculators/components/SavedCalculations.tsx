'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { Trash2, Download } from 'lucide-react';

interface SavedCalculation {
  id: string;
  name: string;
  calculator_type: string;
  created_at: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
}

interface SavedCalculationsProps {
  calculatorType: string;
}

export function SavedCalculations({ calculatorType }: SavedCalculationsProps) {
  const [calculations, setCalculations] = useState<SavedCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCalculations();

    // Listen for save events
    window.addEventListener('calculationSaved', fetchCalculations);
    return () => {
      window.removeEventListener('calculationSaved', fetchCalculations);
    };
  }, [calculatorType]);

  const fetchCalculations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/calculators');
      if (response.ok) {
        const data = await response.json();
        const filtered = data.calculations.filter(
          (calc: SavedCalculation) => calc.calculator_type === calculatorType
        );
        setCalculations(filtered);
      }
    } catch (error) {
      console.error('Error fetching calculations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this calculation?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/calculators/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCalculations(calculations.filter((c) => c.id !== id));
      } else {
        alert('Failed to delete calculation');
      }
    } catch (error) {
      console.error('Error deleting calculation:', error);
      alert('Failed to delete calculation');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLoad = (calculation: SavedCalculation) => {
    // Dispatch event with calculation data
    window.dispatchEvent(
      new CustomEvent('loadCalculation', {
        detail: {
          inputs: calculation.inputs,
          results: calculation.results,
        },
      })
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Calculations</h3>
      </div>

      {loading ? (
        <Card className="p-6 text-center">
          <p className="text-gray-500">Loading...</p>
        </Card>
      ) : calculations.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-gray-500 text-sm">No saved calculations yet. Save your first calculation to see it here.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {calculations.map((calc) => (
            <Card key={calc.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900 truncate">{calc.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(calc.created_at)}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoad(calc)}
                    className="flex-1 text-sm px-3 py-2 bg-orange-50 text-orange-600 rounded hover:bg-orange-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Load
                  </button>
                  <button
                    onClick={() => handleDelete(calc.id)}
                    disabled={deletingId === calc.id}
                    className="flex-1 text-sm px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
