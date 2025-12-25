import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailySpending } from '../types';
import { format, parseISO } from 'date-fns';
import './SpendingChart.css';

interface SpendingChartProps {
  data: DailySpending[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="chart-empty">
        <p>No data available for this period</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    date: format(parseISO(item.date), 'MMM dd'),
    amount: item.amount,
  }));

  return (
    <div className="spending-chart">
      <h3 className="chart-title">Daily Spending</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;

