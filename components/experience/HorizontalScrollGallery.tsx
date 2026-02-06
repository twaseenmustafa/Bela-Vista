import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../Button';
import { galleryItems } from './experienceData';

const HorizontalScrollGallery: React.FC = () => {
  const hScrollRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        if (window.innerWidth > 768 && hScrollRef.current) {
            const track = hScrollRef.current.querySelector('.h-scroll-track') as HTMLElement;
            const items = gsap.utils.toArray('.h-scroll-item');
            
            gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: hScrollRef.current,
                    start: "top top",
                    end: "+=300%",
                    // Changed from 1 to true for instant response with Lenis
                    scrub: true, 
                    pin: true
                }
            });

            items.forEach((item: any) => {
                const img = item.querySelector('img');
                gsap.to(img, {
                    scale: 1.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: gsap.getTweensOf(track)[0] as gsap.core.Tween,
                        start: "left right",
                        end: "right left",
                        scrub: true
                    }
                });
            });
        }
    }, hScrollRef);

    return () => ctx.revert();
  }, []);

  return (
      <section ref={hScrollRef} className="h-scroll-section bg-navy text-white relative">
         <div className="absolute top-10 left-6 md:left-20 z-10">
             <span className="text-gold uppercase tracking-widest text-xs">Visual Diary</span>
             <h2 className="text-3xl md:text-4xl font-serif mt-2">Moments in Time</h2>
         </div>

         <div className="h-scroll-track">
             <div className="h-scroll-item flex items-center justify-center bg-transparent border border-white/10">
                 <p className="p-8 text-center font-serif text-2xl italic text-gray-400">
                     "The sea, once it casts its spell, holds one in its net of wonder forever."
                 </p>
             </div>

             {galleryItems.map((src, i) => (
                 <div key={i} className="h-scroll-item overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out">
                     <img 
                        src={src} 
                        alt="Gallery" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                     />
                 </div>
             ))}

             <div className="h-scroll-item flex flex-col items-center justify-center bg-white/5">
                 <h3 className="font-serif text-2xl mb-4">Plan Your Escape</h3>
                 <Button variant="outline" onClick={() => console.log('Book')}>Book Now</Button>
             </div>
         </div>
      </section>
  );
};

export default HorizontalScrollGallery;