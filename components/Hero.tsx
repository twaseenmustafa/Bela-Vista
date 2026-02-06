import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const line1 = "Where the Bay of Bengal";
  const line2 = "Meets Luxury.";

  // Optimized Video URL
  const cloudinaryVideoUrl = "https://res.cloudinary.com/dshsndiup/video/upload/q_auto,f_auto/v1770185509/Bela_Vista_Resort_Saint_Martin_-_Avijatrik_Travel_1080p_h264_eqn5vk.mp4";
  
  // Poster Image
  const posterUrl = "https://res.cloudinary.com/dshsndiup/video/upload/so_0,q_auto,f_auto/v1770185509/Bela_Vista_Resort_Saint_Martin_-_Avijatrik_Travel_1080p_h264_eqn5vk.jpg";

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set initial volume to 50%
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const newState = !isMuted;
      setIsMuted(newState);
      if (!newState) {
        videoRef.current.volume = 0.5;
      }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: [0.2, 0.65, 0.3, 0.9] as const
      }
    }
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="hero" className="relative h-screen min-h-[700px] w-full flex flex-col justify-center overflow-hidden bg-navy">
      {/* Background HTML5 Video */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none bg-navy">
        <video 
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster={posterUrl}
          autoPlay 
          muted={isMuted} // Controlled by state
          loop 
          playsInline
          preload="auto"
        >
          <source src={cloudinaryVideoUrl} type="video/mp4" />
        </video>

        {/* Overlays for better text contrast */}
        <div className="absolute inset-0 bg-navy/20 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pointer-events-none">
        <motion.h1 
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-lg"
          variants={containerVariants}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
        >
          <span className="block">
            {line1.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">
                {char}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {line2.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-white/90 font-sans text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
          transition={{ delay: 1.5 }}
        >
          Escape to the pristine shores of the only coral island in Bangladesh. 
          Experience serenity, refined comfort, and the art of doing nothing.
        </motion.p>
      </div>

      {/* Custom Switch Button (User Provided) */}
      <motion.div
        className="absolute bottom-12 right-6 z-30 pointer-events-auto origin-bottom-right"
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2 }}
      >
        <style>{`
          .switch {
            --input-focus: #D4AF37; /* Gold */
            --bg-color: #fff;
            --main-color: #0F172A; /* Navy */
            --input-out-of-focus: #F1F5F9; /* Slate 100 */
            
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            width: 70px;
            height: 36px;
          }

          .toggle {
            opacity: 0;
            width: 0;
            height: 0;
            position: absolute;
          }

          .slider {
            box-sizing: border-box;
            border-radius: 100px;
            border: 2px solid var(--main-color);
            box-shadow: 4px 4px var(--main-color);
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--input-out-of-focus);
            transition: 0.3s;
            overflow: hidden;
          }

          .knob {
            box-sizing: border-box;
            height: 30px;
            width: 30px;
            position: absolute;
            left: 2px;
            bottom: 1px;
            border: 2px solid var(--main-color);
            border-radius: 100px;
            background-color: var(--bg-color);
            color: var(--main-color);
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            line-height: 25px;
            transition: 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .toggle:checked + .slider {
            background-color: var(--input-focus);
            transform: translateX(-32px);
          }

          .toggle:checked + .slider .knob {
            transform: translateX(32px);
          }
        `}</style>
        
        <label className="switch" aria-label={isMuted ? "Unmute video" : "Mute video"}>
          <input 
            className="toggle" 
            type="checkbox" 
            checked={!isMuted} 
            onChange={toggleSound} 
          />
          <span className="slider">
             <div className="knob">
               {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
             </div>
          </span>
        </label>
      </motion.div>
    </section>
  );
};

export default Hero;