import Expense from '../models/expense.model';

export interface MonthlySummary {
  totalExpenses: number;
  averageDaily: number;
  categoryBreakdown: Array<{
    categoryId: string;
    categoryName: string;
    categoryColor: string;
    amount: number;
    percentage: number;
  }>;
  dailySpending: Array<{
    date: string;
    amount: number;
  }>;
  totalDays: number;
  month: number;
  year: number;
}

export class DashboardService {
  async getMonthlySummary(month: number, year: number): Promise<MonthlySummary> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Get all expenses for the month
    const expenses = await Expense.find({
      date: { $gte: startDate, $lte: endDate }
    }).populate('category', 'name color');

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate days in month
    const totalDays = new Date(year, month, 0).getDate();

    // Calculate average daily spending
    const averageDaily = totalDays > 0 ? totalExpenses / totalDays : 0;

    // Category breakdown
    const categoryMap = new Map<string, { name: string; color: string; amount: number }>();

    expenses.forEach((expense) => {
      const category = expense.category as any;
      const categoryId = category._id.toString();
      const existing = categoryMap.get(categoryId) || {
        name: category.name,
        color: category.color,
        amount: 0
      };
      existing.amount += expense.amount;
      categoryMap.set(categoryId, existing);
    });

    const categoryBreakdown = Array.from(categoryMap.entries()).map(([categoryId, data]) => ({
      categoryId,
      categoryName: data.name,
      categoryColor: data.color,
      amount: data.amount,
      percentage: totalExpenses > 0 ? (data.amount / totalExpenses) * 100 : 0
    })).sort((a, b) => b.amount - a.amount);

    // Daily spending
    const dailyMap = new Map<string, number>();

    expenses.forEach((expense) => {
      const dateKey = expense.date.toISOString().split('T')[0];
      const existing = dailyMap.get(dateKey) || 0;
      dailyMap.set(dateKey, existing + expense.amount);
    });

    // Fill in all days of the month
    const dailySpending: Array<{ date: string; amount: number }> = [];
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month - 1, day);
      const dateKey = date.toISOString().split('T')[0];
      dailySpending.push({
        date: dateKey,
        amount: dailyMap.get(dateKey) || 0
      });
    }

    return {
      totalExpenses,
      averageDaily,
      categoryBreakdown,
      dailySpending,
      totalDays,
      month,
      year
    };
  }
}

export default new DashboardService();

