import Category, { ICategory } from '../models/category.model';
import { HttpException } from '../middleware/error.middleware';

export class CategoryService {
  async getAllCategories(): Promise<ICategory[]> {
    return Category.find().sort({ type: 1, name: 1 });
  }

  async getCategoryById(id: string): Promise<ICategory> {
    const category = await Category.findById(id);
    if (!category) {
      throw new HttpException(404, 'Category not found', 'CATEGORY_NOT_FOUND');
    }
    return category;
  }

  async createCategory(data: { name: string; color?: string }): Promise<ICategory> {
    // Check if category with same name exists
    const existing = await Category.findOne({ name: data.name });
    if (existing) {
      throw new HttpException(400, 'Category with this name already exists', 'CATEGORY_EXISTS');
    }

    const category = new Category({
      name: data.name,
      type: 'custom',
      color: data.color || '#6366f1'
    });

    return category.save();
  }

  async updateCategory(id: string, data: { name?: string; color?: string }): Promise<ICategory> {
    const category = await this.getCategoryById(id);

    // Prevent updating predefined categories
    if (category.type === 'predefined') {
      throw new HttpException(403, 'Cannot update predefined categories', 'CANNOT_UPDATE_PREDEFINED');
    }

    // Check if new name conflicts with existing category
    if (data.name && data.name !== category.name) {
      const existing = await Category.findOne({ name: data.name });
      if (existing) {
        throw new HttpException(400, 'Category with this name already exists', 'CATEGORY_EXISTS');
      }
    }

    if (data.name) category.name = data.name;
    if (data.color) category.color = data.color;

    return category.save();
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.getCategoryById(id);

    // Prevent deleting predefined categories
    if (category.type === 'predefined') {
      throw new HttpException(403, 'Cannot delete predefined categories', 'CANNOT_DELETE_PREDEFINED');
    }

    await Category.findByIdAndDelete(id);
  }
}

export default new CategoryService();

