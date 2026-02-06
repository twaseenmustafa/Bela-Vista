
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const RoomsHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const heroLines = gsap.utils.toArray('.hero-line-anim');
        
        gsap.timeline()
        .from(heroLines, {
            yPercent: 100,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.15,
            delay: 0.2
        })
        .from('.hero-sub', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        .from('.hero-img-reveal', {
            clipPath: 'inset(100% 0% 0% 0%)', 
            scale: 1.1,
            duration: 1.8,
            ease: "expo.inOut"
        }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
      <section ref={containerRef} className="relative h-[90vh] flex flex-col justify-end pb-20 px-6 md:px-20 overflow-hidden">
          <div className="absolute inset-0 z-0 hero-img-reveal">
              <img 
                src="https://res.cloudinary.com/dshsndiup/image/upload/v1770210257/612779072_871556415784303_6792620734759867195_n_z97fxb.jpg" 
                alt="Room Hero" 
                className="w-full h-full object-cover object-[50%_75%]"
              />
              <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative z-10 text-white max-w-4xl">
              <p className="hero-sub font-hand text-3xl md:text-4xl mb-6 text-[#F9E8BC] [text-shadow:0px_2px_4px_rgba(0,0,0,0.8)] tracking-wider">The Collection</p>
              <h1 className="font-serif text-[10vw] leading-[0.85] tracking-tight">
                  <div className="overflow-hidden"><span className="hero-line-anim block">Sanctuaries</span></div>
                  <div className="overflow-hidden"><span className="hero-line-anim block italic font-light">of Silence</span></div>
              </h1>
          </div>
      </section>
  );
};

export default RoomsHero;
