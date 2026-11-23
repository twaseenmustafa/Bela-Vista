import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GridMotion from './GridMotion';
import Button from '../ui/Button';
import Eyebrow from '../ui/Eyebrow';
import { Parallax, Dim } from '../ui/Parallax';
import Magnetic from '../ui/Magnetic';
import { cld, PHOTO_PATHS } from '../../constants';

const openGallery = () => window.dispatchEvent(new CustomEvent('app-navigate', { detail: { view: 'gallery' } }));

const PHOTOS = PHOTO_PATHS.map(path => cld(path, 'f_auto,q_auto,w_640,h_480,c_fill'));

// 32 tiles = 4 full rows of 8. The second pass is rotated by 7 so no photo repeats within a row.
const ITEMS = [...PHOTOS, ...PHOTOS.slice(7), ...PHOTOS.slice(0, 7), PHOTOS[10], PHOTOS[12]];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close modal on scroll
  useEffect(() => {
    if (selectedImage) {
      const handleScroll = () => {
        setSelectedImage(null);
      };
      
      // We use 'true' for capture to ensure we catch it early if possible, 
      // but standard passive listener is usually enough for window scroll.
      window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
      
      // Also listen to wheel events to catch start of scroll before visual update if possible
      window.addEventListener('wheel', handleScroll, { passive: true, capture: true });

      return () => {
        window.removeEventListener('scroll', handleScroll, { capture: true });
        window.removeEventListener('wheel', handleScroll, { capture: true });
      };
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="pt-24 md:pt-32 pb-40 md:pb-48 bg-navy relative overflow-hidden border-t border-white/5">
      <Dim />
      {/* Background Gradient overlay handled by GridMotion */}
      
      <div className="container mx-auto px-6 relative z-10 pointer-events-none mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end">
            <div>
                <Parallax distance={50}><Eyebrow n="03" label="Visual story" light /></Parallax>
                <Parallax distance={-15}><h2 className="font-serif text-5xl md:text-6xl text-white leading-[1.05] mt-5">Glimpses of <span className="text-gold">paradise</span></h2></Parallax>
            </div>
            <div className="hidden md:block pointer-events-auto">
                <Magnetic><Button variant="outline" onClick={openGallery}>View all photos</Button></Magnetic>
            </div>
        </div>
      </div>

      <Parallax distance={50} className="relative w-full">
         <GridMotion 
            items={ITEMS} 
            gradientColor="#0F172A" 
            onItemClick={(url) => setSelectedImage(url)}
         />
      </Parallax>


      <div className="md:hidden mt-8 text-center relative z-30 pointer-events-auto">
          <Button variant="outline" onClick={openGallery}>View all photos</Button>
      </div>

      {/* Interactive Picture Bubble */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* 
              Bubble Container
              - pointer-events-auto allows clicking inside if needed (though we just view)
              - We rely on window scroll listeners to close it, so we don't block background pointer events.
              - Size: 25vw is roughly 10% larger than the 22vw grid items.
            */}
            <motion.div
              initial={{ scale: 0, opacity: 0, borderRadius: "50%" }}
              animate={{ scale: 1, opacity: 1, borderRadius: "24px" }}
              exit={{ scale: 0, opacity: 0, borderRadius: "50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative overflow-hidden shadow-2xl bg-navy border-4 border-white/10 pointer-events-auto"
              style={{ 
                width: '25vw', 
                height: '25vw', 
                minWidth: '300px', 
                minHeight: '300px' 
              }}
            >
              <img 
                src={selectedImage.replace('w_640,h_480,c_fill', 'w_1200')} 
                alt="Gallery Preview" 
                className="w-full h-full object-cover"
              />
              
              {/* Optional gloss effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;