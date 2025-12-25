import React, { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';
import { Category, CreateCategoryDto } from '../types';
import './Categories.css';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [formData, setFormData] = useState({ name: '', color: '#6366f1' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCategory(undefined);
    setFormData({ name: '', color: '#6366f1' });
    setShowForm(true);
  };

  const handleEdit = (category: Category) => {
    if (category.type === 'predefined') {
      alert('Cannot edit predefined categories');
      return;
    }
    setEditingCategory(category);
    setFormData({ name: category.name, color: category.color });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const category = categories.find((c) => c._id === id);
    if (category?.type === 'predefined') {
      alert('Cannot delete predefined categories');
      return;
    }
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(id);
        loadCategories();
      } catch (err: any) {
        alert(err.message || 'Failed to delete category');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory._id, formData);
      } else {
        await categoryService.create(formData);
      }
      setShowForm(false);
      setEditingCategory(undefined);
      setFormData({ name: '', color: '#6366f1' });
      loadCategories();
    } catch (err: any) {
      alert(err.message || 'Failed to save category');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(undefined);
    setFormData({ name: '', color: '#6366f1' });
  };

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Categories</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Add Category
        </button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  maxLength={50}
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Color *</label>
                <input
                  type="color"
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? 'Update' : 'Create'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="categories-list">
        <div className="categories-section">
          <h2>Predefined Categories</h2>
          <div className="category-grid">
            {categories
              .filter((c) => c.type === 'predefined')
              .map((category) => (
                <div key={category._id} className="category-card">
                  <div
                    className="category-color"
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="category-info">
                    <h3>{category.name}</h3>
                    <span className="category-type">Predefined</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="categories-section">
          <h2>Custom Categories</h2>
          {categories.filter((c) => c.type === 'custom').length === 0 ? (
            <p className="empty-message">No custom categories. Create one to get started!</p>
          ) : (
            <div className="category-grid">
              {categories
                .filter((c) => c.type === 'custom')
                .map((category) => (
                  <div key={category._id} className="category-card">
                    <div
                      className="category-color"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="category-info">
                      <h3>{category.name}</h3>
                      <span className="category-type">Custom</span>
                    </div>
                    <div className="category-actions">
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => handleEdit(category)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(category._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;

