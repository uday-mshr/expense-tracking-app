import { Request, Response } from 'express';
import { ApiController, Get, ApiOperation, ApiQuery, ApiResponse } from '../utils/swagger.decorators';
import dashboardService from '../services/dashboard.service';

@ApiController('/dashboard', ['Dashboard'])
export class DashboardController {
  @Get('/summary')
  @ApiOperation({
    summary: 'Get monthly summary',
    description: 'Get comprehensive monthly expense summary including totals, category breakdown, and daily spending'
  })
  @ApiQuery({
    name: 'month',
    type: 'number',
    required: true,
    description: 'Month (1-12)'
  })
  @ApiQuery({
    name: 'year',
    type: 'number',
    required: true,
    description: 'Year (e.g., 2024)'
  })
  @ApiResponse({
    statusCode: '200',
    description: 'Monthly summary data',
    schema: {
      type: 'object',
      properties: {
        totalExpenses: { type: 'number' },
        averageDaily: { type: 'number' },
        categoryBreakdown: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              categoryId: { type: 'string' },
              categoryName: { type: 'string' },
              categoryColor: { type: 'string' },
              amount: { type: 'number' },
              percentage: { type: 'number' }
            }
          }
        },
        dailySpending: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: { type: 'string' },
              amount: { type: 'number' }
            }
          }
        },
        totalDays: { type: 'number' },
        month: { type: 'number' },
        year: { type: 'number' }
      }
    }
  })
  async getMonthlySummary(req: Request, res: Response): Promise<void> {
    try {
      const month = parseInt(req.query.month as string);
      const year = parseInt(req.query.year as string);

      if (!month || !year || month < 1 || month > 12) {
        res.status(400).json({
          success: false,
          message: 'Invalid month or year',
          code: 'INVALID_DATE'
        });
        return;
      }

      const summary = await dashboardService.getMonthlySummary(month, year);
      res.json(summary);
    } catch (error) {
      throw error;
    }
  }
}

export default DashboardController;

