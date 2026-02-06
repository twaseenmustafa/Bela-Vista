import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';

const Marquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // We have 3 copies of the content. 
      // Moving the container by -33.333% moves it exactly the width of one copy.
      // This creates a seamless loop when it resets to 0.
      gsap.to(trackRef.current, {
        xPercent: -33.33333, 
        repeat: -1,
        duration: 40, // Slow, elegant speed
        ease: "linear",
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const phrases = [
    "Private Beach Access",
    "Oceanfront Cottages",
    "Fresh Seafood BBQ",
    "Panoramic Sunsets",
    "Eco-Luxury Living",
    "Serene Atmosphere"
  ];

  const MarqueeContent = () => (
    <div className="flex items-center gap-16 px-8">
      {phrases.map((text, i) => (
        <React.Fragment key={i}>
          <span className="text-4xl md:text-7xl font-serif text-navy/90 whitespace-nowrap tracking-tight">
            {text}
          </span>
          <Star className="w-8 h-8 md:w-12 md:h-12 text-gold fill-gold shrink-0 animate-pulse" />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section className="bg-sand py-20 md:py-32 overflow-hidden border-b border-navy/5 relative z-20">
      <div className="relative w-full overflow-hidden">
        <div ref={trackRef} className="flex w-max">
           {/* Three copies ensure seamless looping on all screen sizes */}
           <MarqueeContent />
           <MarqueeContent />
           <MarqueeContent />
        </div>
      </div>
    </section>
  );
};

export default Marquee;