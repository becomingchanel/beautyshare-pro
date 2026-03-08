'use client';

import { Check } from 'lucide-react';

interface Step {
  name: string;
  description?: string;
}

interface WizardStepsProps {
  steps: Step[];
  currentStep: number;
}

export default function WizardSteps({ steps, currentStep }: WizardStepsProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step.name} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < currentStep
                  ? 'bg-orange text-white'
                  : i === currentStep
                    ? 'border-2 border-orange text-orange'
                    : 'border-2 border-gray-200 text-gray-400'
              }`}
            >
              {i < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-sm font-medium hidden md:block ${
                i <= currentStep ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {step.name}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 ${
                i < currentStep ? 'bg-orange' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
