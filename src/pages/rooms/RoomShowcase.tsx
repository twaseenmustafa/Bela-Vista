
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../components/ui/Button';
import { ROOM_DATA } from './roomData';
import { openBooking } from '../../constants';

const RoomShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        ROOM_DATA.forEach((room, index) => {
            const section = document.querySelector(`#room-section-${index}`) as HTMLElement;
            const imgContainer = section?.querySelector('.room-img-container') as HTMLElement;
            const content = section?.querySelector('.room-content') as HTMLElement;

            if (section && imgContainer && content) {
                // Parallax on image container (Standard)
                if (index !== 2 && window.innerWidth > 768) { // parallax is desktop-only; saves work on phones
                     gsap.fromTo(imgContainer, 
                        { yPercent: -5 },
                        { 
                            yPercent: 5, 
                            ease: "none",
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true
                            }
                        }
                    );
                }

                // Text Reveal
                gsap.from(content.querySelectorAll('.reveal-text'), {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    }
                });
            }
        });

        // Special Entrance for Room 3 (Index 2)
        const room3Section = document.querySelector('#room-section-2') as HTMLElement;
        const room3Wrapper = room3Section?.querySelector('.room-img-wrapper') as HTMLElement;
        
        if (room3Section && room3Wrapper) {
            gsap.fromTo(room3Wrapper, 
                {
                    scale: 1.3,
                    filter: "blur(15px) brightness(1.2)",
                    yPercent: -10 
                },
                {
                    scale: 1,
                    filter: "blur(0px) brightness(1)",
                    yPercent: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: room3Section,
                        start: "top bottom", 
                        end: "center center", 
                        scrub: 1.5 
                    }
                }
            );
        }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
      <div ref={containerRef} className="rooms-container pb-10 md:pb-20">
          {ROOM_DATA.map((room, index) => (
              <section 
                key={room.id} 
                id={`room-section-${index}`}
                className={`min-h-[90vh] md:min-h-screen py-12 md:py-24 px-6 md:px-20 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch gap-12 md:gap-24 relative`}
              >
                  <div className="w-full md:w-1/2 min-h-[40vh] md:h-[80vh] relative group h-full z-10">
                      <div className="room-img-container w-full h-full relative overflow-hidden rounded-lg">
                         <div className="room-img-wrapper w-full h-full">
                            <img 
                                src={room.image} 
                                alt={room.name} 
                                className="room-img w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                            />
                         </div>
                      </div>
                      
                      {room.price && (
                          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-navy z-10">
                              {room.price}
                          </div>
                      )}
                  </div>

                  <div className="room-content w-full md:w-1/2 flex flex-col justify-between relative z-10">
                      <div>
                          <span className="reveal-text block text-gold text-xs font-semibold mb-4">
                              0{index + 1} — {room.type}
                          </span>
                          <h2 className="reveal-text font-serif text-3xl md:text-6xl mb-4 md:mb-6 leading-tight text-navy">
                              {room.name}
                          </h2>
                          <p className="reveal-text font-sans text-gray-600 leading-relaxed mb-6 md:mb-10 max-w-md text-sm md:text-base">
                              {room.description}
                          </p>
                      </div>
                      
                      <div>
                          <div className={`reveal-text grid grid-cols-2 gap-4 border-t border-navy/10 pt-8 ${room.hideBooking ? '' : 'mb-10'}`}>
                              {room.features.map((feature, i) => (
                                  <div key={i} className="flex items-center space-x-2 text-xs md:text-sm text-navy/80">
                                      <div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></div>
                                      <span>{feature}</span>
                                  </div>
                              ))}
                          </div>

                          {!room.hideBooking && (
                            <div className="reveal-text">
                                <Button onClick={openBooking} className="bg-navy text-white hover:bg-gold w-full md:w-auto">
                                    {room.ctaLabel || "Book this room"}
                                </Button>
                            </div>
                          )}
                      </div>
                  </div>
              </section>
          ))}
      </div>
  );
};

export default RoomShowcase;
