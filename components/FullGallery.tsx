import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FullGallery.css';
import ReturnHomeButton from './ReturnHomeButton';
import { allImages } from './full-gallery/galleryData';
import ThreeDGrid from './full-gallery/ThreeDGrid';
import MapReveal from './full-gallery/MapReveal';
import StaggeredGrid from './full-gallery/StaggeredGrid';


const FullGallery: React.FC = () => {

  useLayoutEffect(() => {
    // Rely on global Lenis. ScrollTrigger refresh usually helps on mount.
    ScrollTrigger.refresh();
  }, []);

  const handleBack = () => {
    const event = new CustomEvent('app-navigate', { detail: { view: 'home' } });
    window.dispatchEvent(event);
  };

  return (
    <div className="full-gallery-page bg-navy min-h-screen text-white overflow-hidden">
      
      {/* Intro Section */}
      <div className="min-h-screen flex flex-col items-center justify-center relative text-center px-4 pt-20">
        <h1 className="font-serif text-5xl md:text-8xl mb-6 text-white leading-[0.9]">
          Visual <br/> <span className="text-gold">Symphony</span>
        </h1>
        <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
          Scroll to explore
        </p>
      </div>

      <ThreeDGrid images={allImages} />
      
      <MapReveal />

      <StaggeredGrid images={allImages} />

      {/* Footer Area */}
      <footer className="py-32 text-center bg-navy relative z-30">
          <p className="text-gray-500 text-sm mb-8">End of collection</p>
          <ReturnHomeButton onClick={handleBack} className="mx-auto" />
      </footer>

    </div>
  );
};

export default FullGallery;