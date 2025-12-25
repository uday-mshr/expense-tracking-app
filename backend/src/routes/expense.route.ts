import { Router } from 'express';
import ExpenseController from '../controllers/expense.controller';
import { validate, createExpenseSchema, updateExpenseSchema } from '../middleware/validation.middleware';

const router = Router();
const expenseController = new ExpenseController();

router.post('/', validate(createExpenseSchema), expenseController.createExpense.bind(expenseController));
router.get('/', expenseController.getExpenses.bind(expenseController));
router.get('/:id', expenseController.getExpenseById.bind(expenseController));
router.put('/:id', validate(updateExpenseSchema), expenseController.updateExpense.bind(expenseController));
router.delete('/:id', expenseController.deleteExpense.bind(expenseController));

export const expenseRoutes = {
  path: '/expenses',
  router,
};

