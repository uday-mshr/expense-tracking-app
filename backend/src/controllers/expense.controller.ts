import { Request, Response } from 'express';
import { ApiController, Get, Post, Put, Delete, ApiOperation, ApiParam, ApiQuery, ApiBody, ApiResponse } from '../utils/swagger.decorators';
import expenseService from '../services/expense.service';

@ApiController('/expenses', ['Expenses'])
export class ExpenseController {
  @Post('/')
  @ApiOperation({
    summary: 'Create a new expense',
    description: 'Add a new expense with amount, description, category, and date'
  })
  @ApiBody({
    description: 'Expense data',
    schema: {
      type: 'object',
      required: ['amount', 'description', 'category', 'date'],
      properties: {
        amount: { type: 'number', minimum: 0.01 },
        description: { type: 'string', minLength: 1, maxLength: 200 },
        category: { type: 'string' },
        date: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({
    statusCode: '201',
    description: 'Expense created successfully',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        amount: { type: 'number' },
        description: { type: 'string' },
        category: { type: 'object' },
        date: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    statusCode: '400',
    description: 'Validation error'
  })
  async createExpense(req: Request, res: Response) {
    try {
      const { amount, description, category, date } = req.body;
      const expenseDate = date ? new Date(date) : new Date();
      const expense = await expenseService.createExpense({
        amount,
        description,
        category,
        date: expenseDate
      });
      res.status(201).json(expense);
    } catch (error) {
      throw error;
    }
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get all expenses',
    description: 'Retrieve expenses with optional filters for month, year, and category'
  })
  @ApiQuery({
    name: 'month',
    type: 'number',
    required: false,
    description: 'Month (1-12)'
  })
  @ApiQuery({
    name: 'year',
    type: 'number',
    required: false,
    description: 'Year (e.g., 2024)'
  })
  @ApiQuery({
    name: 'category',
    type: 'string',
    required: false,
    description: 'Category ID'
  })
  @ApiResponse({
    statusCode: '200',
    description: 'List of expenses',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          amount: { type: 'number' },
          description: { type: 'string' },
          category: { type: 'object' },
          date: { type: 'string' }
        }
      }
    }
  })
  async getExpenses(req: Request, res: Response) {
    try {
      const { month, year, category } = req.query;
      const filters: any = {};
      
      if (month && year) {
        filters.month = parseInt(month as string);
        filters.year = parseInt(year as string);
      }
      
      if (category) {
        filters.category = category as string;
      }

      const expenses = await expenseService.getExpenses(filters);
      res.json(expenses);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get expense by ID',
    description: 'Retrieve a specific expense by its ID'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Expense ID'
  })
  @ApiResponse({
    statusCode: '200',
    description: 'Expense details',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        amount: { type: 'number' },
        description: { type: 'string' },
        category: { type: 'object' },
        date: { type: 'string' }
      }
    }
  })
  @ApiResponse({
    statusCode: '404',
    description: 'Expense not found'
  })
  async getExpenseById(req: Request, res: Response) {
    try {
      const expense = await expenseService.getExpenseById(req.params.id);
      res.json(expense);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update an expense',
    description: 'Update expense details by ID'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Expense ID'
  })
  @ApiBody({
    description: 'Updated expense data',
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', minimum: 0.01 },
        description: { type: 'string', minLength: 1, maxLength: 200 },
        category: { type: 'string' },
        date: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({
    statusCode: '200',
    description: 'Expense updated successfully'
  })
  @ApiResponse({
    statusCode: '404',
    description: 'Expense not found'
  })
  async updateExpense(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData: any = {};
      
      if (req.body.amount !== undefined) updateData.amount = req.body.amount;
      if (req.body.description) updateData.description = req.body.description;
      if (req.body.category) updateData.category = req.body.category;
      if (req.body.date) updateData.date = new Date(req.body.date);

      const expense = await expenseService.updateExpense(id, updateData);
      res.json(expense);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete an expense',
    description: 'Delete an expense by ID'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Expense ID'
  })
  @ApiResponse({
    statusCode: '200',
    description: 'Expense deleted successfully'
  })
  @ApiResponse({
    statusCode: '404',
    description: 'Expense not found'
  })
  async deleteExpense(req: Request, res: Response) {
    try {
      await expenseService.deleteExpense(req.params.id);
      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      throw error;
    }
  }
}

export default ExpenseController;

