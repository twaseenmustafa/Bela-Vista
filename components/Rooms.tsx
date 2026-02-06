import React from 'react';
import Button from './Button';
import ReturnHomeButton from './ReturnHomeButton';
import RoomsHero from './rooms/RoomsHero';
import IntroSection from './rooms/IntroSection';
import RoomShowcase from './rooms/RoomShowcase';
import Amenities from './rooms/Amenities';

const Rooms: React.FC = () => {

  const handleBack = () => {
    const event = new CustomEvent('app-navigate', { detail: { view: 'home' } });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-sand min-h-screen text-navy overflow-hidden">
      
      <RoomsHero />

      <IntroSection />

      <RoomShowcase />

      <Amenities />

      {/* --- NEXT STEP CTA --- */}
      <section className="h-[70vh] flex flex-col items-center justify-center bg-sand text-center px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-40"></div>
          
          <h2 className="font-serif text-5xl md:text-8xl text-navy mb-8 z-10 relative">
              Ready to <span className="italic text-gold">Unplug?</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-8 z-10 relative items-center">
             <Button onClick={() => {}} className="bg-navy text-white px-12 py-4 text-lg h-14">Check Availability</Button>
             <ReturnHomeButton onClick={handleBack} />
          </div>
      </section>

    </div>
  );
};

export default Rooms;