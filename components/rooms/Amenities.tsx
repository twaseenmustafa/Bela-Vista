
import React from 'react';
import { Coffee, Wind, Utensils, Sparkles } from 'lucide-react';

const Amenities: React.FC = () => {
  const items = [
     { 
        icon: Utensils, 
        title: "Coastal Culinary", 
        desc: "Today's catch, cooked Bengali style" 
     },
     { 
        icon: Sparkles, 
        title: "Cozy Aesthetic", 
        desc: "Wooden rooms made for two" 
     },
     { 
        icon: Wind, 
        title: "Living Breeze", 
        desc: "Sea air through every room, day and night" 
     },
     { 
        icon: Coffee, 
        title: "Morning Coffee", 
        desc: "Served on your deck at sunrise" 
     }
 ];

  return (
      <section className="amenities-section py-32 px-6 md:px-20 bg-navy text-white relative">
          <style>{`
            .amenity-card {
                position: relative;
                display: flex;
                flex-direction: column;
                width: 100%;
                transition: transform 0.48s, opacity 0.48s cubic-bezier(0.23, 1, 0.32, 1);
            }

            .amenity-content {
                position: relative;
                z-index: 10;
                display: flex;
                flex-direction: column;
                gap: 24px;
                padding: 36px;
                border-radius: 22px;
                overflow: hidden;
                background: #1e293b; 
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: transform 0.48s, opacity 0.48s cubic-bezier(0.23, 1, 0.32, 1);
            }

            .amenity-stack-1 {
                position: absolute;
                content: "";
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #334155; 
                z-index: -1;
                border-radius: 22px;
                transition: transform 0.48s, opacity 0.48s cubic-bezier(0.23, 1, 0.32, 1);
                border: 1px solid rgba(255, 255, 255, 0.05);
                opacity: 0;
            }

            .amenity-stack-2 {
                position: absolute;
                content: "";
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #475569; 
                z-index: -2;
                border-radius: 22px;
                transition: transform 0.48s, opacity 0.48s cubic-bezier(0.23, 1, 0.32, 1);
                border: 1px solid rgba(255, 255, 255, 0.05);
                opacity: 0;
            }

            .amenity-card:hover { transform: translateY(-10px); }
            .amenity-card:hover .amenity-stack-1 { transform: rotate(-6deg); opacity: 1; }
            .amenity-card:hover .amenity-stack-2 { transform: rotate(6deg); opacity: 1; }
          `}</style>
          
          <div className="max-w-7xl mx-auto">
             <div className="mb-20 text-center">
                 <h2 className="font-serif text-4xl md:text-6xl mb-6">Thoughtful <span className="text-gold">Details</span></h2>
             </div>

             <div className="amenities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 gap-y-20">
                 {items.map((item, i) => (
                     <div key={i} className="amenity-card cursor-default group">
                         <div className="amenity-stack-1"></div>
                         <div className="amenity-stack-2"></div>
                         <div className="amenity-content">
                            <item.icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                            <h3 className="font-serif text-xl mb-3 text-white">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                         </div>
                     </div>
                 ))}
             </div>
          </div>
      </section>
  );
};

export default Amenities;
