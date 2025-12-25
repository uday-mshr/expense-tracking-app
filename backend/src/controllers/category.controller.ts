import { Request, Response } from 'express';
import { ApiController, Get, Post, Put, Delete, ApiOperation, ApiParam, ApiBody, ApiResponse } from '../utils/swagger.decorators';
import categoryService from '../services/category.service';

@ApiController('/categories', ['Categories'])
export class CategoryController {
  @Get('/')
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Retrieve all categories (predefined and custom)'
  })
  @ApiResponse({
    statusCode: '200',
    description: 'List of categories',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          type: { type: 'string', enum: ['predefined', 'custom'] },
          color: { type: 'string' }
        }
      }
    }
  })
  async getCategories(_req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get category by ID',
    description: 'Retrieve a specific category by its ID'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Category ID'
  })
  @ApiResponse({
    statusCode: '200',
    description: 'Category details'
  })
  @ApiResponse({
    statusCode: '404',
    description: 'Category not found'
  })
  async getCategoryById(req: Request, res: Response) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      res.json(category);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create a new category',
    description: 'Create a custom category (predefined categories cannot be created)'
  })
  @ApiBody({
    description: 'Category data',
    schema: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 50 },
        color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }
      }
    }
  })
  @ApiResponse({
    statusCode: '201',
    description: 'Category created successfully'
  })
  @ApiResponse({
    statusCode: '400',
    description: 'Category with this name already exists'
  })
  async createCategory(req: Request, res: Response) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update a category',
    description: 'Update a custom category (predefined categories cannot be updated)'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Category ID'
  })
  @ApiBody({
    description: 'Updated category data',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 50 },
        color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }
      }
    }
  })
  @ApiResponse({
    statusCode: '200',
    description: 'Category updated successfully'
  })
  @ApiResponse({
    statusCode: '403',
    description: 'Cannot update predefined categories'
  })
  @ApiResponse({
    statusCode: '404',
    description: 'Category not found'
  })
  async updateCategory(req: Request, res: Response) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      res.json(category);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a category',
    description: 'Delete a custom category (predefined categories cannot be deleted)'
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Category ID'
  })
  @ApiResponse({
    statusCode: '200',
    description: 'Category deleted successfully'
  })
  @ApiResponse({
    statusCode: '403',
    description: 'Cannot delete predefined categories'
  })
  @ApiResponse({
    statusCode: '404',
    description: 'Category not found'
  })
  async deleteCategory(req: Request, res: Response) {
    try {
      await categoryService.deleteCategory(req.params.id);
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryController;

