import React, { useState, useRef, useLayoutEffect } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BookingBar: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
        // Initial state: Hidden below the screen
        gsap.set(barRef.current, { yPercent: 120, autoAlpha: 0 });

        gsap.to(barRef.current, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out", // Smooth "luxury" ease
            scrollTrigger: {
                trigger: "body",
                // Start animation when user scrolls 80% of the viewport height (past Hero)
                start: "80vh top", 
                toggleActions: "play reverse play reverse", // Animates in and out smoothly
                // Removed scrub to prevent laggy feeling on button interaction
            }
        });
    }, barRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
        ref={barRef}
        className="fixed bottom-6 left-0 right-0 z-50 px-4 md:px-0 flex justify-center pointer-events-auto"
    >
      <div className="bg-white/95 backdrop-blur-lg border border-white/20 rounded-full shadow-2xl p-3 md:p-4 w-full max-w-5xl mx-auto transition-all duration-300 hover:shadow-gold/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* Check In */}
          <div className="flex flex-col px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Check In</label>
            <div className="relative group">
              <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gold w-3.5 h-3.5" />
              <input 
                type="date" 
                className="w-full pl-6 text-sm text-navy focus:outline-none font-sans bg-transparent placeholder-transparent cursor-pointer"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="flex flex-col px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Check Out</label>
            <div className="relative group">
              <Calendar className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gold w-3.5 h-3.5" />
              <input 
                type="date" 
                className="w-full pl-6 text-sm text-navy focus:outline-none font-sans bg-transparent cursor-pointer"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col px-4 pb-2 md:pb-0">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Guests</label>
            <div className="relative">
              <Users className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gold w-3.5 h-3.5" />
              <select className="w-full pl-6 text-sm text-navy focus:outline-none font-sans bg-transparent appearance-none cursor-pointer">
                <option>2 Adults</option>
                <option>2 Adults, 1 Child</option>
                <option>1 Adult</option>
                <option>Family (4+)</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pl-2">
            <button className="w-full bg-navy text-white h-10 md:h-12 rounded-full hover:bg-gold transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md hover:shadow-lg">
              <span className="uppercase tracking-widest text-[10px] md:text-xs font-semibold">Check Availability</span>
              <Search className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingBar;