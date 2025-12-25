import React from 'react';
import { Expense } from '../types';
import ExpenseCard from './ExpenseCard';
import './ExpenseList.css';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="expense-list-empty">
        <p>No expenses found. Add your first expense to get started!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense._id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ExpenseList;

