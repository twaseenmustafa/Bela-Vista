import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

// Pulls its child a few px toward the cursor and springs back on leave.
const Magnetic: React.FC<{ strength?: number; className?: string; children: React.ReactNode }> = ({ strength = 0.3, className = 'inline-block', children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });

  const move = (e: React.MouseEvent) => {
    if (still || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={reset} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
};

export default Magnetic;
