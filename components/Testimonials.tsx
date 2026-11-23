import React, { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { REVIEWS, CONTACT_INFO, cld } from '../constants';
import { wrap, swipePower, swipeConfidenceThreshold } from './testimonials/animations';
import Eyebrow from './Eyebrow';
import { CURTAIN } from './Parallax';
import Magnetic from './Magnetic';

const EASE = [0.22, 1, 0.36, 1] as const;
const AVG = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);
const BG = cld('v1770210311/488204218_651172854489328_7838867764146526144_n_zr5bgu.jpg', 'f_auto,q_auto,w_1920');

const Stars: React.FC<{ n: number; size?: number }> = ({ n, size = 14 }) => (
  <span className="flex gap-1" aria-label={`${n} out of 5 stars`}>
    {[0, 1, 2, 3, 4].map(i => (
      <Star key={i} size={size} className={i < Math.round(n) ? 'fill-gold text-gold' : 'text-white/25'} />
    ))}
  </span>
);

const Testimonials: React.FC = () => {
  const [[page, dir], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const idx = wrap(0, REVIEWS.length, page);
  const review = REVIEWS[idx];

  // Parallax depth: photo drifts slowest, the title column next, the quote fastest.
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const d = (a: number, b: number) => (still ? [0, 0] : [a, b]);
  const bgY = useTransform(p, [0, 1], d(-90, 90));
  const leftY = useTransform(p, [0, 1], d(140, -80));
  const rightY = useTransform(p, [0, 1], d(240, -140));
  const reveal = useTransform(p, [0.05, 0.35], [0, 1]);

  const paginate = useCallback((d: number) => setPage(([p]) => [p + d, d]), []);

  const btn = 'w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-[background-color,border-color,color,transform] duration-300 active:scale-90 hover:bg-gold hover:border-gold hover:text-navy';

  return (
    <section
      ref={ref}
      className={`relative z-20 bg-navy text-white py-24 md:py-36 overflow-hidden ${CURTAIN}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.img src={BG} alt="" loading="lazy" style={{ y: bgY }} className="absolute inset-x-0 -top-[90px] w-full h-[calc(100%+180px)] object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />

      <div className="relative container mx-auto px-6 grid md:grid-cols-12 gap-14 md:gap-10 items-center">
        {/* Left: identity + rating + controls */}
        <motion.div style={{ y: leftY, opacity: reveal }} className="md:col-span-4">
          <Eyebrow n="02" label="Guest voices" light />
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] mt-5">
            Stories from <span className="text-gold">the West Beach</span>
          </h2>

          <a href={CONTACT_INFO.mapsLink} target="_blank" rel="noopener noreferrer" className="group mt-10 flex items-center gap-5">
            <span className="font-serif text-7xl leading-none">{AVG}</span>
            <span className="flex flex-col gap-2">
              <Stars n={Number(AVG)} />
              <span className="text-sm text-white/60 group-hover:text-gold transition-colors">
                Google reviews ↗
              </span>
            </span>
          </a>

          <div className="mt-10 flex items-center gap-3">
            <Magnetic><button className={btn} onClick={() => paginate(-1)} aria-label="Previous review"><ArrowLeft size={18} /></button></Magnetic>
            <Magnetic><button className={btn} onClick={() => paginate(1)} aria-label="Next review"><ArrowRight size={18} /></button></Magnetic>
            <span className="ml-4 font-sans text-sm text-white/60 tabular-nums">
              <span className="text-white">{String(idx + 1).padStart(2, '0')}</span> / {String(REVIEWS.length).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        {/* Right: the quote */}
        <motion.div style={{ y: rightY, opacity: reveal }} className="md:col-span-7 md:col-start-6">
          <div className="relative min-h-[240px] md:min-h-[280px]">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={page}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 60 : -60, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir >= 0 ? -60 : 60, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, { offset, velocity }) => {
                  const s = swipePower(offset.x, velocity.x);
                  if (s < -swipeConfidenceThreshold) paginate(1);
                  else if (s > swipeConfidenceThreshold) paginate(-1);
                }}
                className="cursor-grab active:cursor-grabbing select-none"
              >
                <span className="block font-serif text-gold text-8xl leading-[0.5] h-10" aria-hidden>“</span>
                <blockquote className="font-serif text-3xl md:text-5xl leading-tight text-white/95">
                  {review.text.split(/(?<=[.!?])\s/)[0]}
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-gold text-navy font-serif text-xl flex items-center justify-center">
                    {review.author[0]}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-sans text-sm font-semibold tracking-wide">{review.author}</span>
                    <span className="flex items-center gap-3 text-xs text-white/60">
                      <Stars n={review.rating} size={11} /> {review.date}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Autoplay progress: when the bar fills, advance. Hover pauses it. */}
          <div className="mt-12 h-px bg-white/15 overflow-hidden">
            <div
              key={page}
              className="h-full bg-gold origin-left"
              style={{ animation: 'tm-progress 6s linear forwards', animationPlayState: paused ? 'paused' : 'running' }}
              onAnimationEnd={() => paginate(1)}
            />
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes tm-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
};

export default Testimonials;
