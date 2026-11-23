import React, { useRef } from 'react';
import Button from './Button';
import { openBooking } from '../constants';
import ReturnHomeButton from './ReturnHomeButton';
import './Experience.css';
import ExperienceHero from './experience/ExperienceHero';
import VideoFeature from './experience/VideoFeature';
import VlogList from './experience/VlogList';
import HorizontalScrollGallery from './experience/HorizontalScrollGallery';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
      const event = new CustomEvent('app-navigate', { detail: { view: 'home' } });
      window.dispatchEvent(event);
  };

  return (
    <div ref={containerRef} className="exp-container bg-sand min-h-screen w-full relative overflow-hidden">
      
      <ExperienceHero />

      <VideoFeature />

      <VlogList />

      <HorizontalScrollGallery />

      {/* --- FOOTER CTA --- */}
      <section className="py-32 bg-sand text-center px-4">
          <p className="text-gray-400 text-xs mb-6">Your journey begins</p>
          <h2 className="text-5xl md:text-7xl font-serif text-navy mb-12">Bela Vista</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <Button onClick={openBooking} className="bg-navy text-white h-14 w-52">Check availability</Button>
              <ReturnHomeButton onClick={handleBack} />
          </div>
      </section>

    </div>
  );
};

export default Experience;