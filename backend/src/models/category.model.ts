import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  type: 'predefined' | 'custom';
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 1,
      maxlength: 50
    },
    type: {
      type: String,
      enum: ['predefined', 'custom'],
      required: true,
      default: 'custom'
    },
    color: {
      type: String,
      required: true,
      default: '#6366f1' // Default indigo color
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
CategorySchema.index({ name: 1 });
CategorySchema.index({ type: 1 });

export default mongoose.model<ICategory>('Category', CategorySchema);

