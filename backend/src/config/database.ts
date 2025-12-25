import mongoose from 'mongoose';
import logger from '../utils/logger';
import Category from '../models/category.model';

class Database {
  private uri: string;

  constructor() {
    this.uri = process.env.MONGO_URI || 'mongodb://localhost:27017/default';
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      logger.info('Connected to MongoDB', { uri: this.uri });
      await this.seedCategories();
    } catch (error: any) {
      logger.error('MongoDB connection failed', { error: error.message });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from MongoDB');
    } catch (error: any) {
      logger.error('MongoDB disconnection failed', { error: error.message });
    }
  }

  private async seedCategories(): Promise<void> {
    try {
      const predefinedCategories = [
        { name: 'Food', type: 'predefined' as const, color: '#ef4444' },
        { name: 'Transport', type: 'predefined' as const, color: '#3b82f6' },
        { name: 'Entertainment', type: 'predefined' as const, color: '#8b5cf6' },
        { name: 'Shopping', type: 'predefined' as const, color: '#ec4899' },
        { name: 'Bills', type: 'predefined' as const, color: '#f59e0b' },
        { name: 'Healthcare', type: 'predefined' as const, color: '#10b981' },
        { name: 'Education', type: 'predefined' as const, color: '#06b6d4' },
        { name: 'Other', type: 'predefined' as const, color: '#6b7280' }
      ];

      for (const categoryData of predefinedCategories) {
        await Category.findOneAndUpdate(
          { name: categoryData.name, type: 'predefined' },
          categoryData,
          { upsert: true, new: true }
        );
      }

      logger.info('Predefined categories seeded successfully');
    } catch (error: any) {
      logger.error('Error seeding categories', { error: error.message });
    }
  }
}

export default new Database();
