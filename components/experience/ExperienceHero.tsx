
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const ExperienceHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const titleSpans = gsap.utils.toArray('.exp-hero-text span');
        gsap.to(titleSpans, {
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.2
        });

        gsap.to('.hero-line', {
            width: '100%',
            duration: 1.5,
            ease: "power2.inOut",
            delay: 0.5
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
      <section ref={containerRef} className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20 relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100/50 -z-10 hidden md:block"></div>
          
          <div className="max-w-5xl">
            <span className="block text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-8 font-medium">
                The Philosophy
            </span>
            <h1 className="font-serif text-[12vw] md:text-[8vw] text-navy leading-[0.85] tracking-tight mb-12">
                <div className="exp-hero-text"><span>The Art of</span></div>
                <div className="exp-hero-text"><span className="italic font-light">Slow Living</span></div>
            </h1>
            
            <div className="hero-line w-0 h-[1px] bg-navy/20 mb-12"></div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <p className="font-sans text-gray-500 max-w-md text-sm md:text-base leading-relaxed">
                    At Bela Vista, we curate moments, not just stays. 
                    It is a dialogue between the untouched nature of Saint Martin 
                    and the refined comfort of modern hospitality.
                </p>
                <div className="animate-pulse">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-navy">
                        <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                </div>
            </div>
          </div>
      </section>
  );
};

export default ExperienceHero;
