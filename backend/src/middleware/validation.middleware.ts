import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { HttpException } from './error.middleware';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message
        }));
        throw new HttpException(400, 'Validation failed', 'VALIDATION_ERROR', details);
      }
      next(error);
    }
  };
};

// Validation schemas
export const createExpenseSchema = z.object({
  amount: z.number().positive().min(0.01),
  description: z.string().min(1).max(200),
  category: z.string().min(1),
  date: z.string().or(z.date())
});

export const updateExpenseSchema = z.object({
  amount: z.number().positive().min(0.01).optional(),
  description: z.string().min(1).max(200).optional(),
  category: z.string().min(1).optional(),
  date: z.string().or(z.date()).optional()
});

export const createCategorySchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional()
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional()
});

