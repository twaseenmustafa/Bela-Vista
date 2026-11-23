import React, { useLayoutEffect, useRef, useCallback, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollStack.css';

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardPositionsRef = useRef<number[]>([]); 
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'string' ? parseFloat(value) : value;
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller?.scrollTop || 0,
        containerHeight: scroller?.clientHeight || 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement;
    let endElementTop = 0;
    
    if (endElement) {
        let el = endElement;
        while(el) {
            endElementTop += el.offsetTop;
            el = el.offsetParent as HTMLElement;
        }
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      let cardTop = cardPositionsRef.current[i];
      if (cardTop === undefined) {
         let el = card;
         cardTop = 0;
         while(el) {
             cardTop += el.offsetTop;
             el = el.offsetParent as HTMLElement;
         }
      }

      const pinEnd = endElementTop - containerHeight;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Gradual depth: each later card adds 0..1 as it rises into its stack slot.
      let depth = 0;
      if (blurAmount) {
        for (let j = i + 1; j < cardsRef.current.length; j++) {
          const jStart = (cardPositionsRef.current[j] ?? 0) - stackPositionPx - itemStackDistance * j;
          depth += calculateProgress(scrollTop, jStart - containerHeight * 0.5, jStart);
        }
      }
      const blur = Math.min(depth * blurAmount, blurAmount * 2);

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
        depth: Math.round(depth * 1000) / 1000
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1 ||
        Math.abs(lastTransform.depth - newTransform.depth) > 0.005;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        card.style.setProperty('--depth', String(newTransform.depth));

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      // Global Lenis is handled in App.tsx. 
      // We just attach the scroll listener to the window/lenis event if possible.
      // But since App.tsx handles Lenis and Lenis triggers 'scroll', 
      // we can listen to the GSAP update which Lenis drives.
      // Or simply listen to window scroll events which Lenis updates.
      window.addEventListener('scroll', handleScroll);
      return null;
    } else {
      // Local Lenis for nested scrolling
      const scroller = scrollerRef.current;
      if (!scroller) return null;

      const lenis = new Lenis({
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    const calculatePositions = () => {
        if (!cardsRef.current.length) return;
        
        cardPositionsRef.current = cardsRef.current.map(card => {
             let el = card;
             let top = 0;
             while(el) {
                 top += el.offsetTop;
                 el = el.offsetParent as HTMLElement;
             }
             return top;
        });
        
        updateCardTransforms();
    };

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.zIndex = `${i + 1}`; 
    });

    setupLenis();
    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    const timeoutId = setTimeout(calculatePositions, 500);

    return () => {
      window.removeEventListener('resize', calculatePositions);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    handleScroll
  ]);

  return (
    <div className={`scroll-stack-scroller ${useWindowScroll ? 'window-scroll' : ''} ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;