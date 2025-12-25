import 'reflect-metadata';
import App from './app';
import dotenv from 'dotenv';
import { loadSchemas } from './utils/schema-loader';
import database from './config/database';
import ExpenseController from './controllers/expense.controller';
import CategoryController from './controllers/category.controller';
import DashboardController from './controllers/dashboard.controller';
import { expenseRoutes } from './routes/expense.route';
import { categoryRoutes } from './routes/category.route';
import { dashboardRoutes } from './routes/dashboard.route';

dotenv.config();

const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

(async () => {
    try {
        // Connect to MongoDB
        await database.connect();

        // Load schemas if needed
        console.log('Loading schemas...');
        loadSchemas({
          'ErrorResponse': {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
              code: { type: 'string' }
            }
          },
          'Expense': {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              amount: { type: 'number' },
              description: { type: 'string' },
              category: { type: 'object' },
              date: { type: 'string', format: 'date-time' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          },
          'Category': {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              type: { type: 'string', enum: ['predefined', 'custom'] },
              color: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          },
          'MonthlySummary': {
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
        });

        // Initialize the application
        const controllers = [ExpenseController, CategoryController, DashboardController];
        const routes = [expenseRoutes, categoryRoutes, dashboardRoutes];
        const app = new App(controllers, routes, Number(PORT), API_VERSION);

        // Start the server
        app.listen();
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down');
    await database.disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\nTerminating');
    await database.disconnect();
    process.exit(0);
});
