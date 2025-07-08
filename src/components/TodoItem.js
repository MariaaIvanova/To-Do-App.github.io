import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Trash2, Edit3, Calendar, Tag, AlertTriangle, Clock, Save, X } from 'lucide-react';
import './TodoItem.css';

const TodoItem = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit, 
  priorityColors, 
  priorityIcons, 
  formatDate, 
  isOverdue 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const dueDate = formatDate(todo.dueDate);
  const overdue = isOverdue(todo.dueDate);

  return (
    <motion.div 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}
      layout
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="todo-content">
        <div 
          className="priority-indicator"
          style={{ backgroundColor: priorityColors[todo.priority] }}
        >
          {priorityIcons[todo.priority]}
        </div>

        <button
          className="toggle-button"
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? (
            <CheckCircle size={24} className="check-icon" />
          ) : (
            <Circle size={24} className="circle-icon" />
          )}
        </button>

        <div className="todo-text-section">
          {isEditing ? (
            <div className="edit-container">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="edit-input"
                autoFocus
              />
              <div className="edit-actions">
                <button
                  onClick={handleEdit}
                  className="save-button"
                  aria-label="Save changes"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="cancel-edit-button"
                  aria-label="Cancel edit"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="todo-text">
              <span className={`text ${todo.completed ? 'completed-text' : ''}`}>
                {todo.text}
              </span>
              
              <div className="todo-metadata">
                {todo.category && (
                  <div className="metadata-item category">
                    <Tag size={12} />
                    <span>{todo.category}</span>
                  </div>
                )}
                
                {dueDate && (
                  <div className={`metadata-item due-date ${overdue ? 'overdue' : ''}`}>
                    <Calendar size={12} />
                    <span>{dueDate}</span>
                    {overdue && <Clock size={12} className="overdue-icon" />}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="action-button edit-button"
              aria-label="Edit task"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="action-button delete-button"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem; 