import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { MonthlySummary as MonthlySummaryType } from '../types';
import MonthlySummary from '../components/MonthlySummary';
import CategoryChart from '../components/CategoryChart';
import SpendingChart from '../components/SpendingChart';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<MonthlySummaryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadSummary();
  }, [month, year]);

  const loadSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getMonthlySummary(month, year);
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.target.value));
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!summary) {
    return <div className="error-message">No data available</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="date-selectors">
          <select value={month} onChange={handleMonthChange} className="month-selector">
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            min="2020"
            max="2099"
            className="year-input"
          />
        </div>
      </div>

      <MonthlySummary summary={summary} />

      <div className="charts-container">
        <CategoryChart data={summary.categoryBreakdown} />
        <SpendingChart data={summary.dailySpending} />
      </div>
    </div>
  );
};

export default Dashboard;

