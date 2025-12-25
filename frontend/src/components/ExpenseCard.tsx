import React from 'react';
import { Expense, Category } from '../types';
import { format } from 'date-fns';
import './ExpenseCard.css';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onEdit, onDelete }) => {
  const category = typeof expense.category === 'string' ? null : expense.category;

  return (
    <div className="expense-card">
      <div className="expense-card-header">
        <div className="expense-amount">${expense.amount.toFixed(2)}</div>
        {category && (
          <span
            className="expense-category-badge"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
        )}
      </div>
      <div className="expense-description">{expense.description}</div>
      <div className="expense-card-footer">
        <span className="expense-date">
          {format(new Date(expense.date), 'MMM dd, yyyy')}
        </span>
        <div className="expense-actions">
          <button
            className="btn-icon btn-edit"
            onClick={() => onEdit(expense)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => onDelete(expense._id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;

