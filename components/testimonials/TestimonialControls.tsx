import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

const TestimonialControls: React.FC<TestimonialControlsProps> = ({ onPrev, onNext }) => {
  return (
    <div className="flex space-x-4 mt-8 md:mt-0 z-20">
      <motion.button 
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 1)', borderColor: 'rgba(212, 175, 55, 1)', color: '#0F172A' }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrev}
        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/80 transition-colors backdrop-blur-sm"
        aria-label="Previous Review"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 1)', borderColor: 'rgba(212, 175, 55, 1)', color: '#0F172A' }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/80 transition-colors backdrop-blur-sm"
         aria-label="Next Review"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default TestimonialControls;
