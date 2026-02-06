import React from 'react';
import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

const ShareButton: React.FC = () => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center relative z-20 flex justify-center"
    >
        <motion.a 
          href={CONTACT_INFO.mapsLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative inline-flex items-center space-x-3 px-8 py-3 rounded-full border border-gold/30 bg-white/5 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:border-gold hover:bg-gold/10"
          animate={{ 
            boxShadow: ["0 0 0px rgba(212, 175, 55, 0)", "0 0 15px rgba(212, 175, 55, 0.2)", "0 0 0px rgba(212, 175, 55, 0)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Animated Pen Icon - Writing Motion */}
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                repeatDelay: 2,
                ease: "easeInOut" 
            }}
          >
              <PenTool size={16} className="text-gold" />
          </motion.div>

          <div className="relative flex flex-col items-start">
              <span className="text-xs uppercase tracking-widest font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 z-10">
                Share your experience
              </span>
              {/* Left-to-Right Underline on Hover */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 ease-out group-hover:w-full"></span>
          </div>
          
        </motion.a>
    </motion.div>
  );
};

export default ShareButton;
