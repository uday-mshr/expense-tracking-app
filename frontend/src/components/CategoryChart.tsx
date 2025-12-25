import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryBreakdown } from '../types';
import './CategoryChart.css';

interface CategoryChartProps {
  data: CategoryBreakdown[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="chart-empty">
        <p>No data available for this period</p>
      </div>
    );
  }

  return (
    <div className="category-chart">
      <h3 className="chart-title">Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ categoryName, percentage }) => `${categoryName}: ${percentage.toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.categoryColor} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;

