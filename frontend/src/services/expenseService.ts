import api from './api';
import { Expense, CreateExpenseDto, UpdateExpenseDto } from '../types';

export const expenseService = {
  getAll: async (filters?: { month?: number; year?: number; category?: string }): Promise<Expense[]> => {
    const params = new URLSearchParams();
    if (filters?.month) params.append('month', filters.month.toString());
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.category) params.append('category', filters.category);
    
    const response = await api.get<Expense[]>(`/expenses?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Expense> => {
    const response = await api.get<Expense>(`/expenses/${id}`);
    return response.data;
  },

  create: async (data: CreateExpenseDto): Promise<Expense> => {
    const response = await api.post<Expense>('/expenses', data);
    return response.data;
  },

  update: async (id: string, data: UpdateExpenseDto): Promise<Expense> => {
    const response = await api.put<Expense>(`/expenses/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },
};

