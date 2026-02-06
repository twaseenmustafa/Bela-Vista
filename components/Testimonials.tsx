import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { REVIEWS } from '../constants';
import { wrap } from './testimonials/animations';
import BackgroundElements from './testimonials/BackgroundElements';
import TestimonialHeader from './testimonials/TestimonialHeader';
import TestimonialControls from './testimonials/TestimonialControls';
import TestimonialSlide from './testimonials/TestimonialSlide';
import ShareButton from './testimonials/ShareButton';

const Testimonials: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // We only have N reviews, but we want infinite pages
  const reviewIndex = wrap(0, REVIEWS.length, page);

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        paginate(1);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, paginate]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section 
      className="py-28 bg-navy text-white relative overflow-hidden perspective-1000" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Background Elements */}
      <BackgroundElements page={page} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <TestimonialHeader />
          <TestimonialControls onPrev={() => paginate(-1)} onNext={() => paginate(1)} />
        </div>

        {/* Carousel Window */}
        <div className="relative w-full min-h-[450px] flex items-center justify-center perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <TestimonialSlide 
                key={page}
                review={REVIEWS[reviewIndex]}
                direction={direction}
                onPaginate={paginate}
              />
            </AnimatePresence>
        </div>

        {/* CTA to Write Review */}
        <ShareButton />

      </div>
    </section>
  );
};

export default Testimonials;
