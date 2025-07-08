import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="header-content">
        <div className="header-icon">
          <CheckCircle size={32} />
          <Sparkles className="sparkle" size={16} />
        </div>
        <div className="header-text">
          <h1>Smart To-Do</h1>
          <p>Prilojenie za trackvane na zadacite</p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 