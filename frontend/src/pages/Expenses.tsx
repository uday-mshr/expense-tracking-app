import React, { useState, useEffect } from 'react';
import { expenseService } from '../services/expenseService';
import { categoryService } from '../services/categoryService';
import { Expense, Category, CreateExpenseDto } from '../types';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import './Expenses.css';

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
  const [month, setMonth] = useState<number | undefined>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number | undefined>(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [month, year, selectedCategory]);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters: any = {};
      if (month) filters.month = month;
      if (year) filters.year = year;
      if (selectedCategory) filters.category = selectedCategory;
      const data = await expenseService.getAll(filters);
      setExpenses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err: any) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleCreate = () => {
    setEditingExpense(undefined);
    setShowForm(true);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.delete(id);
        loadExpenses();
      } catch (err: any) {
        alert(err.message || 'Failed to delete expense');
      }
    }
  };

  const handleSubmit = async (data: CreateExpenseDto) => {
    try {
      if (editingExpense) {
        await expenseService.update(editingExpense._id, data);
      } else {
        await expenseService.create(data);
      }
      setShowForm(false);
      setEditingExpense(undefined);
      loadExpenses();
    } catch (err: any) {
      alert(err.message || 'Failed to save expense');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(undefined);
  };

  if (loading && expenses.length === 0) {
    return <div className="loading">Loading expenses...</div>;
  }

  return (
    <div className="expenses-page">
      <div className="expenses-header">
        <h1>Expenses</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Add Expense
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Month</label>
          <select
            value={month || ''}
            onChange={(e) => setMonth(e.target.value ? parseInt(e.target.value) : undefined)}
          >
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Year</label>
          <input
            type="number"
            value={year || ''}
            onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : undefined)}
            min="2020"
            max="2099"
          />
        </div>
        <div className="filter-group">
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
            <ExpenseForm
              expense={editingExpense}
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Expenses;

