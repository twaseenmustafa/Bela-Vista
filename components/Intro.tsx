import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Experience3DScene from './Experience3DScene';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLogoRef = useRef<SVGSVGElement>(null);
  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // 1. Lock Body Scroll during Intro
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        onComplete: () => {
          exitAnimation();
        }
      });

      const initialLogoPaths = initialLogoRef.current?.querySelectorAll('path');

      // --- INITIAL STATES ---
      gsap.set(containerRef.current, { yPercent: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 });
      gsap.set(titleRef.current, { yPercent: 0, opacity: 0 }); 
      
      // Subtitle starts down
      gsap.set(subtitleRef.current, { yPercent: 100, opacity: 0 });
      
      // Scene Wrapper starts hidden
      gsap.set(sceneWrapperRef.current, { opacity: 0, y: 20, scale: 0.95 });

      // Prepare Initial Logo Drawing
      if (initialLogoPaths) {
        gsap.set(initialLogoPaths, { 
          strokeDasharray: (i, target) => target.getTotalLength(),
          strokeDashoffset: (i, target) => target.getTotalLength(),
          opacity: 1
        });
      }

      // --- ANIMATION SEQUENCE ---

      timeline.current
        // 1. [0s - 1.5s] Fast Entry: Logo Draws + Title Fades
        .to(initialLogoPaths, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.1
        })
        .to(titleRef.current, {
          opacity: 1,
          duration: 1.0,
          ease: "power2.out"
        }, "<+0.3")

        // 2. [1.5s - 2.0s] Short Pause
        .to({}, { duration: 0.4 })

        // 3. [2.0s - 3.0s] THE SWAP
        // Initial Logo Fades Out
        .to(initialLogoRef.current, {
           opacity: 0,
           scale: 0.9,
           duration: 0.6,
           ease: "power2.in"
        }, "swap")
        // Title Slides Up & Out
        .to(titleRef.current, {
          yPercent: -150, 
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut"
        }, "swap")
        // Subtitle Slides Up & In
        .to(subtitleRef.current, {
          yPercent: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, "swap+=0.2")
        // New Scene Appears (Fade Up)
        .to(sceneWrapperRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out" 
        }, "swap+=0.1")
        
        // 4. Hold to view the Experience (Reduced from 3.5s to 2.0s)
        .to({}, { duration: 2.0 }); 

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const exitAnimation = () => {
    if (!containerRef.current) return;
    
    // Kill main timeline to prevent conflicts
    timeline.current?.kill();

    const exitTl = gsap.timeline({
      onComplete: onComplete
    });

    // 1. Fade out content
    exitTl.to([subtitleRef.current, sceneWrapperRef.current, titleRef.current, initialLogoRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in"
    })
    // 2. Curtain Raise with Curve
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    })
    // 3. Curve Effect
    .to(containerRef.current, {
        borderBottomLeftRadius: "50% 15vh", 
        borderBottomRightRadius: "50% 15vh",
        duration: 0.8,
        ease: "power2.in"
    }, "<0.1"); 
  };

  const handleSkip = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    exitAnimation();
  };

  return (
    <div 
      ref={containerRef} 
      onClick={handleSkip}
      className="fixed inset-0 z-[100] w-full h-screen bg-navy flex flex-col items-center justify-center overflow-hidden cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center text-center px-6 relative z-10 w-full max-w-4xl h-[60vh]">
         
         {/* CONTAINER FOR LOGOS */}
         <div className="relative w-full h-64 md:h-80 flex items-center justify-center mb-8">
             
             {/* 1. INITIAL ABSTRACT LOGO */}
             <svg 
                ref={initialLogoRef}
                viewBox="0 0 200 200" 
                fill="none" 
                className="absolute w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
             >
                <path d="M50 100 C 50 60, 150 60, 150 100" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                <path d="M 20 130 Q 50 110 80 130 T 140 130 T 200 130" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                <path d="M 85 130 L 85 90 L 115 90 L 115 130" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                <path d="M 75 90 L 100 65 L 125 90" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
             </svg>

             {/* 2. 2D EXPERIENCE SCENE (Replaces 3D) */}
             <div 
                ref={sceneWrapperRef}
                className="absolute w-full h-full opacity-0 flex items-center justify-center"
             >
                <Experience3DScene />
             </div>

         </div>

         {/* Text Container */}
         <div ref={textContainerRef} className="relative h-24 md:h-32 w-full overflow-hidden flex items-center justify-center">
             
             {/* 1. Main Title */}
             <h1 
                ref={titleRef}
                className="absolute font-majestic text-6xl md:text-8xl text-white tracking-wide leading-none"
             >
                Bela Vista
             </h1>

             {/* 2. Secondary Message */}
             <p 
                ref={subtitleRef}
                className="absolute font-serif text-gold text-sm md:text-xl lg:text-2xl tracking-[0.2em] italic font-light leading-relaxed max-w-2xl text-center"
             >
                It's not about exploration;<br/>it's about experience.
             </p>

         </div>

      </div>
    </div>
  );
};

export default Intro;