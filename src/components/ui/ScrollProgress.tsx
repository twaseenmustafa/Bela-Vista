import React from 'react';
import { motion, useScroll } from 'framer-motion';

// Replaces the native scrollbar (hidden in index.css): a 2px gold line on the right edge.
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className="fixed top-0 right-0 h-full w-[2px] z-[70] pointer-events-none mix-blend-difference" aria-hidden>
      <motion.div className="h-full w-full bg-gold origin-top" style={{ scaleY: scrollYProgress }} />
    </div>
  );
};

export default ScrollProgress;
