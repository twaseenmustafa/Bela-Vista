
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import { VLOG_COLLECTION } from './experienceData';

const VlogList: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const vlogSections = gsap.utils.toArray('.vlog-entry');
        vlogSections.forEach((section: any) => {
            gsap.from(section.querySelectorAll('.vlog-anim'), {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                }
            });
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleVideoClick = (videoId: string) => {
      window.open(`https://youtu.be/${videoId}`, '_blank');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, videoId: string) => {
    const target = e.target as HTMLImageElement;
    // If maxresdefault fails, try sddefault (Standard Definition)
    if (target.src.includes('maxresdefault')) {
        target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    } 
    // If sddefault fails, try hqdefault (High Quality - always available but lower res)
    else if (target.src.includes('sddefault')) {
         target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  };

  return (
      <section ref={containerRef} className="py-24 bg-sand relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
              
              <div className="text-center mb-20">
                  <span className="text-navy/50 text-xs font-semibold">Curated Collection</span>
                  <h2 className="font-serif text-3xl md:text-5xl text-navy mt-4">Travel Diaries</h2>
              </div>

              <div className="flex flex-col gap-24 md:gap-32">
                  {VLOG_COLLECTION.map((vlog, index) => {
                      const isReverse = index % 2 !== 0; 
                      
                      return (
                          <div key={vlog.id} className={`vlog-entry grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReverse ? 'lg:flex-row-reverse' : ''}`}>
                              
                              <div className={`relative z-10 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                                  <div className="vlog-anim inline-block mb-4 overflow-hidden">
                                     <span 
                                        className="text-sm font-semibold block text-golddeep"
                                        
                                     >
                                         {vlog.subtitle}
                                     </span>
                                  </div>
                                  <h3 className="vlog-anim font-serif text-3xl md:text-4xl text-navy leading-tight mb-6">
                                      {vlog.title}
                                  </h3>
                                  <p className="vlog-anim font-sans text-gray-500 leading-relaxed text-sm md:text-base mb-8">
                                      {vlog.description}
                                  </p>
                                  <div className="vlog-anim">
                                      <button 
                                          onClick={() => handleVideoClick(vlog.id)}
                                          className="group flex items-center gap-3 text-sm font-semibold text-navy hover:text-golddeep transition-colors duration-300"
                                          
                                      >
                                          <span>Watch Vlog</span>
                                          <div 
                                            className="w-8 h-8 rounded-full flex items-center justify-center bg-navy text-white transition-all duration-300 group-hover:scale-110 text-white"
                                            
                                          >
                                              <Play size={12} fill="white" />
                                          </div>
                                      </button>
                                  </div>
                              </div>

                              <div 
                                  className={`vlog-anim relative aspect-video w-full rounded-xl overflow-hidden shadow-xl group cursor-pointer bg-navy ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}
                                  onClick={() => handleVideoClick(vlog.id)}
                              >
                                  <div 
                                    className="absolute inset-0 border-4 border-gold z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl"
                                    
                                  ></div>

                                  <img 
                                      src={`https://img.youtube.com/vi/${vlog.id}/maxresdefault.jpg`} 
                                      alt={vlog.title} 
                                      onError={(e) => handleImageError(e, vlog.id)}
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                  />
                                  
                                  <div className="absolute inset-0 flex items-center justify-center z-10">
                                      <div 
                                        className="w-16 h-16 rounded-full flex items-center justify-center bg-navy/70 backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-110"
                                        
                                      >
                                          <Play className="w-6 h-6 text-white fill-white ml-1" />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
      </section>
  );
};

export default VlogList;
