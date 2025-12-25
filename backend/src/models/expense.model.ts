import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
  amount: number;
  description: string;
  category: mongoose.Types.ObjectId;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0.01
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Indexes for faster queries
ExpenseSchema.index({ date: -1 });
ExpenseSchema.index({ category: 1 });
ExpenseSchema.index({ date: -1, category: 1 });

export default mongoose.model<IExpense>('Expense', ExpenseSchema);

