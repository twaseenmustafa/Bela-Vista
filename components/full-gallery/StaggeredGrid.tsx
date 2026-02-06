
import React, { useLayoutEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StaggeredGridProps {
  images: string[];
}

const StaggeredGrid: React.FC<StaggeredGridProps> = ({ images }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Organize images into columns
  const columns = useMemo(() => {
    const cols: string[][] = [[], [], [], []]; // 4 columns
    images.forEach((img, i) => {
      const colIndex = i % 4;
      cols[colIndex].push(img);
    });
    return cols;
  }, [images]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const itemWrappers = gsap.utils.toArray('.staggered-column .staggered-item-wrapper') as HTMLElement[];
        
        if (itemWrappers.length > 0) {
            gsap.from(itemWrappers, {
                yPercent: 200,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                stagger: {
                    amount: 1,
                    from: "center",
                    grid: "auto"
                },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom-=10%", 
                    end: "bottom top+=10%",
                    toggleActions: "play reverse play reverse"
                }
            });
        }

        const cols = gsap.utils.toArray('.staggered-column') as HTMLElement[];
        if (cols.length > 0) {
            cols.forEach((col, i) => {
                const speed = i % 2 === 0 ? 50 : 150;
                
                gsap.to(col, {
                    y: -speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
      <section className="py-20 relative z-20 bg-navy min-h-screen" ref={containerRef}>
        <div className="staggered-grid-container px-4 md:px-12 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {columns.map((colImages, colIndex) => (
                    <div key={colIndex} className="staggered-column flex flex-col gap-8">
                        {colImages.map((img, imgIndex) => (
                            <div key={`${colIndex}-${imgIndex}`} className="staggered-item-wrapper relative overflow-hidden rounded-lg group">
                                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                                    <img 
                                        src={img} 
                                        alt="Gallery" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
      </section>
  );
};

export default StaggeredGrid;
