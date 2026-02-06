import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundElementsProps {
  page: number;
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ page }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold rounded-full blur-[150px] opacity-10 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[180px] opacity-10 -translate-x-1/3 translate-y-1/3"></div>
      {/* Parallax Text Effect */}
      <motion.div 
        key={page}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20vw] whitespace-nowrap text-white pointer-events-none select-none"
      >
        VOICES
      </motion.div>
    </div>
  );
};

export default BackgroundElements;
