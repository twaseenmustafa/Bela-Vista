import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialHeader: React.FC = () => {
  // Container controls the stagger of the characters
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  // "Scroll Float" character animation: 
  // Starts lower, rotated, blurry, and transparent.
  // Floats up to natural position, un-rotates, un-blurs.
  const charVariants: Variants = {
    hidden: { 
      y: '120%', 
      rotate: 15, 
      opacity: 0,
      filter: 'blur(8px)'
    },
    visible: {
      y: '0%',
      rotate: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] // Dreamy, slow ease-out
      }
    }
  };

  const splitText = (text: string, className: string = "") => {
    return text.split("").map((char, i) => (
      <motion.span
        key={i}
        variants={charVariants}
        className={`inline-block whitespace-pre ${className}`}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <div className="text-left relative">
      {/* Label and Stars - Fade in gently */}
      <motion.div 
         initial={{ opacity: 0, y: 15 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6 }}
         className="flex items-center space-x-3 mb-4"
      >
         <span className="bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase text-gold">
           Guest Feedback
         </span>
         <div className="flex space-x-0.5">
           {[1,2,3,4,5].map(i => (
               <Star key={i} className="w-3 h-3 text-gold fill-current" />
           ))}
         </div>
      </motion.div>

      {/* Main Title with Scroll Float Animation */}
      <motion.h2 
         className="font-serif text-3xl md:text-5xl leading-[1.1]"
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-10%" }}
         variants={containerVariants}
      >
         {/* Line 1: Stories from */}
         {/* Overflow hidden wrapper is crucial for the "floating up from inside" look */}
         <div className="overflow-hidden pb-1">
            {splitText("Stories from")}
         </div>
         
         {/* Line 2: The West Beach */}
         <div className="overflow-hidden pb-1 -mt-1 md:-mt-2">
            {splitText("The West Beach", "text-gold italic font-light")}
         </div>
      </motion.h2>
    </div>
  );
};

export default TestimonialHeader;