
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';

const MapReveal: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapPathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Text Animation (CHISEL Style)
      if (textRef.current) {
          const chars = textRef.current.querySelectorAll('.char-span');
          gsap.timeline({
              scrollTrigger: {
                  trigger: textRef.current,
                  start: 'top bottom-=10%',
                  end: 'bottom top+=10%',
                  scrub: false, 
                  toggleActions: "play reverse play reverse"
              }
          })
          .from(chars, {
              duration: 1.2,
              ease: 'sine.out',
              yPercent: 300,
              autoAlpha: 0,
              stagger: {
                  each: 0.04,
                  from: 'center'
              }
          });
      }

      // 2. Map Draw Animation
      if (mapPathRef.current && textRef.current) {
          const length = mapPathRef.current.getTotalLength();
          gsap.set(mapPathRef.current, { strokeDasharray: length, strokeDashoffset: length });

          gsap.to(mapPathRef.current, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power2.inOut",
              scrollTrigger: {
                  trigger: textRef.current,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play reverse play reverse"
              }
          });
          
          // Subtle parallax for the map to make it float
          gsap.to('.st-martin-map', {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                  trigger: textRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
              }
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[80vh] flex items-center justify-center py-20 relative z-20 overflow-hidden bg-navy">
        
        {/* Map SVG Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
           <div className="st-martin-map w-[350px] h-[450px] md:w-[600px] md:h-[750px] relative">
               <svg 
                  viewBox="0 0 500 600" 
                  fill="none" 
                  className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  preserveAspectRatio="xMidYMid meet"
               >
                  <path
                      ref={mapPathRef}
                      d="M164.5,15.6l23.1,3.3l13.2,16.5h33l19.8,9.9v26.4l29.7,13.2l26.4,6.6l-6.6,29.7l-19.8,16.5l-9.9,39.6l16.5,13.2l13.2,19.8l13.2,46.2l3.3,79.2l3.3,79.2l-13.2,33l-19.8-36.3l-33-3.3l-36.3-16.5l-36.3,19.8l-49.5-13.2l-36.3-19.8l-23.1-33l-9.9-36.3l16.5-33l-19.8-33l16.5-29.7l-19.8-33l9.9-36.3l-16.5-33l16.5-33l-13.2-26.4l23.1-13.2l9.9-33L164.5,15.6z"
                      stroke="#D4AF37"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
               </svg>
               <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full scale-75 animate-pulse"></div>
           </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy z-0"></div>

        {/* Reveal Text */}
        <div className="relative z-10 text-center mix-blend-screen" ref={textRef}>
            <div className="text-gold font-chisel text-5xl md:text-8xl lg:text-9xl leading-none uppercase tracking-wider drop-shadow-2xl">
               <SplitText text="BELA VISTA" />
            </div>
            <div className="text-white font-serif text-xl md:text-3xl tracking-[0.5em] uppercase mt-4 opacity-80">
               SAINT MARTIN
            </div>
        </div>
    </section>
  );
};

export default MapReveal;
