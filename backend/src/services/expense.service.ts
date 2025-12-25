import Expense, { IExpense } from '../models/expense.model';
import Category from '../models/category.model';
import { HttpException } from '../middleware/error.middleware';

export interface ExpenseFilters {
  month?: number;
  year?: number;
  category?: string;
  startDate?: Date;
  endDate?: Date;
}

export class ExpenseService {
  async createExpense(data: {
    amount: number;
    description: string;
    category: string;
    date: Date;
  }): Promise<IExpense> {
    // Verify category exists
    const category = await Category.findById(data.category);
    if (!category) {
      throw new HttpException(404, 'Category not found', 'CATEGORY_NOT_FOUND');
    }

    const expense = new Expense({
      amount: data.amount,
      description: data.description,
      category: data.category,
      date: data.date
    });

    return expense.save();
  }

  async getExpenses(filters: ExpenseFilters = {}): Promise<IExpense[]> {
    const query: any = {};

    if (filters.month && filters.year) {
      const startDate = new Date(filters.year, filters.month - 1, 1);
      const endDate = new Date(filters.year, filters.month, 0, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    } else if (filters.startDate && filters.endDate) {
      query.date = { $gte: filters.startDate, $lte: filters.endDate };
    }

    if (filters.category) {
      query.category = filters.category;
    }

    return Expense.find(query)
      .populate('category', 'name color type')
      .sort({ date: -1, createdAt: -1 });
  }

  async getExpenseById(id: string): Promise<IExpense> {
    const expense = await Expense.findById(id).populate('category', 'name color type');
    if (!expense) {
      throw new HttpException(404, 'Expense not found', 'EXPENSE_NOT_FOUND');
    }
    return expense;
  }

  async updateExpense(id: string, data: {
    amount?: number;
    description?: string;
    category?: string;
    date?: Date;
  }): Promise<IExpense> {
    const expense = await this.getExpenseById(id);

    if (data.category) {
      const category = await Category.findById(data.category);
      if (!category) {
        throw new HttpException(404, 'Category not found', 'CATEGORY_NOT_FOUND');
      }
      expense.category = data.category as any;
    }

    if (data.amount !== undefined) expense.amount = data.amount;
    if (data.description) expense.description = data.description;
    if (data.date) expense.date = data.date;

    return expense.save();
  }

  async deleteExpense(id: string): Promise<void> {
    // Validate expense exists (throws error if not found)
    await this.getExpenseById(id);
    await Expense.findByIdAndDelete(id);
  }
}

export default new ExpenseService();

