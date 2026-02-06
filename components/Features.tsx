import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-sand relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-bold">The Experience</span>
          <h2 className="font-serif text-3xl md:text-4xl text-navy mt-4">Designed for Serenity</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center text-center p-8 bg-white/50 rounded-xl hover:bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-default border border-transparent hover:border-gold/20"
            >
              <div className="p-4 rounded-full bg-sand group-hover:bg-navy transition-colors duration-500 mb-6">
                <feature.icon className="w-8 h-8 text-navy group-hover:text-gold transition-colors duration-500 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl text-navy mb-4">{feature.title}</h3>
              <p className="font-sans text-gray-600 text-sm leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;