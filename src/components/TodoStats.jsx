import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle, Clock, Target } from 'lucide-react';
import './TodoStats.css';

const TodoStats = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statItems = [
    {
      icon: Target,
      label: 'Total Tasks',
      value: stats.total,
      color: '#667eea'
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: stats.completed,
      color: '#10b981'
    },
    {
      icon: Clock,
      label: 'Active',
      value: stats.active,
      color: '#f59e0b'
    }
  ];

  return (
    <motion.div 
      className="stats-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="stats-header">
        <BarChart3 size={20} />
        <h3>Progress Overview</h3>
      </div>
      
      <div className="stats-grid">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            <div className="stat-icon" style={{ color: item.color }}>
              <item.icon size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {stats.total > 0 && (
        <motion.div 
          className="progress-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="progress-header">
            <span>Completion Rate</span>
            <span>{completionRate}%</span>
          </div>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TodoStats; 