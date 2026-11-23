export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export const swipeConfidenceThreshold = 10000;
export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
