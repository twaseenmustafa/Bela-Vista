
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ThreeDGridProps {
  images: string[];
}

const ThreeDGrid: React.FC<ThreeDGridProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION (> 768px) ---
      mm.add("(min-width: 769px)", () => {
          const gridImages = gsap.utils.toArray('.grid-main .grid__item-imgwrap') as HTMLElement[];
          
          const isLeftSide = (element: HTMLElement) => {
              const elementCenter = element.getBoundingClientRect().left + element.offsetWidth / 2;
              const viewportCenter = window.innerWidth / 2;
              return elementCenter < viewportCenter;
          };

          if (gridImages.length > 0) {
              gridImages.forEach(imageWrap => {
                  const imgEl = imageWrap.querySelector('.grid__item-img');
                  const leftSide = isLeftSide(imageWrap);

                  gsap.timeline({
                      scrollTrigger: {
                          trigger: imageWrap,
                          start: 'top bottom+=10%',
                          end: 'bottom top-=25%',
                          scrub: true,
                      }
                  })
                  .from(imageWrap, {
                      startAt: { filter: 'blur(0px) brightness(100%) contrast(100%)' },
                      z: 300,
                      rotateX: 70,
                      rotateZ: leftSide ? 5 : -5,
                      xPercent: leftSide ? -40 : 40,
                      skewX: leftSide ? -20 : 20,
                      yPercent: 100,
                      filter: 'blur(7px) brightness(0%) contrast(400%)',
                      ease: 'sine',
                  })
                  .to(imageWrap, {
                      z: 300,
                      rotateX: -50,
                      rotateZ: leftSide ? -1 : 1,
                      xPercent: leftSide ? -20 : 20,
                      skewX: leftSide ? 10 : -10,
                      filter: 'blur(4px) brightness(0%) contrast(500%)',
                      ease: 'sine.in',
                  })
                  .from(imgEl, {
                      scaleY: 1.8,
                      ease: 'sine',
                  }, 0)
                  .to(imgEl, {
                      scaleY: 1.8,
                      ease: 'sine.in'
                  }, '>');
              });
          }
      });

      // --- MOBILE ANIMATION (<= 768px) ---
      mm.add("(max-width: 768px)", () => {
          const gridImages = gsap.utils.toArray('.grid-main .grid__item-imgwrap') as HTMLElement[];
          
          if (gridImages.length > 0) {
              gridImages.forEach(imageWrap => {
                  const imgEl = imageWrap.querySelector('.grid__item-img');

                  // Simple Fade & Scale Up for better mobile performance and layout
                  gsap.fromTo(imageWrap, 
                    {
                      opacity: 0,
                      scale: 0.9,
                      y: 50,
                      filter: 'blur(5px)'
                    },
                    {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      duration: 0.8,
                      ease: 'power2.out',
                      scrollTrigger: {
                          trigger: imageWrap,
                          start: 'top 85%',
                          toggleActions: 'play none none reverse'
                      }
                    }
                  );
                  
                  // Gentle Image Parallax inside container
                  if (imgEl) {
                      gsap.fromTo(imgEl,
                        { scale: 1.2, yPercent: -10 },
                        { 
                            yPercent: 10,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: imageWrap,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true
                            }
                        }
                      );
                  }
              });
          }
      });

      // --- MARQUEE (Global) ---
      if (marqueeRef.current) {
          gsap.timeline({
              scrollTrigger: {
                  trigger: '.grid-main',
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
              }
          })
          .fromTo(marqueeRef.current, {
              x: '100vw'
          }, {
              x: '-100%',
              ease: 'sine',
          });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full z-10" ref={containerRef}>
        <div className="grid-container grid-main">
            {images.map((img, i) => (
                <figure key={i} className="grid__item">
                    <div className="grid__item-imgwrap">
                        <img 
                            src={img} 
                            alt={`Gallery ${i}`}
                            className="grid__item-img" 
                            loading="lazy"
                        />
                    </div>
                </figure>
            ))}
        </div>

        {/* Marquee Text Overlay */}
        <div className="mark">
            <div className="mark__inner" ref={marqueeRef}>
                <span>BELA VISTA</span> <span>Saint Martin</span>
                <span>Serenity</span> <span>Luxury</span>
                <span>Nature</span> <span>Ocean</span>
                <span>BELA VISTA</span> <span>Saint Martin</span>
            </div>
        </div>
      </section>
  );
};

export default ThreeDGrid;
