import api from './api';
import { MonthlySummary } from '../types';

export const dashboardService = {
  getMonthlySummary: async (month: number, year: number): Promise<MonthlySummary> => {
    const response = await api.get<MonthlySummary>(`/dashboard/summary?month=${month}&year=${year}`);
    return response.data;
  },
};

