import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Magnetic from './Magnetic';

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

  // Scroll depth: the video sinks and swells slowly, the headline lifts away faster and fades.
  const heroRef = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  // Measured from page scroll: a sticky element's own offset never changes, so target-based progress would stay at 0.
  const { scrollY } = useScroll();
  const p = useTransform(scrollY, v => Math.min(1, v / window.innerHeight));
  const dim = useTransform(p, [0, 1], [0, 0.6]);
  const vidY = useTransform(p, [0, 1], ['0%', still ? '0%' : '-5%']);
  const vidScale = useTransform(p, [0, 1], [1, still ? 1 : 1.16]);
  // Headline lines and subline separate as they rise: top line fastest, paragraph slowest.
  const line1Y = useTransform(p, [0, 1], [0, still ? 0 : -280]);
  const line2Y = useTransform(p, [0, 1], [0, still ? 0 : -170]);
  const subY = useTransform(p, [0, 1], [0, still ? 0 : -60]);
  const textFade = useTransform(p, [0, 0.55], [1, 0]);
  // The hero stays stuck behind the page; stop decoding video once it is fully covered.
  useMotionValueEvent(p, 'change', v => {
    const vid = videoRef.current;
    if (!vid) return;
    if (v >= 1 && !vid.paused) vid.pause();
    else if (v < 1 && vid.paused) vid.play().catch(() => {});
  });

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
    <section ref={heroRef} id="hero" className="sticky top-0 h-screen min-h-[700px] w-full flex flex-col justify-center overflow-hidden bg-navy">
      {/* Background HTML5 Video */}
      <motion.div style={{ y: vidY, scale: vidScale }} className="absolute inset-0 z-0 overflow-hidden select-none bg-navy">
        <video 
          ref={videoRef}
          className="absolute -top-[14%] left-0 w-full h-[128%] object-cover"
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
      </motion.div>


      {/* Content */}
      <motion.div style={{ opacity: textFade }} className="relative z-10 container mx-auto px-6 text-center pointer-events-none">
        <motion.h1 
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-lg"
          variants={containerVariants}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
        >
          <motion.span style={{ y: line1Y }} className="block">
            {line1.split(" ").map((word, w) => (
              // Letters animate one by one, but a word never breaks across lines.
              <span key={w} className="inline-block whitespace-nowrap">
                {(w ? " " + word : word).split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.span>
          <motion.span style={{ y: line2Y }} className="block">
            {line2.split(" ").map((word, w) => (
              // Letters animate one by one, but a word never breaks across lines.
              <span key={w} className="inline-block whitespace-nowrap">
                {(w ? " " + word : word).split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block whitespace-pre">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.span>
        </motion.h1>
        
        <motion.p 
          style={{ y: subY }}
          className="text-white/90 font-sans text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={startAnimation ? "visible" : "hidden"}
          transition={{ delay: 1.5 }}
        >
          Escape to the pristine shores of the only coral island in Bangladesh. 
          Experience serenity, refined comfort, and the art of doing nothing.
        </motion.p>
      </motion.div>
      <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-black pointer-events-none z-[6]" aria-hidden />

      {/* Sound toggle */}
      <motion.div
        className="absolute bottom-10 right-6 md:right-10 z-30"
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2 }}
      >
        <Magnetic>
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            aria-pressed={!isMuted}
            className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors"
          >
            <span className="hidden md:block font-sans text-xs">{isMuted ? 'Sound off' : 'Sound on'}</span>
            <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-navy">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </span>
          </button>
        </Magnetic>
      </motion.div>

      {/* Scroll cue: a line that fills downward */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 text-white/70 pointer-events-none"
        style={{ opacity: textFade }}
      >
        <span className="font-sans text-xs">Scroll</span>
        <span className="relative w-px h-12 bg-white/20 overflow-hidden">
          <span className="absolute inset-0 bg-white origin-top animate-[cue_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
        </span>
        <style>{`@keyframes cue { 0% { transform: scaleY(0); transform-origin: top } 45% { transform: scaleY(1); transform-origin: top } 55% { transform: scaleY(1); transform-origin: bottom } 100% { transform: scaleY(0); transform-origin: bottom } }`}</style>
      </motion.div>
    </section>
  );
};

export default Hero;