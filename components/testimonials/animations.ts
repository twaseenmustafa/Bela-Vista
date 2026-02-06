export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Physics-based transitions for snappy feel
export const slideTransition = {
  type: "spring" as const,
  stiffness: 400, // Higher stiffness = faster
  damping: 30,    // Controlled bounce
  mass: 0.8       // Lighter mass = quicker acceleration
};

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.85,
    filter: "blur(12px)",
    rotateY: direction > 0 ? 25 : -25, 
    zIndex: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    rotateY: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.85,
    filter: "blur(12px)",
    rotateY: direction < 0 ? 25 : -25,
  })
};

// Staggered text reveal animation
export const quoteContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.015, // Very fast stagger per word
      delayChildren: 0.2
    }
  }
};

export const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    filter: "blur(10px)",
    scale: 1.1 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 200
    }
  }
};

export const swipeConfidenceThreshold = 10000;
export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};