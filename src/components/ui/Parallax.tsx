import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type Offset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];

// Moves its children `distance` px against the scroll while it crosses the viewport.
// Positive = travels faster than the page (feels closer), negative = slower (sits deeper).
export const Parallax: React.FC<{
  distance?: number;
  offset?: Offset;
  className?: string;
  children: React.ReactNode;
}> = ({ distance = 24, offset = ['start end', 'end start'] as Offset, className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [distance, -distance]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
};

// Shade that deepens as its section scrolls away, so the next section reads as rising over it.
// Kept light: a heavy shade read as washed-out grey cards rather than depth.
export const Dim: React.FC<{ max?: number }> = ({ max = 0.18 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['end end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, max]);
  return <motion.div ref={ref} style={{ opacity }} className="absolute inset-0 rounded-[inherit] bg-black pointer-events-none z-[6]" aria-hidden />;
};

// Shared shape for a section that slides up over the one before it.
export const CURTAIN = '-mt-12 md:-mt-16 rounded-t-[40px] md:rounded-t-[56px] shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.35)]';

// Image that pans inside its clipped frame: the frame scrolls, the picture lags behind it.
export const ParallaxImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className = '', ...img }) => {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], still ? ['0%', '0%'] : ['-6%', '6%']);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img {...(img as object)} style={{ y, scale: 1.14 }} className={`w-full h-full object-cover ${className}`} />
    </div>
  );
};
