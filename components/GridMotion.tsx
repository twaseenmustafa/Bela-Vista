import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GridMotionProps {
  items?: (string | React.ReactNode)[];
  gradientColor?: string;
  onItemClick?: (item: string) => void;
}

const GridMotion: React.FC<GridMotionProps> = ({ items = [], gradientColor = 'black', onItemClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeTweens = useRef<gsap.core.Tween[]>([]);
  const mouseXRef = useRef(window.innerWidth / 2);

  // Default items if none provided
  // Calculate items per row dynamically to fit all items
  const totalItems = items.length > 0 ? items.length : 28;
  const defaultItems = Array.from({ length: 28 }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items : defaultItems;

  // Split items into 4 rows
  const rows = [];
  const itemsPerRow = Math.ceil(combinedItems.length / 4);
  
  for (let i = 0; i < 4; i++) {
    rows.push(combinedItems.slice(i * itemsPerRow, (i + 1) * itemsPerRow));
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    // 1. Mouse parallax: one reusable quickTo per row instead of a new tween every frame.
    const maxMoveAmount = 300;
    const inertiaFactors = [0.6, 0.4, 0.3, 0.2];
    const movers = rowRefs.current.map((row, index) =>
      row ? gsap.quickTo(row, 'x', { duration: 0.8 + inertiaFactors[index % inertiaFactors.length], ease: 'power3.out' }) : null
    );
    const updateParallax = () => {
      movers.forEach((move, index) => {
        if (!move) return;
        const direction = index % 2 === 0 ? 1 : -1;
        move(((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction);
      });
    };

    // 2. Infinite marquee: even rows drift right, odd rows left.
    marqueeTweens.current = rowRefs.current.map((row, index) => {
      if (!row) return null;
      const isRight = index % 2 === 0;
      gsap.set(row, { xPercent: isRight ? -50 : 0 });
      return gsap.to(row, { xPercent: isRight ? 0 : -50, duration: 40 + index * 5, ease: 'none', repeat: -1 });
    }).filter(Boolean) as gsap.core.Tween[];

    gsap.ticker.add(updateParallax);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateParallax);
      marqueeTweens.current.forEach(t => t.kill());
      marqueeTweens.current = [];
    };
  }, [items]);

  const handleMouseEnter = () => {
    // Pause auto-scroll on hover
    marqueeTweens.current.forEach(t => t.pause());
  };

  const handleMouseLeave = () => {
    // Resume auto-scroll on leave
    marqueeTweens.current.forEach(t => t.play());
  };

  return (
    <div className="noscroll loading" ref={containerRef}>
      <section
        className="intro"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="gridMotion-container">
          {rows.map((rowItems, rowIndex) => (
            <div key={rowIndex} className="row" ref={el => { rowRefs.current[rowIndex] = el; }}>
              {/* Render items twice to allow seamless looping */}
              {[...rowItems, ...rowItems].map((content, itemIndex) => (
                <div key={itemIndex} className="row__item">
                  <div className="row__item-inner" style={{ backgroundColor: '#111' }}>
                    {typeof content === 'string' && content.startsWith('http') ? (
                      <div
                        className="row__item-img cursor-pointer transition-transform hover:scale-105"
                        style={{
                          backgroundImage: `url(${content})`
                        }}
                        role="button"
                        aria-label="Preview photo"
                        onClick={() => onItemClick && onItemClick(content)}
                      ></div>
                    ) : (
                      <div className="row__item-content">{content}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="fullview"></div>
      </section>
    </div>
  );
};

export default GridMotion;