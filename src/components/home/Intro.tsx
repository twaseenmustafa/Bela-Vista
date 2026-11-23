import React, { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroProps {
  onComplete: () => void;
}

const WORD = 'Bela Vista';
const MIN_MS = 2200; // never flash
const MAX_MS = 3200; // never stall on slow networks

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const exited = useRef(false);
  const exitRef = useRef<() => void>(() => {});
  const doneRef = useRef(onComplete);
  doneRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progress = { v: 0 };
    const render = () => {
      const v = Math.round(progress.v);
      if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.v / 100})`;
    };

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('.intro-mark path');
      paths.forEach(p => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to(paths, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: 0.08 })
        .from('.intro-char', { yPercent: 110, duration: 1.1, stagger: 0.035 }, 0.25)
        .from('.intro-fade', { opacity: 0, y: 12, duration: 0.9, stagger: 0.08 }, 0.7);

      // Fake-but-honest progress: eases toward 90 while we wait, completes when ready.
      gsap.to(progress, { v: 90, duration: MIN_MS / 1000, ease: 'power1.out', onUpdate: render });
    }, rootRef);

    exitRef.current = () => {
      if (exited.current) return;
      exited.current = true;
      gsap.killTweensOf(progress);
      gsap.timeline()
        .to(progress, { v: 100, duration: 0.35, ease: 'power2.out', onUpdate: render })
        .to(contentRef.current, { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' }, '+=0.1')
        .add(() => doneRef.current(), '-=0.1')
        .to(rootRef.current, { yPercent: -100, duration: reduce ? 0.4 : 1.0, ease: 'expo.inOut' }, '<')
        .fromTo(tailRef.current, { scaleY: 1 }, { scaleY: 0, duration: 1.0, ease: 'power3.inOut' }, '<');
    };

    const loaded = new Promise<void>(res =>
      document.readyState === 'complete' ? res() : window.addEventListener('load', () => res(), { once: true })
    );
    const minWait = new Promise(res => setTimeout(res, reduce ? 300 : MIN_MS));
    const maxWait = new Promise(res => setTimeout(res, MAX_MS));
    Promise.race([Promise.all([loaded, document.fonts.ready, minWait]), maxWait]).then(() => exitRef.current());

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      onClick={() => exitRef.current()}
      className="fixed inset-0 z-[100] bg-navy text-white cursor-pointer will-change-transform"
      aria-label="Loading Bela Vista"
    >
      {/* Curved trailing edge: shrinks as the curtain lifts */}
      <div
        ref={tailRef}
        className="absolute left-[-10%] top-full w-[120%] h-[16vh] bg-navy rounded-b-[50%] origin-top pointer-events-none"
      />

      <div ref={contentRef} className="relative h-full flex flex-col items-center justify-center px-6">
        <svg viewBox="0 0 200 160" fill="none" className="intro-mark w-20 md:w-24 mb-8" aria-hidden>
          <path d="M50 100 C 50 60, 150 60, 150 100" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 10 130 Q 40 110 70 130 T 130 130 T 190 130" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 85 130 L 85 92 L 115 92 L 115 130" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 75 92 L 100 67 L 125 92" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <h1 className="font-majestic text-6xl md:text-8xl tracking-wide leading-none overflow-hidden pb-2" aria-label={WORD}>
          {WORD.split('').map((c, i) => (
            <span key={i} className="intro-char inline-block whitespace-pre" aria-hidden>{c}</span>
          ))}
        </h1>

        <p className="intro-fade mt-6 font-serif italic text-gold/90 text-base md:text-xl tracking-wide text-center">
          Not about exploration. About experience.
        </p>

        {/* Bottom meta row */}
        <div className="absolute bottom-8 inset-x-6 md:inset-x-12 flex items-end justify-between text-xs md:text-sm text-white/60 font-sans">
          <span className="intro-fade">20.60° N · 92.33° E</span>
          <span className="intro-fade hidden md:block">Saint Martin's Island</span>
          <span className="intro-fade tabular-nums text-white/80"><span ref={counterRef}>000</span></span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/10">
          <div ref={barRef} className="h-full bg-gold origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
