import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Experience3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw In Animation (Entrance)
      // Selects all strokes and animates their dashoffset
      gsap.from(".scene-stroke", {
        strokeDashoffset: (i, target) => {
            // Get total length if possible, or fallback to a large number
            try { return target.getTotalLength(); } catch(e) { return 1000; }
        },
        strokeDasharray: (i, target) => {
            try { return target.getTotalLength(); } catch(e) { return 1000; }
        },
        duration: 2.5,
        ease: "power2.inOut",
        stagger: {
            amount: 1,
            from: "end"
        }
      });

      // 2. Continuous Ambient Motion
      
      // Palm Trees Sway
      gsap.to(".palm-left", {
        rotation: 3,
        transformOrigin: "bottom center",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".palm-right", {
        rotation: -4,
        transformOrigin: "bottom center",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

      // Water Ripples
      gsap.to(".water-line", {
        x: "+=8",
        y: "+=2",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            each: 0.3,
            from: "random"
        }
      });

      // Sun/Moon Glow pulse
      gsap.to(".sun-glow", {
        opacity: 0.4,
        scale: 1.1,
        transformOrigin: "center",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full max-w-4xl" 
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        {/* --- BACKGROUND ELEMENTS --- */}
        
        {/* Sun/Moon - Large circle behind everything */}
        <circle cx="400" cy="280" r="140" fill="none" stroke="#D4AF37" strokeWidth="0.5" className="scene-stroke sun-glow" opacity="0.2" />
        <circle cx="400" cy="280" r="120" fill="none" stroke="#D4AF37" strokeWidth="0.5" className="scene-stroke" opacity="0.1" />

        {/* Distant Hills */}
        <path 
            d="M50 350 Q 200 250 350 350 T 600 320 T 850 350" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="0.8" 
            className="scene-stroke"
            opacity="0.6"
        />
        <path 
            d="M0 380 Q 150 300 300 380 T 550 360 T 800 380" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="0.8" 
            className="scene-stroke"
            opacity="0.4"
        />

        {/* --- SAND / SHORELINE --- */}
        {/* Grounds the cottage - sits just below the stilts (y~400) */}
        <path 
            d="M-50 405 Q 200 390 400 400 T 850 405" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="1.5" 
            className="scene-stroke"
        />
        {/* Sand Texture Details */}
        <g className="sand-texture" opacity="0.5">
            <line x1="120" y1="410" x2="140" y2="410" stroke="#D4AF37" strokeWidth="0.5" className="scene-stroke" />
            <line x1="180" y1="402" x2="190" y2="402" stroke="#D4AF37" strokeWidth="0.5" className="scene-stroke" />
            <line x1="600" y1="408" x2="630" y2="408" stroke="#D4AF37" strokeWidth="0.5" className="scene-stroke" />
            <line x1="680" y1="415" x2="700" y2="415" stroke="#D4AF37" strokeWidth="0.5" className="scene-stroke" />
        </g>


        {/* --- MAIN COTTAGE --- */}
        <g transform="translate(320, 220)">
            {/* Stilts - extended slightly to meet new sand line */}
            <line x1="20" y1="130" x2="20" y2="185" stroke="#D4AF37" strokeWidth="1.5" className="scene-stroke" />
            <line x1="140" y1="130" x2="140" y2="185" stroke="#D4AF37" strokeWidth="1.5" className="scene-stroke" />
            <line x1="40" y1="130" x2="40" y2="175" stroke="#D4AF37" strokeWidth="1" className="scene-stroke" opacity="0.7"/>
            <line x1="120" y1="130" x2="120" y2="175" stroke="#D4AF37" strokeWidth="1" className="scene-stroke" opacity="0.7"/>

            {/* Deck / Platform */}
            <rect x="10" y="125" width="140" height="8" rx="2" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
            
            {/* Cottage Body */}
            <rect x="25" y="60" width="110" height="65" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
            
            {/* Door */}
            <rect x="65" y="85" width="30" height="40" stroke="#D4AF37" strokeWidth="1" fill="none" className="scene-stroke" />
            <line x1="80" y1="85" x2="80" y2="125" stroke="#D4AF37" strokeWidth="0.5" className="scene-stroke" />

            {/* Windows */}
            <rect x="35" y="80" width="20" height="25" stroke="#D4AF37" strokeWidth="1" fill="none" className="scene-stroke" />
            <rect x="105" y="80" width="20" height="25" stroke="#D4AF37" strokeWidth="1" fill="none" className="scene-stroke" />

            {/* Roof (Thatched Style - multiple curves) */}
            <path 
                d="M10 65 Q 80 10 150 65 L 145 75 Q 80 25 15 75 Z" 
                stroke="#D4AF37" 
                strokeWidth="2" 
                fill="none" 
                className="scene-stroke" 
                strokeLinejoin="round"
            />
            {/* Roof Details */}
            <path d="M40 50 Q 80 25 120 50" stroke="#D4AF37" strokeWidth="0.5" fill="none" className="scene-stroke" />
            <path d="M55 40 Q 80 30 105 40" stroke="#D4AF37" strokeWidth="0.5" fill="none" className="scene-stroke" />

        </g>

        {/* --- PALM TREES --- */}
        
        {/* Left Palm */}
        <g className="palm-left" transform="translate(180, 380)">
             {/* Trunk */}
            <path d="M0 0 Q 20 -100 -20 -200" stroke="#D4AF37" strokeWidth="2" fill="none" className="scene-stroke" />
            
            {/* Leaves (Fan out from top: -20, -200) */}
            <g transform="translate(-20, -200)">
                <path d="M0 0 Q -30 -20 -50 10" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
                <path d="M0 0 Q -10 -40 -30 -30" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
                <path d="M0 0 Q 20 -40 40 -20" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
                <path d="M0 0 Q 40 -10 50 20" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
                <path d="M0 0 Q 0 -50 0 -60" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
            </g>
        </g>

        {/* Right Palm */}
        <g className="palm-right" transform="translate(620, 380)">
             {/* Trunk */}
            <path d="M0 0 Q -10 -90 30 -190" stroke="#D4AF37" strokeWidth="2" fill="none" className="scene-stroke" />
            
            {/* Leaves (Fan out from top: 30, -190) */}
            <g transform="translate(30, -190)">
                <path d="M0 0 Q 30 -20 50 10" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
                <path d="M0 0 Q 10 -40 40 -30" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
                <path d="M0 0 Q -20 -40 -40 -20" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
                <path d="M0 0 Q -40 -10 -50 20" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
                 <path d="M0 0 Q 10 -50 10 -60" stroke="#D4AF37" strokeWidth="1.5" fill="none" className="scene-stroke" />
            </g>
        </g>

        {/* --- WATER / WAVES (FOREGROUND) --- */}
        {/* Layered waves in front of the sand line for depth */}
        <g transform="translate(0, 420)" opacity="0.7">
            {/* Wave 1 */}
            <path d="M100 10 Q 200 0 300 10 T 500 10 T 700 10" stroke="#D4AF37" strokeWidth="1" fill="none" className="scene-stroke water-line" />
            {/* Wave 2 */}
            <path d="M-50 25 Q 100 15 250 25 T 550 25 T 850 20" stroke="#D4AF37" strokeWidth="1" fill="none" className="scene-stroke water-line" />
            {/* Wave 3 */}
            <path d="M150 40 Q 300 30 450 40 T 750 35" stroke="#D4AF37" strokeWidth="1" fill="none" className="scene-stroke water-line" />
            {/* Wave 4 - Close Foreground */}
            <path d="M400 55 Q 500 45 600 55 T 800 50" stroke="#D4AF37" strokeWidth="1" fill="none" className="scene-stroke water-line" />
        </g>

      </svg>
    </div>
  );
};

export default Experience3DScene;
