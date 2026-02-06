
import React from 'react';
import ScrollStack from './ScrollStack';
import ScrollStackItem from './ScrollStackItem';

const ExperienceStack: React.FC = () => {
  const experiences = [
    {
      title: "The Ocean Sanctuary",
      description: "Wake up to the symphony of waves. Our oceanfront suites offer unparalleled privacy and direct access to the secluded West Beach.",
      video: "https://res.cloudinary.com/dshsndiup/video/upload/v1770199234/AQMO7oqPPpDHQZ6yJfBDCBLONn_MZK7EYa2l5QrqgHwAw3aPwJSbDcsGOjupJ0dTkONgbJGWf-SoWSzYGWcCYvriXro3_Uo4lqlBKNWcRP_GRQ_n4hhur.mp4" 
    },
    {
      title: "Golden Horizons",
      description: "Witness the sky ignite with color as the sun dips below the Bay of Bengal. A daily spectacle reserved for the few.",
      video: "https://res.cloudinary.com/dshsndiup/video/upload/v1770200037/AQPV5-eSgj_s3ghPXdTgASV_yZ8GvANAvY0zDae2HMOaDEK6LmsJv9PL3jFkrM1I5VQrpOk0S19yeFP1BgDxagGqe3PRLTUYDjaR7-wnLaWwUg_zdpj9n.mp4" 
    },
    {
      title: "Tropical Serenity",
      description: "Immerse yourself in the lush embrace of the island. Where the rustle of palms harmonizes with the gentle sea breeze.",
      video: "https://res.cloudinary.com/dshsndiup/video/upload/v1770202151/AQOTh9kD8NTgaBCZOz6X8RQpzzjfpSU79X6psSnNbSM-adjkcBpL_LbewXUBabttXtjKzsYmzYj7rQleMe52_cyc1UhnNRlaD4ynTbvfq2GXXg_i1z9ox.mp4" 
    },
    {
      title: "Crystal Waters",
      description: "Dive into the azure depths. Explore the vibrant coral reefs or simply float in the warm embrace of the tropical sea.",
      video: "https://res.cloudinary.com/dshsndiup/video/upload/v1770202157/AQOUVLIRzCWf7WyDYci5GvnYASZR9c2X-bgbOG4_ckPWWwFqyJ1O-dys-cJdvAKcrLkixOqcqUINcgexEHlVHMB_g6e1rD7I764J6lDsPsOzQw_skqibt.mp4" 
    },
    {
      title: "Island Rhythms",
      description: "Feel the pulse of island life. From tranquil mornings to enchanting starlit evenings, time moves at your own pace.",
      video: "https://res.cloudinary.com/dshsndiup/video/upload/v1770202990/AQNmgYPbImUOXUIYs8W3LpEGKjrdvzOBXP7vkCWmV7FRS4lTH8ok5ncjt6rVZhHz9IMkRXf7h-T41lvoiII7eNP6B8Egr9xY2C27MX3oFmg_FQ_aizqnv.mp4" 
    }
  ];

  return (
    <section className="bg-sand relative">
        <div className="text-center pt-32 pb-10">
            <span className="text-gold uppercase tracking-widest text-xs font-bold">Discover</span>
            <h2 className="font-serif text-3xl md:text-5xl text-navy mt-4">Unforgettable Moments</h2>
        </div>

        {/* 
           Reduced itemDistance to 100 to close the gap. 
           itemStackDistance=30 keeps the cards visible when stacked behind.
        */}
        <ScrollStack 
            itemDistance={100} 
            itemStackDistance={30}
            stackPosition="15%"
            useWindowScroll={true}
            className="w-full"
            itemScale={0.03} 
            blurAmount={0}
        >
            {experiences.map((exp, index) => (
                <ScrollStackItem 
                    key={index} 
                    // Set explicit height for the visual card
                    style={{ height: '70vh' }}
                    itemClassName="overflow-hidden shadow-2xl bg-navy"
                >
                    <div className="relative w-full h-full rounded-[40px] overflow-hidden group">
                        {/* Video Background - No Filters */}
                        <video 
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                            preload="metadata"
                        >
                            <source src={exp.video} type="video/mp4" />
                        </video>

                        {/* No Overlays as requested for HD quality */}

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full h-full p-6 md:p-12 flex flex-col justify-end items-start pointer-events-none">
                            {/* Title */}
                            <div className="overflow-hidden mb-6 pointer-events-auto">
                                <h3 className="text-white font-serif text-4xl md:text-6xl drop-shadow-lg">
                                    {exp.title}
                                </h3>
                            </div>
                            
                            {/* Liquid Glass Subtitle Box */}
                            <div className="pointer-events-auto relative max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl overflow-hidden group/box transition-all duration-500 hover:bg-white/15">
                                {/* Glossy Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-70 pointer-events-none"></div>
                                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover/box:animate-[shine_1.5s_ease-in-out]"></div>
                                
                                <p className="relative z-10 text-white font-sans text-sm md:text-base font-medium leading-relaxed tracking-wide drop-shadow-md">
                                    {exp.description}
                                </p>
                            </div>
                        </div>

                        {/* Number */}
                        <div className="absolute top-8 right-8 text-white/40 font-serif text-9xl font-bold mix-blend-overlay pointer-events-none drop-shadow-lg">
                            0{index + 1}
                        </div>
                    </div>
                </ScrollStackItem>
            ))}
        </ScrollStack>
        
        {/* Shine animation for the glass box */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          }
        `}} />
    </section>
  );
};

export default ExperienceStack;
