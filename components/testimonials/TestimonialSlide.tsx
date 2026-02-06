import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';
import { Review } from '../../types';
import { 
  slideVariants, 
  slideTransition, 
  swipePower, 
  swipeConfidenceThreshold, 
  quoteContainerVariants, 
  wordVariants 
} from './animations';

interface TestimonialSlideProps {
  review: Review;
  direction: number;
  onPaginate: (newDirection: number) => void;
}

const TestimonialSlide: React.FC<TestimonialSlideProps> = ({ review, direction, onPaginate }) => {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={slideTransition}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
          onPaginate(1);
        } else if (swipe > swipeConfidenceThreshold) {
          onPaginate(-1);
        }
      }}
      className="absolute w-full max-w-5xl mx-auto px-4 cursor-grab active:cursor-grabbing"
    >
      <div className="flex flex-col items-center text-center">
          <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mb-8 text-gold/30"
          >
             <Quote size={64} className="fill-current" />
          </motion.div>
          
          {/* Split Text Animation for Quote */}
          <motion.div 
              variants={quoteContainerVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-2xl md:text-5xl leading-relaxed md:leading-tight mb-12 text-offwhite/95"
          >
              {review.text.split(" ").map((word, i) => (
                  <motion.span 
                      key={i} 
                      variants={wordVariants}
                      className="inline-block mr-[0.25em]"
                  >
                      {word}
                  </motion.span>
              ))}
          </motion.div>
          
          {/* Author Metadata */}
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col items-center space-y-3"
          >
              <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-gold text-sm border-b border-gold/30 pb-1">
                  {review.author}
              </h4>
              
              <div className="flex items-center space-x-3 text-xs font-medium text-gray-400 bg-navy-lighter px-3 py-1 rounded-full">
                <span>{review.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <a href={CONTACT_INFO.mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 hover:text-white transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-3.5 h-3.5 grayscale opacity-70 group-hover:grayscale-0" />
                  <span>Verified Review</span>
                </a>
              </div>
          </motion.div>
      </div>
    </motion.div>
  );
};

export default TestimonialSlide;
