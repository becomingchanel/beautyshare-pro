'use client';

import { useEffect, useState } from 'react';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface InventoryInputs {
  current_stock: number;
  daily_sales_rate: number;
  lead_time_days: number;
  safety_stock_days: number;
  unit_cost: number;
  storage_cost_per_unit: number;
}

interface InventoryResults {
  reorder_point: number;
  economic_order_quantity: number;
  days_until_stockout: number;
  total_reorder_cost: number;
  monthly_holding_cost: number;
}

export default function InventoryCalculator() {
  const [inputs, setInputs] = useState<InventoryInputs>({
    current_stock: 500,
    daily_sales_rate: 15,
    lead_time_days: 14,
    safety_stock_days: 7,
    unit_cost: 8.5,
    storage_cost_per_unit: 0.5,
  });

  const [results, setResults] = useState<InventoryResults>({
    reorder_point: 0,
    economic_order_quantity: 0,
    days_until_stockout: 0,
    total_reorder_cost: 0,
    monthly_holding_cost: 0,
  });

  useEffect(() => {
    const calculateInventory = () => {
      const {
        current_stock,
        daily_sales_rate,
        lead_time_days,
        safety_stock_days,
        unit_cost,
        storage_cost_per_unit,
      } = inputs;

      // Reorder point = (daily_sales_rate * lead_time_days) + safety_stock
      const safety_stock = daily_sales_rate * safety_stock_days;
      const reorder_point = daily_sales_rate * lead_time_days + safety_stock;

      // Economic Order Quantity (simplified EOQ formula)
      // EOQ = sqrt(2 * annual_demand * order_cost / holding_cost)
      // Using simplified approach: order quantity based on lead time and sales
      const monthly_demand = daily_sales_rate * 30;
      const annual_demand = monthly_demand * 12;
      const economic_order_quantity = Math.sqrt(
        (2 * annual_demand * 50) / (unit_cost * storage_cost_per_unit)
      );

      // Days until stockout
      const days_until_stockout =
        daily_sales_rate > 0 ? current_stock / daily_sales_rate : 0;

      // Total reorder cost (order cost + EOQ * unit cost)
      const total_reorder_cost = 50 + economic_order_quantity * unit_cost;

      // Monthly holding cost
      const avg_inventory = (economic_order_quantity / 2 + safety_stock) / 2;
      const monthly_holding_cost = avg_inventory * storage_cost_per_unit;

      setResults({
        reorder_point: Math.round(reorder_point),
        economic_order_quantity: Math.round(economic_order_quantity),
        days_until_stockout: Math.round(days_until_stockout),
        total_reorder_cost: Math.round(total_reorder_cost * 100) / 100,
        monthly_holding_cost: Math.round(monthly_holding_cost * 100) / 100,
      });
    };

    calculateInventory();
  }, [inputs]);

  useEffect(() => {
    const handleLoadCalculation = (event: any) => {
      if (event.detail?.calculatorType === 'inventory' && event.detail?.data) {
        setInputs(event.detail.data);
      }
    };

    window.addEventListener('loadCalculation', handleLoadCalculation);
    return () =>
      window.removeEventListener('loadCalculation', handleLoadCalculation);
  }, []);

  const handleInputChange = (field: keyof InventoryInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <CalculatorLayout
      title="Inventory Reorder Calculator"
      description="Determine when and how much inventory to reorder to maintain optimal stock levels"
      calculatorType="inventory"
      currentInputs={inputs}
      currentResults={results}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Inventory Parameters
          </h3>
          <div>
            <Input
              label="Current Stock (units)"
              value={inputs.current_stock}
              onChange={(e) =>
                handleInputChange('current_stock', parseFloat(e.target.value) || 0)
              }
              placeholder="500"
            />
            <p className="mt-1 text-xs text-gray-500">Total units in inventory</p>
          </div>
          <div>
            <Input
              label="Daily Sales Rate (units/day)"
              value={inputs.daily_sales_rate}
              onChange={(e) =>
                handleInputChange('daily_sales_rate', parseFloat(e.target.value) || 0)
              }
              placeholder="15"
            />
            <p className="mt-1 text-xs text-gray-500">Average units sold per day</p>
          </div>
          <div>
            <Input
              label="Lead Time (days)"
              value={inputs.lead_time_days}
              onChange={(e) =>
                handleInputChange('lead_time_days', parseFloat(e.target.value) || 0)
              }
              placeholder="14"
            />
            <p className="mt-1 text-xs text-gray-500">Days from order to delivery</p>
          </div>
          <div>
            <Input
              label="Safety Stock (days of supply)"
              value={inputs.safety_stock_days}
              onChange={(e) =>
                handleInputChange('safety_stock_days', parseFloat(e.target.value) || 0)
              }
              placeholder="7"
            />
            <p className="mt-1 text-xs text-gray-500">Days of buffer stock</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Cost Parameters</h3>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Unit Cost"
                value={inputs.unit_cost}
                onChange={(e) =>
                  handleInputChange('unit_cost', parseFloat(e.target.value) || 0)
                }
                placeholder="8.50"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Cost per unit</p>
          </div>
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">$</span>
              <Input
                label="Storage Cost Per Unit (monthly)"
                value={inputs.storage_cost_per_unit}
                onChange={(e) =>
                  handleInputChange('storage_cost_per_unit', parseFloat(e.target.value) || 0)
                }
                placeholder="0.50"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Monthly holding cost per unit</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard
          label="Reorder Point"
          value={`${Math.round(results.reorder_point)} units`}
          subtext="Reorder when stock reaches this level"
        />
        <MetricCard
          label="Economic Order Quantity"
          value={`${Math.round(results.economic_order_quantity)} units`}
          subtext="Optimal order size"
        />
        <MetricCard
          label="Days Until Stockout"
          value={`${results.days_until_stockout} days`}
          subtext="At current sales rate"
        />
        <MetricCard
          label="Total Reorder Cost"
          value={`$${results.total_reorder_cost}`}
          subtext="Per order"
        />
        <MetricCard
          label="Monthly Holding Cost"
          value={`$${results.monthly_holding_cost}`}
          subtext="Storage expenses per month"
        />
      </div>

      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Inventory Cost Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Monthly Storage Cost</p>
            <p className="text-2xl font-bold text-gray-800">
              ${results.monthly_holding_cost.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Cost Per Reorder</p>
            <p className="text-2xl font-bold text-gray-800">
              ${results.total_reorder_cost.toFixed(2)}
            </p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <p className="text-sm text-pink-600">
              Annual Storage Cost
            </p>
            <p className="text-2xl font-bold text-pink-700">
              ${(results.monthly_holding_cost * 12).toFixed(2)}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-600">Avg Inventory Value</p>
            <p className="text-2xl font-bold text-blue-700">
              ${(
                ((results.economic_order_quantity / 2) * inputs.unit_cost)
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </CalculatorLayout>
  );
}
