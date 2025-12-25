import React from 'react';
import { Category } from '../types';
import './CategorySelector.css';

interface CategorySelectorProps {
  categories: Category[];
  value: string;
  onChange: (categoryId: string) => void;
  required?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  value,
  onChange,
  required = false,
}) => {
  return (
    <select
      className="category-selector"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;

