import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Calendar, Tag, AlertTriangle } from 'lucide-react';
import './TodoForm.css';

const TodoForm = ({ onAddTodo, searchTerm, onSearchChange, filter, onFilterChange, categories }) => {
  const [formData, setFormData] = useState({
    text: '',
    category: '',
    priority: 'medium',
    dueDate: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text.trim()) {
      onAddTodo(formData);
      setFormData({ text: '', category: '', priority: 'medium', dueDate: '' });
      setShowForm(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  return (
    <motion.div 
      className="todo-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="search-filter-section">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <Filter size={20} className="filter-icon" />
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            {categories.length > 0 && <option value="category">By Category</option>}
          </select>
        </div>
      </div>

      {filter === 'category' && (
        <motion.div 
          className="category-filter"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <select
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="category-select"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </motion.div>
      )}

      <div className="add-task-section">
        {!showForm ? (
          <motion.button
            className="add-task-button"
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={20} />
            Add New Task
          </motion.button>
        ) : (
          <motion.form
            className="task-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="form-row">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={formData.text}
                onChange={(e) => handleInputChange('text', e.target.value)}
                className="task-input"
                autoFocus
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <Tag size={16} />
                <input
                  type="text"
                  placeholder="Category (optional)"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <AlertTriangle size={16} />
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="form-select"
                  style={{ borderColor: priorityColors[formData.priority] }}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              
              <div className="form-group">
                <Calendar size={16} />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                <Plus size={16} />
                Add Task
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default TodoForm; 