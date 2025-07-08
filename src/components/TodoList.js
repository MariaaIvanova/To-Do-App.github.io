import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Trash2, Edit3, Calendar, Tag, AlertTriangle, Clock } from 'lucide-react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onEdit, filter }) => {
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  const priorityIcons = {
    low: <AlertTriangle size={14} />,
    medium: <AlertTriangle size={14} />,
    high: <AlertTriangle size={14} />
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && due.toDateString() !== today.toDateString();
  };

  if (todos.length === 0) {
    return (
      <motion.div 
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="empty-icon">
          <CheckCircle size={48} />
        </div>
        <h3>No tasks found</h3>
        <p>
          {filter === 'all' && 'Start by adding your first task!'}
          {filter === 'active' && 'All tasks are completed! 🎉'}
          {filter === 'completed' && 'No completed tasks yet.'}
          {filter === 'category' && 'No tasks in this category.'}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="todo-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            whileHover={{ y: -2 }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              priorityColors={priorityColors}
              priorityIcons={priorityIcons}
              formatDate={formatDate}
              isOverdue={isOverdue}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList; 