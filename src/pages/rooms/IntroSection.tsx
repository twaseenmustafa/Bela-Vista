
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const IntroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from('.intro-img-container', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            }
        });

        gsap.from('.intro-text-line', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            }
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
      <section ref={containerRef} className="intro-section py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <div className="w-full md:w-1/2 intro-img-container">
                  <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-lg">
                      <img 
                          src="https://res.cloudinary.com/dshsndiup/image/upload/f_auto,q_auto,w_1600/v1770210311/488204218_651172854489328_7838867764146526144_n_zr5bgu.jpg" 
                          alt="Cozy Sunset Moment" 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                      />
                  </div>
              </div>

              <div className="w-full md:w-1/2">
                  <span className="block w-16 h-[1px] bg-gold mb-6 intro-text-line"></span>
                  <p className="intro-text-line font-sans text-xs text-gray-500 mb-6">
                      Moments in Time
                  </p>
                  <p className="intro-text-line font-serif text-3xl md:text-5xl leading-tight text-navy mb-8">
                      Our cottages are not just places to sleep; they are <span className="text-gold">vessels for experience</span>.
                  </p>
              </div>
          </div>
      </section>
  );
};

export default IntroSection;
