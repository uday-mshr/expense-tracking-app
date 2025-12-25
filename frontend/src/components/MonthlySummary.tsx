import React from 'react';
import { MonthlySummary as MonthlySummaryType } from '../types';
import './MonthlySummary.css';

interface MonthlySummaryProps {
  summary: MonthlySummaryType;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ summary }) => {
  return (
    <div className="monthly-summary">
      <div className="summary-card">
        <h3 className="summary-card-title">Total Expenses</h3>
        <p className="summary-card-value">${summary.totalExpenses.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3 className="summary-card-title">Average Daily</h3>
        <p className="summary-card-value">${summary.averageDaily.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3 className="summary-card-title">Days Tracked</h3>
        <p className="summary-card-value">{summary.totalDays}</p>
      </div>
      <div className="summary-card">
        <h3 className="summary-card-title">Categories</h3>
        <p className="summary-card-value">{summary.categoryBreakdown.length}</p>
      </div>
    </div>
  );
};

export default MonthlySummary;

