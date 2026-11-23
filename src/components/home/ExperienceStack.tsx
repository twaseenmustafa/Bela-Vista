import React, { useEffect, useRef } from 'react';
import ScrollStack from './ScrollStack';
import ScrollStackItem from './ScrollStackItem';
import Eyebrow from '../ui/Eyebrow';
import { Parallax, Dim, CURTAIN } from '../ui/Parallax';

const VID = 'https://res.cloudinary.com/dshsndiup/video/upload';
// ~50% lighter than the originals, no audio track (cards are muted anyway).
const src = (id: string) => `${VID}/q_auto:eco,w_1280,c_limit,ac_none/${id}.mp4`;
const original = (id: string) => `${VID}/${id}.mp4`;
const poster = (id: string) => `${VID}/so_0,f_auto,q_auto,w_1280/${id}.jpg`;

const experiences = [
  { title: 'The Ocean Sanctuary', tag: 'Wake to the waves', id: 'v1770199234/AQMO7oqPPpDHQZ6yJfBDCBLONn_MZK7EYa2l5QrqgHwAw3aPwJSbDcsGOjupJ0dTkONgbJGWf-SoWSzYGWcCYvriXro3_Uo4lqlBKNWcRP_GRQ_n4hhur' },
  { title: 'Golden Horizons', tag: 'Sunset, every evening', id: 'v1770200037/AQPV5-eSgj_s3ghPXdTgASV_yZ8GvANAvY0zDae2HMOaDEK6LmsJv9PL3jFkrM1I5VQrpOk0S19yeFP1BgDxagGqe3PRLTUYDjaR7-wnLaWwUg_zdpj9n' },
  { title: 'Tropical Serenity', tag: 'Palms and sea breeze', id: 'v1770202151/AQOTh9kD8NTgaBCZOz6X8RQpzzjfpSU79X6psSnNbSM-adjkcBpL_LbewXUBabttXtjKzsYmzYj7rQleMe52_cyc1UhnNRlaD4ynTbvfq2GXXg_i1z9ox' },
  { title: 'Crystal Waters', tag: 'Coral and clear sea', id: 'v1770202157/AQOUVLIRzCWf7WyDYci5GvnYASZR9c2X-bgbOG4_ckPWWwFqyJ1O-dys-cJdvAKcrLkixOqcqUINcgexEHlVHMB_g6e1rD7I764J6lDsPsOzQw_skqibt' },
  { title: 'Island Rhythms', tag: 'Time at your pace', id: 'v1770202990/AQNmgYPbImUOXUIYs8W3LpEGKjrdvzOBXP7vkCWmV7FRS4lTH8ok5ncjt6rVZhHz9IMkRXf7h-T41lvoiII7eNP6B8Egr9xY2C27MX3oFmg_FQ_aizqnv' },
];

// Loads and plays only near the viewport; poster covers the gap so a card is never blank.
const StackVideo: React.FC<{ id: string }> = ({ id }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        v.preload = 'auto';
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }, { rootMargin: '300px 0px' });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover"
      src={src(id)}
      poster={poster(id)}
      muted
      loop
      playsInline
      preload="none"
      onError={e => {
        const v = e.currentTarget;
        if (v.src !== original(id)) { v.src = original(id); v.play().catch(() => {}); }
      }}
    />
  );
};

const ExperienceStack: React.FC = () => (
  <section className={`relative z-30 bg-sand ${CURTAIN}`}>
    <Dim max={0.5} />
    <div className="relative container mx-auto px-6 pt-24 md:pt-32 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <Parallax distance={50}><Eyebrow n="04" label="Moments" /></Parallax>
        <Parallax distance={-15}><h2 className="font-serif text-5xl md:text-7xl text-navy leading-[1.02] mt-5">
          Unforgettable <span className="text-golddeep">moments</span>
        </h2></Parallax>
      </div>
    </div>

    <div className="container mx-auto px-0 md:px-4">
      <ScrollStack
        itemDistance={120}
        itemStackDistance={24}
        stackPosition="12%"
        useWindowScroll
        itemScale={0.03}
        blurAmount={3}
      >
        {experiences.map((exp, i) => (
          <ScrollStackItem key={exp.id} style={{ height: 'min(68vh, 720px)' }} itemClassName="bg-navy">
            <StackVideo id={exp.id} />
            {/* Legibility + depth: cards sink into shadow as new ones cover them */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/20 pointer-events-none" />
            <div
              className="absolute inset-0 bg-navy pointer-events-none"
              style={{ opacity: 'calc(min(var(--depth, 0), 2) * 0.3)' }}
            />

            <div className="absolute top-6 inset-x-6 md:top-8 md:inset-x-10 flex justify-end text-white/80 font-sans text-sm">
              <span className="tabular-nums">0{i + 1} / 0{experiences.length}</span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h3 className="text-white font-serif text-4xl md:text-7xl leading-none drop-shadow-lg">{exp.title}</h3>
              <span className="self-start md:self-auto px-4 py-2 rounded-full bg-black/30 border border-white/25 text-white text-sm">
                {exp.tag}
              </span>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  </section>
);

export default ExperienceStack;
