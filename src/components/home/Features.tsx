import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FEATURES } from '../../constants';
import Eyebrow from '../ui/Eyebrow';
import { Parallax, ParallaxImage, Dim, CURTAIN } from '../ui/Parallax';

const EASE = [0.22, 1, 0.36, 1] as const;
const LAYOUT = ['md:col-span-7 md:row-span-2', 'md:col-span-5', 'md:col-span-5'];

const Features: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  // 0 when the section's bottom reaches the viewport bottom, 1 when it leaves the top.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['end end', 'end start'] });
  const y = useTransform(p, [0, 1], [0, still ? 0 : -140]);
  const scale = useTransform(p, [0, 1], [1, still ? 1 : 0.9]);
  const fade = useTransform(p, [0.2, 0.9], [1, 0.25]);

  return (
  <motion.section ref={ref} id="experience" className={`relative z-10 bg-sand py-24 md:py-32 rounded-t-[40px] md:rounded-t-[56px] shadow-[0_-24px_60px_-12px_rgba(0,0,0,0.35)]`}>
    <Dim />
    <div className="relative container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <Parallax distance={50}><Eyebrow n="01" label="The experience" /></Parallax>
          <Parallax distance={-15}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-serif text-5xl md:text-7xl text-navy leading-[1.02] mt-5"
          >
            Designed for <span className="text-golddeep">serenity</span>
          </motion.h2>
          </Parallax>
        </div>
      </div>

      <motion.div style={{ y, scale, opacity: fade }} className="origin-top grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-5 md:h-[min(78vh,760px)]">
        {FEATURES.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 28px)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.2, ease: EASE, delay: i * 0.12 }}
            className={`group relative overflow-hidden rounded-[28px] h-[70vw] max-h-[460px] md:h-auto md:max-h-none bg-navy ${LAYOUT[i]}`}
          >
            <ParallaxImage
              src={f.image}
              alt={f.title}
              loading="lazy"
              className="transition-[filter] duration-500 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />

            <span className="absolute top-5 right-6 font-sans text-xs tabular-nums text-white/70">0{i + 1}</span>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end gap-4">
              <span className="shrink-0 w-11 h-11 rounded-full bg-black/30 border border-white/25 flex items-center justify-center transition-colors duration-500 group-hover:bg-gold group-hover:border-gold">
                <f.icon className="w-5 h-5 text-white stroke-[1.5]" />
              </span>
              <div>
                <h3 className={`font-serif text-white leading-tight ${i === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>{f.title}</h3>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </motion.section>
  );
};

export default Features;
