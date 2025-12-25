export interface Category {
  _id: string;
  name: string;
  type: 'predefined' | 'custom';
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Expense {
  _id: string;
  amount: number;
  description: string;
  category: Category | string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateExpenseDto {
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface UpdateExpenseDto {
  amount?: number;
  description?: string;
  category?: string;
  date?: string;
}

export interface CreateCategoryDto {
  name: string;
  color?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  color?: string;
}

export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  percentage: number;
}

export interface DailySpending {
  date: string;
  amount: number;
}

export interface MonthlySummary {
  totalExpenses: number;
  averageDaily: number;
  categoryBreakdown: CategoryBreakdown[];
  dailySpending: DailySpending[];
  totalDays: number;
  month: number;
  year: number;
}

