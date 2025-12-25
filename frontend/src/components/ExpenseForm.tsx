import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Expense, Category, CreateExpenseDto } from '../types';
import CategorySelector from './CategorySelector';
import './ExpenseForm.css';

const expenseSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be at least 0.01'),
  description: z.string().min(1, 'Description is required').max(200, 'Description must be less than 200 characters'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
});

interface ExpenseFormProps {
  expense?: Expense;
  categories: Category[];
  onSubmit: (data: CreateExpenseDto) => void;
  onCancel: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
  categories,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateExpenseDto>({
    resolver: zodResolver(expenseSchema),
    defaultValues: expense
      ? {
          amount: expense.amount,
          description: expense.description,
          category: typeof expense.category === 'string' ? expense.category : expense.category._id,
          date: expense.date.split('T')[0],
        }
      : {
          date: new Date().toISOString().split('T')[0],
        },
  });

  const selectedCategory = watch('category');

  const handleCategoryChange = (categoryId: string) => {
    setValue('category', categoryId);
  };

  const onSubmitForm = (data: CreateExpenseDto) => {
    onSubmit(data);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="form-group">
        <label htmlFor="amount">Amount *</label>
        <input
          type="number"
          id="amount"
          step="0.01"
          min="0.01"
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && <span className="error">{errors.amount.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <input
          type="text"
          id="description"
          {...register('description')}
        />
        {errors.description && <span className="error">{errors.description.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <CategorySelector
          categories={categories}
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
          required
        />
        {errors.category && <span className="error">{errors.category.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date *</label>
        <input
          type="date"
          id="date"
          {...register('date')}
        />
        {errors.date && <span className="error">{errors.date.message}</span>}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {expense ? 'Update' : 'Create'} Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;

