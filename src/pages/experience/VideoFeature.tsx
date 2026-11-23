
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

const VideoFeature: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from('.video-section-content', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.video-section-trigger',
                start: 'top 80%',
            }
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleVideoClick = (videoId: string) => {
      window.open(`https://youtu.be/${videoId}`, '_blank');
  };

  return (
      <section ref={containerRef} className="video-section-trigger py-24 md:py-40 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
              <div className="video-section-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                  
                  <div className="relative z-10 lg:col-span-4">
                      <div className="inline-block mb-6 overflow-hidden">
                         <span className="text-gold text-sm font-semibold block">
                             Guest Stories
                         </span>
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-8">
                          A Cinematic <br/> 
                          <span className="text-gold">Immersion</span>
                      </h2>
                      <p className="font-sans text-gray-500 text-base">Filmed by Avijatrik Travel at Bela Vista</p>
                  </div>

                  <div 
                      className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-navy lg:col-span-8"
                      onClick={() => handleVideoClick('MvWdyt_myzo')}
                  >
                        <img 
                            src="https://img.youtube.com/vi/MvWdyt_myzo/maxresdefault.jpg" 
                            alt="Bela Vista Resort Vlog" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/30 rounded-full opacity-75"></div>
                                <div className="relative w-20 h-20 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6 text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                            Watch the Vlog
                        </div>
                  </div>

              </div>
          </div>
      </section>
  );
};

export default VideoFeature;
