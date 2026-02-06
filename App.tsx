import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import ExperienceStack from './components/ExperienceStack';
import FullGallery from './components/FullGallery';
import Experience from './components/Experience';
import Intro from './components/Intro';
import Rooms from './components/Rooms';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showIntro, setShowIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Global Smooth Scroll
  useLayoutEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2, // Smoother on touch
    });

    lenisRef.current = lenis;

    // 2. Connect to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect to GSAP Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    // 4. Disable lag smoothing for instant response
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    // Custom event listener for internal navigation
    const handleNavigation = (e: CustomEvent) => {
      const view = e.detail.view;
      setCurrentView(view);
      
      // Reset scroll on view change
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Custom event for smooth scrolling to anchors
    const handleScrollRequest = (e: CustomEvent) => {
      const targetId = e.detail.targetId;
      if (targetId && lenisRef.current) {
        const element = document.getElementById(targetId);
        if (element) {
          lenisRef.current.scrollTo(element, { duration: 1.5 });
        }
      } else if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (lenisRef.current) {
        // Scroll to top
        lenisRef.current.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('app-navigate', handleNavigation as EventListener);
    window.addEventListener('lenis-scroll', handleScrollRequest as EventListener);

    return () => {
      window.removeEventListener('app-navigate', handleNavigation as EventListener);
      window.removeEventListener('lenis-scroll', handleScrollRequest as EventListener);
    };
  }, []);

  const handleIntroComplete = () => {
    setIntroFinished(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1200); 
  };

  return (
    <div className="min-h-screen bg-sand overflow-x-hidden selection:bg-gold selection:text-white relative">
      {/* Intro Overlay */}
      {showIntro && <Intro onComplete={handleIntroComplete} />}

      <Navbar currentView={currentView} />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero startAnimation={introFinished} />
            <Features />
            <Testimonials />
            <Gallery />
            <ExperienceStack />
            <Footer />
          </>
        )}

        {currentView === 'gallery' && <FullGallery />}
        
        {currentView === 'experience' && <Experience />}

        {currentView === 'rooms' && <Rooms />}
      </main>
    </div>
  );
}

export default App;