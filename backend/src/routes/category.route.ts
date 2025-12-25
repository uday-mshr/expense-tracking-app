import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import { validate, createCategorySchema, updateCategorySchema } from '../middleware/validation.middleware';

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getCategories.bind(categoryController));
router.get('/:id', categoryController.getCategoryById.bind(categoryController));
router.post('/', validate(createCategorySchema), categoryController.createCategory.bind(categoryController));
router.put('/:id', validate(updateCategorySchema), categoryController.updateCategory.bind(categoryController));
router.delete('/:id', categoryController.deleteCategory.bind(categoryController));

export const categoryRoutes = {
  path: '/categories',
  router,
};

