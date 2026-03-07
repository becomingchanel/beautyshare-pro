'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Save, ChevronRight } from 'lucide-react';
import { SavedCalculations } from './SavedCalculations';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  calculatorType: string;
  currentInputs: Record<string, any>;
  currentResults: Record<string, any>;
}

export function CalculatorLayout({
  title,
  description,
  children,
  calculatorType,
  currentInputs,
  currentResults,
}: CalculatorLayoutProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [calculationName, setCalculationName] = useState('');

  const handleSave = async () => {
    if (!calculationName.trim()) {
      alert('Please enter a name for this calculation');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/calculators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calculator_type: calculatorType,
          name: calculationName,
          inputs: currentInputs,
          results: currentResults,
        }),
      });

      if (response.ok) {
        alert('Calculation saved successfully!');
        setCalculationName('');
        setShowSaveModal(false);
        // Refresh saved calculations sidebar
        window.dispatchEvent(new CustomEvent('calculationSaved'));
      } else {
        alert('Failed to save calculation');
      }
    } catch (error) {
      console.error('Error saving calculation:', error);
      alert('Failed to save calculation');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div>
          <Link href="/dashboard/calculators" className="flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calculators
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        {/* Calculator Content */}
        <Card className="p-8">
          <div className="space-y-6">
            {children}
          </div>
        </Card>

        {/* Save Button */}
        <Button
          onClick={() => setShowSaveModal(true)}
          className="w-full bg-gradient-to-r from-[#D4713B] to-[#E2AD37] hover:from-[#C85A25] hover:to-[#D09A20] text-white flex items-center justify-center gap-2"
          disabled={isSaving}
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save This Calculation'}
        </Button>
      </div>

      {/* Sidebar - Saved Calculations */}
      <div className="lg:col-span-1">
        <SavedCalculations calculatorType={calculatorType} />
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Save Calculation</h2>
              
              <input
                type="text"
                placeholder="Enter a name for this calculation (e.g., 'Q1 Launch Plan')"
                value={calculationName}
                onChange={(e) => setCalculationName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-6"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSaveModal(false);
                    setCalculationName('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !calculationName.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
